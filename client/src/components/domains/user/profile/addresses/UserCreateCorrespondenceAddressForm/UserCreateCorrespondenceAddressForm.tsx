/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { App, Button, Modal, Radio, Space, type RadioChangeEvent } from 'antd'
import { useLazyQuery, useMutation } from '@apollo/client'
import { Form } from 'react-final-form'
import { useEffect, useState } from 'react'
import {
  type UserCreateCorrespondecneAddressFormProps,
  type FindFullDataProps,
  type FormInitialValues,
  type AddressInfo,
} from '../../userProfileInterfaces'
import { validateAddressInfo } from './formValidation'
import styles from './UserCreateCorrespondenceAddressForm.module.scss'
import { graphql } from '@/gql'
import { Input } from '@/components/domains/common/Input'
import { Select } from '@/components/domains/common/Select'
import { voivodeships } from '@/utils/voivodeshipsData'
import useTerritorialDivision from '@/components/domains/common/hooks/useTerritorialDivision'

const userAddressAddMutation = graphql(`
  mutation UserAddressInfoAdd($props: UserAddressInfoAddMutationProps!) {
    user {
      addressInfo {
        add(props: $props) {
          status {
            message
            description
          }
        }
      }
    }
  }
`)

const findFullTerritoryDataQuery = graphql(`
  query TerritorialDivisonFullData1($props: TerritorialFullDataGetQueryProps!) {
    territorialDivision {
      fullData {
        get(props: $props) {
          voivodeship {
            voivodeship_ID
            voivodeship_name
            voivodeship_description
          }
          municipality {
            municipality_ID
            municipality_name
            municipality_description
            municipality_voivodeshipID
          }
          community {
            community_ID
            community_name
            community_description
            community_voivodeshipID
            community_municipalityID
          }
        }
      }
    }
  }
`)

export const UserCreateCorrespondecneAddressForm: React.FC<
  UserCreateCorrespondecneAddressFormProps
