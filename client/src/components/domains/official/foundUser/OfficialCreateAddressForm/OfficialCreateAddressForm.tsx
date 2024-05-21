import { App, Button } from 'antd'
import { useMutation } from '@apollo/client'
import { HomeOutlined } from '@ant-design/icons'
import { useState } from 'react'
import { Form } from 'react-final-form'
import {
  type AddressInfo,
  type OfficialCreateAddressFormProps,
} from '../officialFoundUserInterfaces'
import { validateAddressInfo } from './validation'
import { graphql } from '@/gql'
import { Input } from '@/components/domains/common/Input'
import { FormModal } from '@/components/domains/common/FormModal'
import { Select } from '@/components/domains/common/Select'
import { voivodeships } from '@/utils/voivodeshipsData'
import useTerritorialDivision from '@/components/domains/common/hooks/useTerritorialDivision'
import styles from './OfficialCreateAddressForm.module.scss'

const officialAddressInfoAddMutation = graphql(`
  mutation OfficialAddressInfoAdd(
    $props: OfficialAddressInfoAddMutationProps!
  ) {
    official {
      address {
        add(props: $props) {
          status {
            message
          }
        }
      }
    }
  }
`)

export const OfficialCreateAddressForm: React.FC<
  OfficialCreateAddressFormProps
> = ({ userData, refetch }) => {
  const [add, { loading }] = useMutation(officialAddressInfoAddMutation)
  const { message } = App.useApp()
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const { voivodeshipsData, municipalitiesData, communitiesData } =
    useTerritorialDivision()

  const { voivodeshipID, setVoivodeshipID } = voivodeshipsData
  const { communities, communityID, setCommunityID } = communitiesData
  const { municipalities, municipalityID, setMunicipalityID } =
    municipalitiesData

  const addAddressInfo = async (values: AddressInfo) => {
    const { data } = await add({
      variables: {
        props: {
          usersAddress_userID: userData.basicInfo.users_ID,
          usersAddress_street: values.usersAddress_street,
          usersAddress_houseNumber: values.usersAddress_houseNumber,
          usersAddress_apartamentNumber:
            values.usersAddress_apartamentNumber ?? null,
          usersAddress_postCode: values.usersAddress_postCode,
          usersAddress_city: values.usersAddress_city,
          usersAddress_typeID: Number(values.usersAddress_typeID),
          usersAddress_communityID: values.usersAddress_communityID,
        },
      },
    })

    const status = data?.official?.address?.add?.status.message

    if (status === 'Error') {
      await message.error('Wystąpił błąd')
    } else {
      await message.success('Dodano adres')
      setIsModalOpen(false)
    }

    refetch()
  }

  const getUserAddressTypes = (): string[] => {
    // Uzyskaj typy adresów użytkownika z danych
    const addressTypes = userData.addressInfo.map((address) =>
      String(address?.usersAddress_typeID)
    )
    return addressTypes
  }

  const addressTypes = getUserAddressTypes()
  const isDisabled = addressTypes.length === 3

  // Utwórz opcje do selectOptions
  const selectOptions = [
    {
      value: '1',
      label: 'Korespondencyjny',
    },
    {
      value: '2',
      label: 'Zamieszkania',
    },
    {
      value: '3',
      label: 'Zameldowania',
    },
  ].filter((option) => !addressTypes.includes(option.value))

  const formNode = (
    <Form onSubmit={addAddressInfo} validate={validateAddressInfo}>
      {({ handleSubmit }) => (
        <form onSubmit={handleSubmit} className={styles.form}>
          <Select
            name="usersAddress_typeID"
            selectOptions={selectOptions}
            placeholder="Rodzaj adresu"
          />
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
            <Button htmlType="submit" type="primary" loading={loading}>
              Dodaj
            </Button>
          </div>
        </form>
      )}
    </Form>
  )

  return (
    <FormModal
      isModalOpen={isModalOpen}
      setIsModalOpen={setIsModalOpen}
      isDisabled={isDisabled}
      buttonContent={
        <span
          style={{
            display: 'flex',
            margin: '0 auto',
            gap: '6px',
            alignItems: 'center',
          }}
        >
          <HomeOutlined />
          Dodaj adres
        </span>
      }
      popupTitle="Dodaj adres użytkownikowi"
      formNode={formNode}
    />
  )
}
