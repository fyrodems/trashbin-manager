import { Link } from 'react-router-dom'
import { useMutation } from '@apollo/client'
import { Form } from 'react-final-form'
import { App, Button } from 'antd'
import { voivodeships } from '../../../../utils/voivodeshipsData'
import { Select } from '../../common/Select'
import useTerritorialDivision from '../../common/hooks/useTerritorialDivision'
import { PasswordInput } from '../../common/Inputs'
import { type UserInfo } from './interfaces'
import styles from './RegisterView.module.scss'
import { validateUserInfo } from './registerValidation'
import { graphql } from '@/gql'
import { client } from '@/graphql/client'
import { Input } from '@/components/domains/common/Input'

const createUserMutation = graphql(`
  mutation CreateUser($props: AuthRegisterMutationProps!) {
    auth {
      register(props: $props) {
        status {
          message
        }
      }
    }
  }
`)

export const RegisterView: React.FC = () => {
  const { message } = App.useApp()
  const [create, mutationData] = useMutation(createUserMutation)
  const { voivodeshipsData, municipalitiesData, communitiesData } =
    useTerritorialDivision()

  const { voivodeshipID, setVoivodeshipID } = voivodeshipsData
  const { communities, communityID, setCommunityID } = communitiesData
  const { municipalities, municipalityID, setMunicipalityID } =
    municipalitiesData

  const createUser = async (values: UserInfo) => {
    const { data } = await create({
      variables: {
        props: {
          users_name: values.users_name,
          users_login: values.users_login,
          users_phoneNumber: values.users_phoneNumber,
          users_identificationNumber:
            values.users_identificationNumber.toString(),
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

    const status = data?.auth?.register.status.message

    if (status === 'Error') {
      await message.error('Wystąpił błąd')
      return
    }

    void client.resetStore()
  }

  return (
    <>
      <Form onSubmit={createUser} validate={validateUserInfo}>
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <div className={styles.form}>
              <div>
                <h2>Dane personalne</h2>
                <div className={styles.inputWrapper}>
                  <Input
                    withGradient
                    name="users_name"
                    placeholder="Imię i nazwisko"
                    type="text"
                  />
                </div>

                <div className={styles.inputWrapper}>
                  <Input
                    withGradient
                    name="users_identificationNumber"
                    placeholder="PESEL"
                    type="number"
                  />
                  <Input
                    withGradient
                    name="users_phoneNumber"
                    placeholder="Numer telefonu"
                    type="tel"
                  />
                </div>
              </div>

              <div className={styles.inputWrapper}>
                <h2 className={styles.heading}>Dane do logowania</h2>
                <Input
                  withGradient
                  name="users_login"
                  placeholder="E-mail"
                  type="text"
                />
                <PasswordInput
                  withGradient
                  name="users_password"
                  placeholder="Hasło"
                  className={styles.passwordInput}
                />
                <PasswordInput
                  withGradient
                  name="passwordConfirm"
                  placeholder="Powtórz hasło"
                  className={styles.passwordInput}
                />
              </div>
              <div className={styles.inputWrapper}>
                <h2 className={styles.heading}>Adres zameldowania</h2>
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
                  selectOptions={
                    municipalities.length > 0 ? municipalities : []
                  }
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
                <Input
                  withGradient
                  name="usersAddress_postCode"
                  placeholder="Kod pocztowy"
                  type="text"
                />
                <Input
                  withGradient
                  name="usersAddress_city"
                  placeholder="Miejscowość"
                  type="text"
                />
                <Input
                  withGradient
                  name="usersAddress_street"
                  placeholder="Ulica"
                  type="text"
                />
                <Input
                  withGradient
                  name="usersAddress_houseNumber"
                  placeholder="Numer budynku"
                  type="text"
                />
                <Input
                  withGradient
                  name="usersAddress_apartamentNumber"
                  placeholder="Numer lokalu"
                  type="text"
                />
              </div>
            </div>
            <Button
              htmlType="submit"
              type="primary"
              loading={mutationData.loading}
              className={styles.registerButton}
            >
              <p>Zarejestruj</p>
            </Button>
          </form>
        )}
      </Form>
      <div className={styles.loginContainer}>
        <span>Masz już konto?</span>
        <Link to="/login">Zaloguj się</Link>
      </div>
    </>
  )
}
