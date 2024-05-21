import { useMutation, useLazyQuery } from '@apollo/client'
import { App, Button } from 'antd'
import { Form } from 'react-final-form'
import { useEffect, useState } from 'react'
import { validateAddressInfo } from './validate'
import {
  type CompanyAddressAddProps,
  type AddAddressFormValues,
} from './interfaces'
import { graphql } from '@/gql'
import { FormModal } from '@/components/domains/common/FormModal'
import { Input } from '@/components/domains/common/Input'
import { Select } from '@/components/domains/common/Select'
import { voivodeships } from '@/utils/voivodeshipsData'
import useTerritorialDivision from '@/components/domains/common/hooks/useTerritorialDivision'
import { useAuth } from '@/auth/authProvider'

const editAddressMutation = graphql(`
  mutation CompanyAddressEdit($props: CompanyAddressEditMutationProps!) {
    company {
      addresses {
        edit(props: $props) {
          status {
            message
          }
        }
      }
    }
  }
`)

export interface FindFullDataProps {
  usersAddress_communityID: number
}

const findFullTerritoryDataQuery = graphql(`
  query TerritorialDivisonFullData2($props: TerritorialFullDataGetQueryProps!) {
    territorialDivision {
      fullData {
        get(props: $props) {
          community {
            community_ID
            community_name
          }
          voivodeship {
            voivodeship_ID
            voivodeship_name
          }
          municipality {
            municipality_ID
            municipality_name
          }
        }
      }
    }
  }
`)

export const CompanyAddressEdit: React.FC<CompanyAddressAddProps> = ({
  addressData,
  refetch,
}) => {
  const { voivodeshipsData, municipalitiesData, communitiesData } =
    useTerritorialDivision(0, 0, addressData.usersAddress_communityID)

  const { voivodeshipID, setVoivodeshipID } = voivodeshipsData
  const { communities } = communitiesData
  const { municipalities, municipalityID, setMunicipalityID } =
    municipalitiesData

  const [searchFullData] = useLazyQuery(findFullTerritoryDataQuery)
  const [initialValues, setInitialValues] = useState({})
  const { usersAddress_communityID } = addressData

  const { message } = App.useApp()
  const { user } = useAuth()
  const [editAddress] = useMutation(editAddressMutation)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  const handleAddAddress = async (values: AddAddressFormValues) => {
    if (user?.basicInfo?.users_ID) {
      const { data } = await editAddress({
        variables: {
          props: {
            usersAddress_addressID: initialValues.usersAddress_ID,
            usersAddress_userID: user.basicInfo.users_ID,
            usersAddress_street: values.usersAddress_street,
            usersAddress_houseNumber: values.usersAddress_houseNumber,
            usersAddress_apartamentNumber:
              values.usersAddress_apartamentNumber ?? null,
            usersAddress_postCode: values.usersAddress_postCode,
            usersAddress_city: values.usersAddress_city,
            usersAddress_typeID: values.usersAddress_typeID,
            usersAddress_communityID: Number(values.usersAddress_communityID),
          },
        },
      })
      const status = data?.company?.addresses?.edit?.status.message

      if (status === 'Error') {
        await message.error('Wystąpił błąd')
      } else {
        setIsModalOpen(false)
        refetch()
        await message.success('Zmiany zostały zapisane')
      }
    } else {
      await message.error('Wystąpił błąd')
    }
  }

  const completeAddressData = async (values: FindFullDataProps) => {
    const { data } = await searchFullData({
      variables: {
        props: {
          community_ID: values.usersAddress_communityID,
        },
      },
    })
    const result = data?.territorialDivision?.fullData?.get
    return result
  }

  useEffect(() => {
    ;(async () => {
      await completeAddressData({
        usersAddress_communityID,
      }).then((data) => {
        const voivodeshipID =
          data?.voivodeship.voivodeship_ID && data.voivodeship.voivodeship_ID
        const voivodeshipName =
          data?.voivodeship.voivodeship_name &&
          data.voivodeship.voivodeship_name
        const municipalityID =
          data?.municipality.municipality_ID &&
          data.municipality.municipality_ID
        const municipalityName =
          data?.municipality.municipality_name &&
          data?.municipality.municipality_name
        const communityName =
          data?.community.community_name && data.community.community_name

        setInitialValues({
          ...addressData,
          voivodeship: voivodeshipID,
          municipality: municipalityID,
          voivodeshipName,
          municipalityName,
          communityName,
        })
      })
    })()
  }, [voivodeshipID, municipalityID])

  const formNode = (
    <Form
      onSubmit={handleAddAddress}
      initialValues={initialValues}
      validate={validateAddressInfo}
    >
      {({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <Select
            name="voivodeship"
            placeholder="Województwo"
            selectOptions={voivodeships}
            updateState={setVoivodeshipID}
            value={voivodeshipID}
            defaultValue={
              voivodeships.find((v) => Number(v.value) === voivodeshipID)?.label
            }
          />
          <Select
            name="municipality"
            placeholder="Powiat"
            defaultValue={
              municipalities.find(
                (municipality) => Number(municipality.value) === municipalityID
              )?.label
            }
            selectOptions={municipalities.length > 0 ? municipalities : []}
            updateState={setMunicipalityID}
          />
          <Select
            name="usersAddress_communityID"
            placeholder="Gmina"
            defaultValue={
              communities.find(
                (community) =>
                  Number(community.value) === usersAddress_communityID
              )?.label
            }
            selectOptions={communities.length > 0 ? communities : []}
          />
          {/*  <Select
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
          /> */}
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
            <Button htmlType="submit" type="primary">
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
      buttonContent={'Edytuj adres'}
      buttonType="primary"
      isModalOpen={isModalOpen}
      setIsModalOpen={setIsModalOpen}
      isOfficialEditUserAddress={true}
    />
  )
}
