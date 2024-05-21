import { Form, type FormProps } from 'react-final-form'
import { Button } from 'antd'
import { useMutation } from '@apollo/client'
import { useState } from 'react'
import styles from '../PasswordReminder.module.scss'
import useValidateForms from '../../hooks/useValidateForms'
import { graphql } from '@/gql'
import { TextInput } from '@/components/domains/common/Inputs'
import {
  includeAtSignChar,
  tooLongLogin,
  toShortLogin,
} from '@/utils/validations'
import { validationMessages } from '@/utils/validationMessages'

interface RecoveryByEmailProps {
  setPage: React.Dispatch<React.SetStateAction<string>>
  updateID: (id: number) => void
}

const IsUserExistMutation = graphql(`
  mutation IsUserExist($props: IsUserExistProps!) {
    user {
      passwordRecovery {
        get(props: $props)
      }
    }
  }
`)

const onSendValidators = [tooLongLogin, toShortLogin, includeAtSignChar]

export const RecoveryByEmail: React.FC<RecoveryByEmailProps> = ({
  setPage,
  updateID,
}) => {
  const [username, setUsername] = useState<string>('')

  const [getData, { loading, error }] = useMutation(IsUserExistMutation, {
    fetchPolicy: 'no-cache',
  })

  const handleFormSubmit = async (values: FormProps) => {
    const foundErrors = onSendValidators
      .map((validator) => validator(values.users_login as string))
      .filter((error) => error !== undefined)

    if (foundErrors.length > 0) return { users_login: [...foundErrors] }

    const { data } = await getData({
      variables: {
        props: { users_login: username.trim() },
      },
    })

    if (loading || !data) return
    if (error) {
      console.error(error)
      return
    }

    if (data?.user?.passwordRecovery?.get) {
      setPage('otp')
      updateID(data.user.passwordRecovery.get)
      return
    }

    return { users_login: 'Nie znaleziono takiego użytkownika' }
  }

  const handleFormChange = (e: React.ChangeEvent<HTMLFormElement>) => {
    setUsername(e.target.value as string)
  }

  const validateForm = (values) => {
    return {
      users_login: useValidateForms().checkEmail(values.users_login)
        ? undefined
        : validationMessages.wrongEmail,
    }
  }

  return (
    <Form
      onSubmit={handleFormSubmit}
      validate={validateForm}
      render={({ handleSubmit }) => (
        <form
          onSubmit={handleSubmit}
          className={styles.form}
          onChange={handleFormChange}
        >
          <h2>Przypomnij hasło</h2>
          <div className={styles.inputWrapper}>
            <TextInput
              name="users_login"
              placeholder="E-mail"
              type="text"
              autocompleteDisabled={false}
            />
          </div>
          <Button type="primary" htmlType="submit" className={styles.button}>
            Wyślij token odzyskiwania
          </Button>
        </form>
      )}
    />
  )
}
