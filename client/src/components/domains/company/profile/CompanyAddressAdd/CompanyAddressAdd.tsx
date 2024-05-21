import { useMutation } from '@apollo/client'
import { App, Button } from 'antd'
import { Form } from 'react-final-form'
import { useState } from 'react'
import {
  type AddAddressFormValues,
  type CompanyAddressAddProps,
} from '../companyProfileInterfaces'
import { validateAddressInfo } from './validate'
import { graphql } from '@/gql'
import { FormModal } from '@/components/domains/common/FormModal'
import { Input } from '@/components/domains/common/Input'
import { Select } from '@/components/domains/common/Select'
import { voivodeships } from '@/utils/voivodeshipsData'
import useTerritorialDivision from '@/components/domains/common/hooks/useTerritorialDivision'
import { useAuth } from '@/auth/authProvider'

const addAddressMutation = graphql(`
  mutation CompanyAddressAdd($props: CompanyAddressAddMutationProps!) {
    company {
      addresses {
        add(props: $props) {
          status {
            message
          }
        }
      }
    }
  }
`)

export const CompanyAddressAdd: React.FC<CompanyAddressAddProps> = ({
  refetch,
}) => {
  const { message } = App.useApp()
  const { user } = useAuth()
  const [addAddress] = useMutation(addAddressMutation)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const { voivodeshipsData, municipalitiesData, communitiesData } =
    useTerritorialDivision()

  const { voivodeshipID, setVoivodeshipID } = voivodeshipsData
  const { communities, communityID, setCommunityID } = communitiesData
  const { municipalities, municipalityID, setMunicipalityID } =
    municipalitiesData

  const handleAddAddress = async (values: AddAddressFormValues) => {
    if (user?.basicInfo?.users_ID) {
      const { data } = await addAddress({
        variables: {
          props: {
            usersAddress_userID: user.basicInfo.users_ID,
            usersAddress_street: values.usersAddress_street,
            usersAddress_houseNumber: values.usersAddress_houseNumber,
            usersAddress_apartamentNumber:
              values.usersAddress_apartamentNumber ?? null,
            usersAddress_postCode: values.usersAddress_postCode,
            usersAddress_city: values.usersAddress_city,
            usersAddress_typeID: 25,
            usersAddress_communityID: Number(values.usersAddress_communityID),
          },
        },
      })

      const status = data?.company?.addresses?.add?.status.message

      if (status === 'Error') {
        await message.error('Wystąpił błąd')
      } else {
        setIsModalOpen(false)
        refetch()
        await message.success('Dodano nowy adres')
      }
    } else {
      await message.error('Wystąpił błąd')
    }
  }

  const formNode = (
    <Form onSubmit={handleAddAddress} validate={validateAddressInfo}>
      {({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          {/* <Select
            name="usersAddress_typeID"
            selectOptions={selectOptions}
            placeholder="Rodzaj adresu"
          /> */}
          <Select
            name="voivodeship"
            placeholder="Województwo"
            selectOptions={voivodeships}
            updateState={setVoivodeshipID}
            value={voivodeshipID}
          />
          <Select
            name="municipality"
            placeholder="Powiat"
            selectOptions={municipalities.length > 0 ? municipalities : []}
            updateState={setMunicipalityID}
            value={municipalityID}
          />
          <Select
            name="usersAddress_communityID"
            placeholder="Gmina"
            selectOptions={communities.length > 0 ? communities : []}
            updateState={setCommunityID}
            value={communityID}
          />
          <Input name="usersAddress_street" placeholder="Ulica" type="text" />
          <Input
            name="usersAddress_houseNumber"
            placeholder="Numer budynku"
            type="text"
          />
          <Input
            name="usersAddress_apartamentNumber"
            placeholder="Numer mieszkania"
            type="text"
          />
          <Input
            name="usersAddress_postCode"
            placeholder="Kod pocztowy"
            type="text"
          />
          <Input name="usersAddress_city" placeholder="Miasto" type="text" />
          <div
            style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}
          >
            <Button
              onClick={() => {
                setIsModalOpen(false)
              }}
            >
              Anuluj
            </Button>
            <Button htmlType="submit" type="primary" /* loading={loading} */>
              Dodaj
            </Button>
          </div>
        </form>
      )}
    </Form>
  )

  return (
    <FormModal
      popupTitle={'Dodaj nowy adres'}
      formNode={formNode}
      buttonContent="Dodaj nowy adres"
      buttonType="primary"
      isModalOpen={isModalOpen}
      setIsModalOpen={setIsModalOpen}
      isCompanyAddAddress={true}
      isOfficialEditUserAddress={true}
    />
  )
}