> = ({
  userID,
  setIsCorrespondenceAddressOpen,
  isCorrespondenceAddressOpen,
  adresZamieszkania,
  adresZameldowania,
}) => {
  const [add] = useMutation(userAddressAddMutation)
  const [addressType, setAddressType] = useState('zameldowania')
  const [initialValues, setInitialValues] = useState({} as FormInitialValues)
  const { message } = App.useApp()

  const [searchFullData] = useLazyQuery(findFullTerritoryDataQuery)

  const [radioValue, setRadioValue] = useState('zameldowania')

  const { voivodeshipsData, municipalitiesData, communitiesData } =
    useTerritorialDivision(
      0,
      initialValues.municipality,
      initialValues.community
    )

  const { voivodeshipID, setVoivodeshipID } = voivodeshipsData
  const { communities, communityID, setCommunityID } = communitiesData
  const { municipalities, municipalityID, setMunicipalityID } =
    municipalitiesData

  // Dodaj state do przechowywania wartości wybranej województwa
  const [, setSelectedVoivodeship] = useState<string | undefined>(undefined)

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

  const addAddress = async (values: AddressInfo) => {
    // dodaj oba adresy
    try {
      // adres zamieszkania
      const zamieszkanie = await add({
        variables: {
          props: {
            usersAddress_userID: userID,
            usersAddress_street: adresZamieszkania.usersAddress_street,
            usersAddress_houseNumber:
              adresZamieszkania.usersAddress_houseNumber,
            usersAddress_apartamentNumber:
              adresZamieszkania.usersAddress_apartamentNumber ?? null,
            usersAddress_postCode: adresZamieszkania.usersAddress_postCode,
            usersAddress_city: adresZamieszkania.usersAddress_city,
            usersAddress_typeID: 2,
            usersAddress_communityID:
              adresZamieszkania.usersAddress_communityID,
          },
        },
      })

      const statusZamieszkanie =
        zamieszkanie?.data?.user?.addressInfo?.add?.status

      // adres korespondencyjny
      const korespondencja = await add({
        variables: {
          props: {
            usersAddress_userID: userID,
            usersAddress_street: values.usersAddress_street,
            usersAddress_houseNumber: values.usersAddress_houseNumber,
            usersAddress_apartamentNumber:
              values.usersAddress_apartamentNumber ?? null,
            usersAddress_postCode: values.usersAddress_postCode,
            usersAddress_city: values.usersAddress_city,
            usersAddress_typeID: 1,
            usersAddress_communityID: values.community,
          },
        },
      })

      const statusKorespondencja =
        korespondencja?.data?.user?.addressInfo?.add?.status

      if (
        statusZamieszkanie?.message === 'Error' ||
        statusKorespondencja?.message === 'Error'
      ) {
        if (statusZamieszkanie?.message === 'Error') {
          await message.error(statusZamieszkanie.description ?? 'Wystąpił błąd')
        }

        if (statusKorespondencja?.message === 'Error') {
          await message.error(
            statusKorespondencja.description ?? 'Wystąpił błąd'
          )
        }
      } else {
        setIsCorrespondenceAddressOpen(false)

        await message.success('Wysłano wniosek o dodanie adresu')
      }
    } catch {
      await message.error('Wystąpił błąd')
    }
  }

  const radioOnChange = (e: RadioChangeEvent) => {
    setRadioValue(e.target.value as string)
    setAddressType(e.target.value as string)
  }

  useEffect(() => {
    ;(async () => {
      if (addressType === 'zamieszkania' || addressType === 'zameldowania') {
        const { usersAddress_communityID, ...restOfAddressData } =
          addressType === 'zamieszkania' ? adresZamieszkania : adresZameldowania

        const data = await completeAddressData({
          usersAddress_communityID,
        })

        let initialValues: FormInitialValues = {
          communityName: undefined,
          municipality: undefined,
          municipalityName: undefined,
          usersAddress_ID: undefined,
          usersAddress_apartamentNumber: undefined,
          usersAddress_city: undefined,
          usersAddress_communityID: undefined,
          usersAddress_houseNumber: undefined,
          usersAddress_postCode: undefined,
          usersAddress_street: undefined,
          usersAddress_typeID: undefined,
          usersAddress_userID: undefined,
          voivodeship: undefined,
          voivodeshipName: undefined,
          community: undefined,
        }

        const voivodeshipID =
          (data?.voivodeship.voivodeship_ID &&
            data.voivodeship.voivodeship_ID) ??
          undefined
        const voivodeshipName =
          (data?.voivodeship.voivodeship_name &&
            data.voivodeship.voivodeship_name) ??
          undefined
        const municipalityID =
          (data?.municipality.municipality_ID &&
            data.municipality.municipality_ID) ??
          undefined
        const municipalityName =
          (data?.municipality.municipality_name &&
            data.municipality.municipality_name) ??
          undefined
        const communityName =
          (data?.community.community_name && data.community.community_name) ??
          undefined
        const communityID =
          (data?.community.community_ID && data.community.community_ID) ??
          undefined

        initialValues = {
          ...restOfAddressData,
          voivodeship: voivodeshipID,
          municipality: municipalityID,
          community: communityID,
          voivodeshipName,
          municipalityName,
          communityName,
        }
        setInitialValues(initialValues)

        // Aktualizuj wybrane województwo

        setSelectedVoivodeship(voivodeshipName)
      } else {
        const initialValues = {
          usersAddress_street: undefined,
          usersAddress_houseNumber: undefined,
          usersAddress_apartamentNumber: undefined,
          usersAddress_postCode: undefined,
          usersAddress_city: undefined,
          usersAddress_communityID: undefined,
          communityName: undefined,
          municipality: undefined,
          municipalityName: undefined,
          usersAddress_ID: undefined,
          usersAddress_typeID: undefined,
          usersAddress_userID: undefined,
          voivodeship: undefined,
          voivodeshipName: undefined,
          community: undefined,
        }
        setInitialValues(initialValues)
        setSelectedVoivodeship(undefined)
      }
    })()
  }, [addressType])

  return (
    <Modal
      className={styles.modal}
      footer={
        <>
          <Button
            onClick={() => {
              setIsCorrespondenceAddressOpen(false)
            }}
          >
            Anuluj
          </Button>
          {radioValue === 'inny' ? (
            <Button
              form="correspondenceAddressUpdate"
              htmlType="submit"
              type="primary"
            >
              Dodaj adres
            </Button>
          ) : (
            <Button
              type="primary"
              onClick={async () => addAddress(initialValues as AddressInfo)}
            >
              Dodaj adres
            </Button>
          )}
        </>
      }
      open={isCorrespondenceAddressOpen}
      onCancel={() => {
        setIsCorrespondenceAddressOpen(false)
      }}
    >
      <>
        <h2>Uzupełnianie adresu korespondencyjnego</h2>
        <Radio.Group onChange={radioOnChange} value={radioValue}>
          <Space direction="vertical">
            <Radio
              value={'zameldowania'}
              defaultChecked={addressType === 'zameldowania'}
            >
              Taki sam jak zameldowania
            </Radio>
            <Radio value={'zamieszkania'}>Taki sam jak zamieszkania</Radio>
            <Radio value={'inny'}>Inny</Radio>
          </Space>
        </Radio.Group>

        {radioValue === 'inny' ? (
          <Form
            onSubmit={addAddress}
            validate={validateAddressInfo}
            initialValues={initialValues}
          >
            {({ handleSubmit }) => (
              <form id="correspondenceAddressUpdate" onSubmit={handleSubmit}>
                <Select
                  name="voivodeship"
                  placeholder="Województwo"
                  selectOptions={voivodeships}
                  updateState={setVoivodeshipID}
                  defaultValue={
                    initialValues.voivodeshipName
                      ? initialValues.voivodeshipName.charAt(0) +
                        initialValues.voivodeshipName.slice(1).toLowerCase()
                      : 'Województwo'
                  }
                  value={voivodeshipID}
                />
                <Select
                  name="municipality"
                  placeholder="Powiat"
                  defaultValue={undefined}
                  selectOptions={
                    municipalities.length > 0 ? municipalities : []
                  }
                  updateState={setMunicipalityID}
                  value={municipalityID}
                />

                <Select
                  name="usersAddress_communityID"
                  placeholder="Gmina"
                  defaultValue={undefined}
                  selectOptions={communities.length > 0 ? communities : []}
                  updateState={setCommunityID}
                  value={communityID}
                />
                <Input
                  type="text"
                  name="usersAddress_postCode"
                  placeholder="Kod pocztowy"
                />
                <Input
                  type="text"
                  name="usersAddress_city"
                  placeholder="Miejscowość"
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
                  placeholder="Numer lokalu"
                />
              </form>
            )}
          </Form>
        ) : (
          <div>
            <p>Województwo: {initialValues.voivodeshipName}</p>
            <p>Powiat: {initialValues.municipalityName}</p>
            <p>Gmina: {initialValues.communityName}</p>
            <p>
              Miasto: {initialValues.usersAddress_postCode}{' '}
              {initialValues.usersAddress_city}
            </p>
            <p>
              Adres: {initialValues.usersAddress_street}{' '}
              {initialValues.usersAddress_houseNumber}
            </p>
          </div>
        )}
      </>
    </Modal>
  )
}
