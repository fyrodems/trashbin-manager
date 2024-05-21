import { useEffect, useState } from 'react'
import { App, Button, Modal } from 'antd'
import { useLazyQuery, useMutation } from '@apollo/client'
import { Form } from 'react-final-form'
import {
  type AddressDataProps,
  type UserIDProps,
  type AddressInfo,
  type FindFullDataProps,
} from '../../userProfileInterfaces'
import editIcon from '../../../../../../assets/editIcon.png'
import { validateAddressInfo } from './formValidation'
import styles from './UserEditAddressForm.module.scss'
import { voivodeships } from '@/utils/voivodeshipsData'
import { Input } from '@/components/domains/common/Input'
import { Select } from '@/components/domains/common/Select'
import { graphql } from '@/gql'
import useTerritorialDivision from '@/components/domains/common/hooks/useTerritorialDivision'
import { FormModal } from '@/components/domains/common/FormModal'

const userAddressEditMutation = graphql(`
  mutation UserAddressInfoEdit($props: UserAddressInfoEditMutationProps!) {
    user {
      addressInfo {
        edit(props: $props) {
          status {
            message
          }
        }
      }
    }
  }
`)

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

export const UserEditAddressForm: React.FC<UserIDProps & AddressDataProps> = ({
  userID,
  addressData,
}) => {
  const [edit] = useMutation(userAddressEditMutation)
  const { message } = App.useApp()

  const [searchFullData] = useLazyQuery(findFullTerritoryDataQuery)

  const { voivodeshipsData, municipalitiesData, communitiesData } =
    useTerritorialDivision(0, 0, addressData.usersAddress_communityID)

  const { voivodeshipID, setVoivodeshipID } = voivodeshipsData
  const { communities } = communitiesData
  const { municipalities, municipalityID, setMunicipalityID } =
    municipalitiesData

  const [isEditModalOpen, setIsEditModalOpen] = useState(false)

  const editAddress = async (values: AddressInfo) => {
    const { data } = await edit({
      variables: {
        props: {
          usersAddress_userID: userID,
          usersAddress_street: values.usersAddress_street,
          usersAddress_houseNumber: values.usersAddress_houseNumber,
          usersAddress_apartamentNumber:
            values.usersAddress_apartamentNumber ?? null,
          usersAddress_postCode: values.usersAddress_postCode,
          usersAddress_city: values.usersAddress_city,
          usersAddress_typeID: Number(values.usersAddress_typeID),
          usersAddress_communityID: Number(values.usersAddress_communityID),
          usersAddress_addressID: addressData.usersAddress_ID,
        },
      },
    })
    const status = data?.user?.addressInfo?.edit?.status.message
    if (status === 'Error') {
      await message.error('Masz już oczekujący wniosek o zmianę adresu')
    } else {
      await message.success('Wysłano wniosek o zmianę adresu')
      setIsEditModalOpen(false)
    }
  }

  const { usersAddress_communityID } = addressData
  const [initialValues, setInitialValues] = useState({})

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

  return (
    <>
      <Button
        onClick={() => {
          setIsEditModalOpen(true)
        }}
        className={styles.editButton}
        type={'primary'}
      >
        <img src={editIcon} alt="Edit icon" /> Edytuj adres
      </Button>

      {isEditModalOpen ? (
        <Modal
          className={styles.modal}
          title="Edycja adresu"
          footer={
            <>
              <Button
                onClick={() => {
                  setIsEditModalOpen(false)
                }}
              >
                Anuluj
              </Button>
              <Button form="userAddressEdit" htmlType="submit" type="primary">
                Edytuj adres
              </Button>
            </>
          }
          open={isEditModalOpen}
          onCancel={() => {
            setIsEditModalOpen(false)
          }}
        >
          <Form
            onSubmit={editAddress}
            initialValues={initialValues}
            validate={validateAddressInfo}
          >
            {({ handleSubmit }) => (
              <form id="userAddressEdit" onSubmit={handleSubmit}>
                <Select
                  name="voivodeship"
                  placeholder="Województwo"
                  selectOptions={voivodeships}
                  updateState={setVoivodeshipID}
                  defaultValue={
                    voivodeships.find((v) => Number(v.value) === voivodeshipID)
                      ?.label
                  }
                />
                <Select
                  name="municipality"
                  placeholder="Powiat"
                  defaultValue={
                    municipalities.find(
                      (municipality) =>
                        Number(municipality.value) === municipalityID
                    )?.label
                  }
                  selectOptions={
                    municipalities.length > 0 ? municipalities : []
                  }
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
                <Input
                  type="text"
                  name="usersAddress_postCode"
                  placeholder="Kod pocztowy"
                />
                <Input
                  type="text"
                  name="usersAddress_city"
                  placeholder="Miasto"
                />
                <Input
                  type="text"
                  name="usersAddress_street"
                  placeholder="Ulica"
                />
                <Input
                  type="text"
                  name="usersAddress_houseNumber"
                  placeholder="Numer budynku"
                />
                <Input
                  type="text"
                  name="usersAddress_apartamentNumber"
                  placeholder="Numer mieszkania"
                />
              </form>
            )}
          </Form>
        </Modal>
      ) : null}
    </>
  )
}
