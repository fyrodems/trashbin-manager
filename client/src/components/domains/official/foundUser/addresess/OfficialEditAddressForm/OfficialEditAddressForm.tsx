import { Button } from 'antd'
import { Form } from 'react-final-form'
import { useEffect, useState } from 'react'
import { useLazyQuery } from '@apollo/client'
import styles from '../OfficialAddress.module.scss'
import { type OfficialEditAddressFormProps } from '../addressesInterfaces'
import { validateAddressInfo } from './formValidation'
import { Input } from '@/components/domains/common/Input'
import useTerritorialDivision from '@/components/domains/common/hooks/useTerritorialDivision'
import { Select } from '@/components/domains/common/Select'
import { voivodeships } from '@/utils/voivodeshipsData'
import { FormModal } from '@/components/domains/common/FormModal'
import { graphql } from '@/gql'

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

export const OfficialEditAddressForm: React.FC<
  OfficialEditAddressFormProps
> = ({ onSubmit, address, isModalOpen, setIsModalOpen }) => {
  const { voivodeshipsData, municipalitiesData, communitiesData } =
    useTerritorialDivision(0, 0, address.usersAddress_communityID)

  const { voivodeshipID, setVoivodeshipID } = voivodeshipsData
  const { communities } = communitiesData
  const { municipalities, municipalityID, setMunicipalityID } =
    municipalitiesData

  const [searchFullData] = useLazyQuery(findFullTerritoryDataQuery)
  const [initialValues, setInitialValues] = useState({})

  const { usersAddress_communityID } = address

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
          ...address,
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
      onSubmit={onSubmit}
      initialValues={initialValues}
      validate={validateAddressInfo}
    >
      {({ handleSubmit }) => (
        <form
          id={`userAddressInfoData-${address.usersAddress_ID}`}
          onSubmit={handleSubmit}
          className={styles.form}
        >
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

          <div className={styles.addressActions}>
            <Button
              onClick={() => {
                setIsModalOpen(false)
              }}
            >
              Anuluj
            </Button>
            <Button
              form={`userAddressInfoData-${address.usersAddress_ID}`}
              htmlType="submit"
              type="primary"
            >
              Zmień
            </Button>
          </div>
        </form>
      )}
    </Form>
  )

  return (
    <FormModal
      popupTitle={`Edycja adresu`}
      buttonContent={'Edytuj dane'}
      formNode={formNode}
      isModalOpen={isModalOpen}
      setIsModalOpen={setIsModalOpen}
      isOfficialEditUserAddress={true}
    />
  )
}
