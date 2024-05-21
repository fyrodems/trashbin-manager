import { Form, type FormProps } from 'react-final-form'
import { App, Button } from 'antd'
import { useMutation } from '@apollo/client'
import { type PasswordRecoveryProps } from '../interfaces'
import styles from '../PasswordReminder.module.scss'
import { graphql } from '@/gql'
import { PasswordInput } from '@/components/domains/common/Inputs'

const ChangePasswordMutation = graphql(`
  mutation ChangePasswordMutation($props: ChangePasswordMutationProps!) {
    user {
      passwordRecovery {
        resetPassword(props: $props) {
          status {
            message
          }
        }
      }
    }
  }
`)

export const ChangePassword: React.FC<PasswordRecoveryProps> = ({
  setPage,
  currentUserID,
}) => {
  const { message } = App.useApp()

  const [changePassword] = useMutation(ChangePasswordMutation, {
    fetchPolicy: 'no-cache',
  })

  const handleForm = async (values: FormProps) => {
    if (!currentUserID) return

    const { users_password } = values
    const { data } = await changePassword({
      variables: {
        props: {
          user_ID: currentUserID,
          user_newPassword: users_password as string,
        },
      },
    })

    const status = data?.user?.passwordRecovery?.resetPassword?.status?.message

    if (status === 'Error') {
      await message.error('Wystąpił błąd')
      return
    }

    setPage('recovered')
  }

  const validateForm = (values: FormProps) => {
    if (values.users_password !== values.users_repeat_password) {
      return { users_password: 'Wprowadzone hasła różnią się od siebie' }
    }
  }

  return (
    <>
      <div
        style={{ position: 'absolute', top: '0', left: '0' }}
        onClick={() => {
          setPage('login')
        }}
      >
        Cofnij
      </div>
      <Form onSubmit={handleForm} validate={validateForm}>
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit} className={styles.form}>
            <h2>Przypomnij hasło</h2>
            <PasswordInput name="users_password" placeholder="Nowe hasło" />
            <PasswordInput
              name="users_repeat_password"
              placeholder="Powtórz hasło"
            />
            <Button
              type="primary"
              htmlType="submit"
              className={styles.loginButton}
            >
              <p>Zmień hasło</p>
            </Button>
          </form>
        )}
      </Form>
    </>
  )
}
