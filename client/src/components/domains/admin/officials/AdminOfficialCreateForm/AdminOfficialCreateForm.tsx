import { Button, App, Descriptions } from 'antd'
import { Form } from 'react-final-form'
import { useMutation } from '@apollo/client'
import { useState } from 'react'
import { PlusOutlined } from '@ant-design/icons'
import { Select } from '../../../common/Select'
import useTerritorialDivision from '../../../common/hooks/useTerritorialDivision'
import { type UserInfo } from './interfaces'
import styles from './AdminOfficialCreateForm.module.scss'
import { Input } from '@/components/domains/common/Input'
import { validationMessages } from '@/utils/validationMessages'
import { graphql } from '@/gql'
import { FormModal } from '@/components/domains/common/FormModal'
import { voivodeships } from '@/utils/voivodeshipsData'

const { Item } = Descriptions

const createOfficialMutation = graphql(`
  mutation AdminOfficialsAdd($props: AdminNewOfficialAddMutationProps!) {
    admin {
      officials {
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

export const AdminOfficialCreateForm: React.FC = () => {
  const [create, { loading }] = useMutation(createOfficialMutation)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const { message } = App.useApp()
  const validateOfficialInfo = (values: Partial<UserInfo>) => {
    const requiredError = validationMessages.required

    const errors: Partial<Record<keyof UserInfo, string>> = {
      users_name: values.users_name ? undefined : requiredError,
      users_identificationNumber: values.users_identificationNumber
        ? undefined
        : requiredError,
      users_login: values.users_login ? undefined : requiredError,
      users_password: values.users_password ? undefined : requiredError,
      confirm:
        values.users_password === values.confirm
          ? undefined
          : validationMessages.passwordsDontMatch,
    }

    return errors
  }

  const { voivodeshipsData, municipalitiesData, communitiesData } =
    useTerritorialDivision()

  const { voivodeshipID, setVoivodeshipID } = voivodeshipsData
  const { communities, communityID, setCommunityID } = communitiesData
  const { municipalities, municipalityID, setMunicipalityID } =
    municipalitiesData

  const createOfficial = async (values: UserInfo) => {
    const { data } = await create({
      variables: {
        props: {
          users_name: values.users_name,
          users_login: values.users_login,
          users_phoneNumber: values.users_phoneNumber,
          users_identificationNumber: values.users_identificationNumber,
          users_password: values.users_password,
          usersAddress_street: values.usersAddress_street,
          usersAddress_houseNumber: values.usersAddress_houseNumber,
          usersAddress_apartamentNumber: values.usersAddress_apartamentNumber,
          usersAddress_postCode: values.usersAddress_postCode,
          usersAddress_city: values.usersAddress_city,
          usersAddress_communityID: values.usersAddress_communityID,
        },
      },
    })

    const status = data?.admin?.officials?.add?.status

    if (status?.message === 'Error') {
      await message.error('Wystąpił błąd')
      return
    }

    await message.success('Udało się dodać urzędnika!')
  }

  const formNode = (
    <Form onSubmit={createOfficial} validate={validateOfficialInfo}>
      {({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <div>
            <div>
              <h3>Dane personalne</h3>
              <Input
                name="users_name"
                placeholder="Imię i Nazwisko"
                type="text"
              />
              <Input
                name="users_identificationNumber"
                placeholder="PESEL/NIP"
                type="text"
              />
              <Input
                name="users_phoneNumber"
                placeholder="Numer telefonu"
                type="text"
              />
            </div>

            <div>
              <h3>Dane do logowania</h3>
              <Input
                name="users_login"
                placeholder="Email(to jest login)"
                type="text"
              />
              <Input
                name="users_password"
                placeholder="Hasło"
                type="password"
              />
              <Input
                name="confirm"
                placeholder="Powtórz hasło"
                type="password"
              />
            </div>

            <div className={styles.locationData}>
              <h3>Dane lokalizacyjne (adres gminy/adres firmy)</h3>

              <Descriptions
                labelStyle={{
                  width: window.innerWidth < 576 ? '100px' : '170px',
                }}
                column={1}
                className={styles.firstDescription}
              >
                <Item>
                  <div className={styles.dataContent}>
                    <p className={styles.dataLabel}>Województwo</p>
                    <Select
                      name="voivodeship"
                      placeholder="Województwo"
                      selectOptions={voivodeships}
                      updateState={setVoivodeshipID}
                      value={voivodeshipID}
                    />
                  </div>
                </Item>
                <Item>
                  <div className={styles.dataContent}>
                    <p className={styles.dataLabel}>Powiat</p>
                    <Select
                      name="municipality"
                      placeholder="Powiat"
                      selectOptions={
                        municipalities.length > 0 ? municipalities : []
                      }
                      updateState={setMunicipalityID}
                      value={municipalityID}
                    />
                  </div>
                </Item>
                <Item>
                  <div className={styles.dataContent}>
                    <p className={styles.dataLabel}>Gmina</p>
                    <Select
                      name="usersAddress_communityID"
                      placeholder="Gmina"
                      selectOptions={communities.length > 0 ? communities : []}
                      updateState={setCommunityID}
                      value={communityID}
                    />
                  </div>
                </Item>
                <Item>
                  <div className={styles.dataContent}>
                    <p className={styles.dataLabel}>Ulica</p>
                    <Input
                      withGradient
                      name="usersAddress_street"
                      placeholder="Ulica"
                      type="text"
                      showLabel={false}
                    />
                  </div>
                </Item>
                <Item>
                  <div className={styles.dataContent}>
                    <p className={styles.dataLabel}>Numer budynku</p>
                    <Input
                      withGradient
                      name="usersAddress_houseNumber"
                      placeholder="Numer budynku"
                      type="text"
                      showLabel={false}
                    />
                  </div>
                </Item>
                <Item>
                  <div className={styles.dataContent}>
                    <p className={styles.dataLabel}>
                      Numer mieszkania (opcjonalne)
                    </p>
                    <Input
                      withGradient
                      name="usersAddress_apartamentNumber"
                      placeholder="Numer mieszkania"
                      type="text"
                      showLabel={false}
                    />
                  </div>
                </Item>
                <Item>
                  <div className={styles.dataContent}>
                    <p className={styles.dataLabel}>Kod pocztowy</p>
                    <Input
                      withGradient
                      name="usersAddress_postCode"
                      placeholder="Kod pocztowy"
                      type="text"
                      showLabel={false}
                    />
                  </div>
                </Item>
                <Item>
                  <div className={styles.dataContent}>
                    <p className={styles.dataLabel}>Miejscowość</p>
                    <Input
                      withGradient
                      name="usersAddress_city"
                      placeholder="Miasto"
                      type="text"
                      showLabel={false}
                    />
                  </div>
                </Item>
              </Descriptions>
            </div>
          </div>
          <Button htmlType="submit" type="primary" loading={loading}>
            Zarejestruj
          </Button>
        </form>
      )}
    </Form>
  )

  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
      <FormModal
        popupTitle={'Tworzenie konta'}
        formNode={formNode}
        buttonType="primary"
        buttonContent={
          <span style={{ display: 'flex', gap: '8px' }}>
            <PlusOutlined />
            Dodaj podmiot
          </span>
        }
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </div>
  )
}
