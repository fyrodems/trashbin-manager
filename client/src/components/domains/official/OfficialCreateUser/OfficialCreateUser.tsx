import { Button, App, Divider, Card, Descriptions } from 'antd'
import { Form } from 'react-final-form'
import { useMutation } from '@apollo/client'
import { Select } from '../../common/Select'
import useTerritorialDivision from '../../common/hooks/useTerritorialDivision'
import { PasswordInput } from '../../common/Inputs'
import { type UserInfo } from './interfaces'
import { validateUserInfo } from './validateCreateUserInfo'
import styles from './OfficialCreateUser.module.scss'
import { Input } from '@/components/domains/common/Input'
import { graphql } from '@/gql'
import { voivodeships } from '@/utils/voivodeshipsData'

const { Item } = Descriptions

const createUserMutation = graphql(`
  mutation OfficialCreateUserAdd($props: OfficialCreateUserAddMutationProps!) {
    official {
      createUser {
        add(props: $props) {
          status {
            message
          }
        }
      }
    }
  }
`)

export const OfficialCreateUser: React.FC = () => {
  const [create, { loading }] = useMutation(createUserMutation)
  const { message } = App.useApp()

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
          users_identificationNumber: values.users_identificationNumber,
          users_password: values.users_password,
          usersAddress_street: values.usersAddress_street,
          usersAddress_houseNumber: values.usersAddress_houseNumber,
          usersAddress_apartamentNumber:
            values.usersAddress_apartamentNumber ?? undefined,
          usersAddress_postCode: values.usersAddress_postCode,
          usersAddress_city: values.usersAddress_city,
          usersAddress_communityID: Number(values.usersAddress_communityID),
        },
      },
    })

    const status = data?.official?.createUser?.add?.status.message

    await (status === 'Error'
      ? message.error('Wystąpił błąd')
      : message.success('Udało się zarejestrować użytkownika!'))
  }

  return (
    <div>
      <div className={styles.section}>
        <div className={styles.heading}>
          <Divider>Dane nowego użytkownika</Divider>
          <Card
            hoverable={false}
            style={{ width: '100%', marginBottom: '3rem' }}
          >
            <Form onSubmit={createUser} validate={validateUserInfo}>
              {({ handleSubmit }) => (
                <form onSubmit={handleSubmit}>
                  <div className={styles.userDetailsWrapper}>
                    <Descriptions
                      labelStyle={{
                        width: window.innerWidth < 576 ? '100px' : '170px',
                      }}
                      column={3}
                      className={styles.firstDescription}
                    >
                      <Item>
                        <div>
                          <p className={styles.dataLabel}>Imię i nazwisko</p>
                          <Input
                            withGradient
                            name="users_name"
                            placeholder="Jan Kowalski"
                            type="text"
                            showLabel={false}
                          />
                        </div>
                      </Item>
                      <Item>
                        <div>
                          <p className={styles.dataLabel}>Email</p>
                          <Input
                            withGradient
                            name="users_login"
                            placeholder="przykład@gmail.com"
                            type="text"
                            showLabel={false}
                          />
                        </div>
                      </Item>
                      <Item>
                        <div className={styles.passwordWrapper}>
                          <p className={styles.dataLabel}>Hasło</p>
                          <PasswordInput
                            withGradient
                            name="users_password"
                            placeholder="Hasło"
                            showLabel={false}
                          />
                        </div>
                      </Item>
                      <Item>
                        <div>
                          <p className={styles.dataLabel}>PESEL</p>
                          <Input
                            withGradient
                            name="users_identificationNumber"
                            placeholder="___________"
                            type="text"
                            showLabel={false}
                          />
                        </div>
                      </Item>
                      <Item>
                        <div>
                          <p className={styles.dataLabel}>Numer telefonu</p>
                          <Input
                            withGradient
                            name="users_phoneNumber"
                            placeholder="_________"
                            type="text"
                            showLabel={false}
                          />
                        </div>
                      </Item>
                      <Item>
                        <div className={styles.passwordWrapper}>
                          <p className={styles.dataLabel}>Powtórz hasło</p>
                          <PasswordInput
                            withGradient
                            name="confirm"
                            placeholder="Powtórz hasło"
                            showLabel={false}
                          />
                        </div>
                      </Item>
                    </Descriptions>
                  </div>

                  <Divider />
                  <div className={styles.userDetailsWrapper}>
                    <div className={styles.addressHeaders}>
                      <h3>Adres zameldowania</h3>

                      <Descriptions
                        labelStyle={{
                          width: window.innerWidth < 576 ? '100px' : '170px',
                        }}
                        column={3}
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
                              selectOptions={
                                communities.length > 0 ? communities : []
                              }
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

                  <div className={styles.addUserButton}>
                    <Button htmlType="submit" type="primary" loading={loading}>
                      Zarejestruj
                    </Button>
                  </div>
                </form>
              )}
            </Form>
          </Card>
        </div>
      </div>
    </div>
  )
}
