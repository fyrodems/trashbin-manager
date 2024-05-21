import { App, Button } from 'antd'
import { Form } from 'react-final-form'
import { Link } from 'react-router-dom'
import { useMutation } from '@apollo/client'
import { useState } from 'react'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import { IdleLogoutModal } from '../../common/IdleLogoutModal/IdleLogoutModal'
import styles from './LoginView.module.scss'
import { Input } from '@/components/domains/common/Input'
import { graphql } from '@/gql'
import { client } from '@/graphql/client'
import { validationMessages } from '@/utils/validationMessages'

interface LoginFormValues {
  users_login: string
  users_password: string
}

const loginMutation = graphql(`
  mutation Login($props: AuthLoginMutationProps!) {
    auth {
      login(props: $props) {
        status {
          message
        }
      }
    }
  }
`)

export const LoginView: React.FC = () => {
  const [login, { loading }] = useMutation(loginMutation)
  const [showPassword, setShowPassword] = useState(false)
  const { notification } = App.useApp()

  const onSubmit = async (values: LoginFormValues) => {
    const { data } = await login({
      variables: {
        props: {
          users_login: values.users_login,
          users_password: values.users_password,
        },
      },
    })

    if (data?.auth?.login.status.message === 'Error') {
      notification.error({
        duration: 3,
        message: 'Nieprawidłowy e-mail albo hasło',
      })
      return {
        users_login: validationMessages.wrongEmailOrPassword,
        users_password: validationMessages.wrongEmailOrPassword,
      }
    }

    if (data?.auth?.login.status.message === 'WaitingForApproval') {
      notification.warning({
        duration: 30,
        message: 'Twoje konto nie zostało jeszcze zaakceptowane',
        description: 'Spróbuj ponownie później',
      })
    } else if (data?.auth?.login.status.message === 'Blocked') {
      notification.warning({
        duration: 30,
        message: 'Twoje konto zostało zablokowane',
      })
    }

    void client.resetStore()
  }

  const validateRequiredInputs = (values: Partial<LoginFormValues>) => {
    const errors: Record<keyof LoginFormValues, string | undefined> = {
      users_login: values.users_login ? undefined : validationMessages.required,
      users_password: values.users_password
        ? undefined
        : validationMessages.required,
    }

    return errors
  }

  const handleShowPassword = () => {
    setShowPassword(!showPassword)
  }

  return (
    <>
      <IdleLogoutModal />
      <div className={styles.loginWrapper}>
        <div className={styles.formWrapper}>
          <Form onSubmit={onSubmit} validate={validateRequiredInputs}>
            {({ handleSubmit }) => (
              <form onSubmit={handleSubmit} className={styles.form}>
                <h2>
                  Wprowadź swój email, <br /> aby się zalogować
                </h2>
                <div className={styles.inputWrapper}>
                  <Input
                    className={`${styles.input} ${styles.firstInput}`}
                    name="users_login"
                    placeholder="E-mail"
                    type="text"
                    autocompleteDisabled={false}
                  />
                  <div className={styles.secondInputWrapper}>
                    <Input
                      className={`${styles.input} ${styles.secondInput}`}
                      name="users_password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Hasło"
                      autocompleteDisabled={false}
                    />
                    <span onClick={handleShowPassword}>
                      {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                    </span>
                  </div>
                </div>

                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  className={styles.loginButton}
                >
                  <p>Zaloguj</p>
                </Button>
              </form>
            )}
          </Form>
          <div className={styles.registerContainer}>
            <span>Nie masz konta?</span>
            <Link to="/register">Zarejestruj się</Link>
          </div>
          <br />
          <div className={styles.registerContainer}>
            <Link to="/forgot">Przypomnij hasło</Link>
          </div>
        </div>
      </div>
    </>
  )
}
