import { App, Button } from 'antd'
import { useMutation } from '@apollo/client'
import { Form } from 'react-final-form'
import { useState } from 'react'
import classNames from 'classnames'
import { UserCreateCorrespondecneAddressForm } from '../UserCreateCorrespondenceAddressForm/UserCreateCorrespondenceAddressForm'
import {
  type UserCreateAddressFormProps,
  type AddressInfo,
} from '../../userProfileInterfaces'
import styles from './UserCreateAddressForm.module.scss'
import { validateAddressInfo } from './formValidation'
import { graphql } from '@/gql'
import { Input } from '@/components/domains/common/Input'
import { Select } from '@/components/domains/common/Select'
import { voivodeships } from '@/utils/voivodeshipsData'
import useTerritorialDivision from '@/components/domains/common/hooks/useTerritorialDivision'
import { Status } from '@/types/Status'
import { AddressType } from '@/types/AddressType'

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

export const UserCreateAddressForm: React.FC<UserCreateAddressFormProps> = ({
  userID,
  addressInfo,
  isOpen,
}) => {
  const [add, { loading }] = useMutation(userAddressAddMutation)
  const [isCorrespondenceAddressOpen, setIsCorrespondenceAddressOpen] =
    useState(false)
  const [adresZamieszkania, setAdresZamieszkania] = useState<AddressInfo>()
  const { message } = App.useApp()
  const { voivodeshipsData, municipalitiesData, communitiesData } =
    useTerritorialDivision()
  const { voivodeshipID, setVoivodeshipID } = voivodeshipsData
  const { communities, communityID, setCommunityID } = communitiesData
  const { municipalities, municipalityID, setMunicipalityID } =
    municipalitiesData

  const addAddress = async (values: AddressInfo) => {
    values.usersAddress_typeID = Number(values.usersAddress_typeID)
    setAdresZamieszkania(values)

    // JEŚLI DODANO ADRES ZAMIESZKANIA, ZAPYTAJ O ADRES KORESPONDECYJNY (O ILE JESZCZE NIE ISTNIEJE)
    if (
      values.usersAddress_typeID === AddressType.RESIDENTIAL_ADRESS &&
      addressInfo.filter((a) => a.usersAddress_typeID === Status.ACTIVE)
        .length === 0
    ) {
      setIsCorrespondenceAddressOpen(true)
    } else {
      const { data } = await add({
        variables: {
          props: {
            usersAddress_apartamentNumber:
              values.usersAddress_apartamentNumber ?? null,
            usersAddress_city: values.usersAddress_city,
            usersAddress_communityID: values.usersAddress_communityID,
            usersAddress_houseNumber: values.usersAddress_houseNumber,
            usersAddress_postCode: values.usersAddress_postCode,
            usersAddress_street: values.usersAddress_street,
            usersAddress_typeID: values.usersAddress_typeID,
            usersAddress_userID: userID,
          },
        },
      })
      const status = data?.user?.addressInfo?.add?.status

      await (status?.message === 'Error'
        ? message.error(`${status.description ?? 'Wystąpił błąd'}`)
        : message.success('Wysłano wniosek o dodanie adresu'))
    }
  }

  const adresZameldowania = addressInfo.find(
    (a) => a.usersAddress_typeID === AddressType.REGISTERED_ADRESS
  )
  return (
    <div className={classNames(styles.form, isOpen ? styles.open : '')}>
      {isCorrespondenceAddressOpen && adresZameldowania && adresZamieszkania ? (
        <UserCreateCorrespondecneAddressForm
          userID={userID}
          setIsCorrespondenceAddressOpen={setIsCorrespondenceAddressOpen}
          isCorrespondenceAddressOpen={isCorrespondenceAddressOpen}
          adresZamieszkania={adresZamieszkania}
          adresZameldowania={adresZameldowania}
        />
      ) : null}
      <Form
        onSubmit={addAddress}
        className={styles.form}
        validate={validateAddressInfo}
      >
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <div>
              <div>
                <h3>Dodaj nowy adres</h3>
                <Select
                  name="usersAddress_typeID"
                  selectOptions={[
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
                  ]}
                  placeholder="Rodzaj adresu"
                  defaultValue="Rodzaj adresu"
                />
                <Select
                  name="voivodeship"
                  placeholder="Województwo"
                  selectOptions={voivodeships}
                  updateState={setVoivodeshipID}
                  value={voivodeshipID}
                  defaultValue="Województwo"
                />
                <Select
                  name="municipality"
                  placeholder="Powiat"
                  selectOptions={
                    municipalities.length > 0 ? municipalities : []
                  }
                  updateState={setMunicipalityID}
                  value={municipalityID}
                  defaultValue="Powiat"
                />
                <Select
                  name="usersAddress_communityID"
                  placeholder="Gmina"
                  selectOptions={communities.length > 0 ? communities : []}
                  updateState={setCommunityID}
                  value={communityID}
                  defaultValue="Gmina"
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
                  withGradient
                  type="text"
                  name="usersAddress_houseNumber"
                  placeholder="Numer budynku"
                />
                <Input
                  type="text"
                  name="usersAddress_apartamentNumber"
                  placeholder="Numer lokalu"
                />
              </div>
            </div>
            <div className={styles.submitButton}>
              <Button htmlType="submit" type="primary" loading={loading}>
                Wyślij wniosek o dodanie nowego adresu
              </Button>
            </div>
          </form>
        )}
      </Form>
    </div>
  )
}
