import { useMutation } from '@apollo/client'
import { App, Button, Divider, Modal } from 'antd'
import { Form } from 'react-final-form'
import {
  type OfficialValues,
  type OfficialUpdateProps,
} from '../superOfficialInterfaces'
import { Input } from '@/components/domains/common/Input'
import { graphql } from '@/gql'

const editOfficialMutation = graphql(`
  mutation SuperOfficialOfficialEdit(
    $props: SuperOfficialOfficialEditMutationProps!
  ) {
    official {
      officials {
        edit(props: $props) {
          status {
            message
          }
        }
      }
    }
  }
`)

export const SuperOfficialEditOfficialForm: React.FC<OfficialUpdateProps> = ({
  open,
  setOpen,
  officialData,
  refetch,
}) => {
  const [update, { loading }] = useMutation(editOfficialMutation)
  const { message } = App.useApp()

  const initialValues: OfficialValues = {
    users_ID: officialData.users_ID,
    users_login: officialData.users_login,
    users_name: officialData.users_name,
    users_identificationNumber: officialData.users_identificationNumber,
    users_phoneNumber: officialData.users_phoneNumber ?? '',
  }

  const onSubmit = async (values: OfficialValues) => {
    const { data } = await update({
      variables: {
        props: {
          ...values,
        },
      },
    })

    const status = data?.official?.officials?.edit?.status?.message

    await (status === 'Error'
      ? message.error('Wystąpił błąd')
      : message.success('Poprawnie zmieniono dane'))

    setOpen(false)

    await refetch()
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
            form="officialData"
            htmlType="submit"
            type="primary"
            loading={loading}
          >
            Zmień
          </Button>
        </>
      }
      open={open}
      onCancel={() => {
        setOpen(false)
      }}
    >
      <Form onSubmit={onSubmit} initialValues={initialValues}>
        {({ handleSubmit }) => (
          <form id="officialData" onSubmit={handleSubmit}>
            <Divider orientation="left" orientationMargin={0}>
              Dane urzędnika
            </Divider>
            <Input
              name="users_name"
              placeholder="Imię i Nazwisko"
              type="text"
            />
            <Input
              name="users_identificationNumber"
              placeholder="PESEL"
              type="text"
            />
            <Input name="users_login" placeholder="E-mail" type="text" />
            <Input
              name="users_phoneNumber"
              placeholder="Numer telefonu"
              type="text"
            />

            <Divider orientation="left" orientationMargin={0}>
              Zmiana hasła
            </Divider>

            <Input name="users_password" placeholder="Hasło" type="password" />
            <Input
              name="users_confirmPassword"
              placeholder="Powtórz hasło"
              type="password"
            />
          </form>
        )}
      </Form>
    </Modal>
  )
}
