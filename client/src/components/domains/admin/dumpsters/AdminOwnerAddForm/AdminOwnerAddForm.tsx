import { Button, Modal } from 'antd'
import { Form } from 'react-final-form'
import { useMutation } from '@apollo/client'
import { useState } from 'react'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import { Select } from '../../../common/Select'
import useTerritorialDivision from '../../../common/hooks/useTerritorialDivision'
import {
  type DumpsterUpdateProps,
  type AdminAddOwnerValues,
} from '../adminDumpstersInterfaces'
import { Input } from '@/components/domains/common/Input'
import { graphql } from '@/gql'
import { voivodeships } from '@/utils/voivodeshipsData'
import { toggleState } from '@/utils/functions'

const addOwnerMutation = graphql(`
  mutation AdminOwnersAdd($props: AdminOwnersAddMutationProps!) {
    admin {
      owners {
        add(props: $props) {
          status {
            message
          }
        }
      }
    }
  }
`)

const createNewOwnerMutation = graphql(`
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

export const AdminOwnerAddForm: React.FC<DumpsterUpdateProps> = ({
  open,
  setOpen,
  dumpsterID,
}) => {
  const [update, { loading }] = useMutation(addOwnerMutation)
  const [create] = useMutation(createNewOwnerMutation)
  const [ownerType, setOwnerType] = useState()
  const [newOwnerType, setNewOwnerType] = useState()

  const { voivodeshipsData, municipalitiesData, communitiesData } =
    useTerritorialDivision()

  const { voivodeshipID, setVoivodeshipID } = voivodeshipsData
  const { communities, communityID, setCommunityID } = communitiesData
  const { municipalities, municipalityID, setMunicipalityID } =
    municipalitiesData

  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [showRepeatedPassword, setShowRepeatedPassword] =
    useState<boolean>(false)

  const onSubmit = async (values: AdminAddOwnerValues) => {
    if (ownerType === 2) {
      await update({
        variables: {
          props: {
            user_ID: values.user_ID,
            dumpster_ID: dumpsterID,
          },
        },
      })
    } else {
      const newUser = await create({
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
            users_typeID: Number(newOwnerType),
          },
        },
      })
      if (newUser.data?.admin?.officials?.add?.status.description) {
        const newUserID =
          newUser.data?.admin?.officials?.add?.status.description?.split(' ')
        await update({
          variables: {
            props: {
              // eslint-disable-next-line no-unsafe-optional-chaining
              user_ID: Number(newUserID[newUserID?.length - 1]),
              dumpster_ID: dumpsterID,
            },
          },
        })
      }
    }

    setOpen(false)
  }

  return (
    <Modal
      footer={
        <>
          <Button
            onClick={() => {
              setOpen(false)
            }}
          >
            Anuluj
          </Button>
          <Button
            form="adminOwnerData"
            htmlType="submit"
            type="primary"
            loading={loading}
          >
            Dodaj właściciela
          </Button>
        </>
      }
      open={open}
      onCancel={() => {
        setOpen(false)
      }}
    >
      <Form onSubmit={onSubmit}>
        {({ handleSubmit }) => (
          <form id="adminOwnerData" onSubmit={handleSubmit}>
            <Select
              name="ownerType"
              selectOptions={[
                {
                  label: 'Stwórz nowego użytkownika jako właściciela',
                  value: '1',
                },
                {
                  label: 'Przypisz do istniejącego użytkownika',
                  value: '2',
                },
              ]}
              placeholder="Wybierz rodzaj użytkownika"
              updateState={setOwnerType}
              value={Number(ownerType)}
            />
            {ownerType === 2 ? (
              <Input name="user_ID" type="number" placeholder="user_ID" />
            ) : ownerType === 1 ? (
              <>
                <h3>Stwórz nowe konto przynależne do altany</h3>
                <Select
                  name="newOwnerType"
                  selectOptions={[
                    {
                      label: 'Firma',
                      value: '9',
                    },
                    {
                      label: 'Spółdzielnia mieszkaniowa',
                      value: '10',
                    },
                    {
                      label: 'Gmina',
                      value: '6',
                    },
                  ]}
                  placeholder="Wybierz rodzaj użytkownika"
                  updateState={setNewOwnerType}
                  value={Number(newOwnerType)}
                />
                <div>
                  <h2>Dane podmiotu</h2>
                  <div>
                    <Input
                      withGradient
                      name="users_name"
                      placeholder="Nazwa podmiotu"
                      type="text"
                    />
                  </div>

                  <div>
                    <Input
                      withGradient
                      name="users_identificationNumber"
                      placeholder="NIP"
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
                <div>
                  <h2>Dane do logowania</h2>
                  <Input
                    withGradient
                    name="users_login"
                    placeholder="E-mail"
                    type="text"
                  />

                  <div>
                    <Input
                      withGradient
                      name="users_password"
                      placeholder="Hasło"
                      type={showPassword ? 'text' : 'password'}
                    />
                    <span
                      onClick={() => {
                        toggleState(showPassword, setShowPassword)
                      }}
                    >
                      {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                    </span>
                  </div>

                  <div>
                    <Input
                      withGradient
                      name="passwordConfirm"
                      placeholder="Powtórz hasło"
                      type={showRepeatedPassword ? 'text' : 'password'}
                    />
                    <span
                      onClick={() => {
                        toggleState(
                          showRepeatedPassword,
                          setShowRepeatedPassword
                        )
                      }}
                    >
                      {showRepeatedPassword ? (
                        <AiFillEyeInvisible />
                      ) : (
                        <AiFillEye />
                      )}
                    </span>
                  </div>
                </div>
                <div>
                  <h2>Adres</h2>
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
              </>
            ) : (
              <>
                <h3>Proszę wybrać rodzaj użytkownika </h3>
              </>
            )}
          </form>
        )}
      </Form>
    </Modal>
  )
}
