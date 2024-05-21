import React from 'react'
import { Form, type FormProps } from 'react-final-form'
import { Button } from 'antd'
import { useLazyQuery } from '@apollo/client'
import { type PasswordRecoveryProps } from '../interfaces'
import styles from '../PasswordReminder.module.scss'
import inputStyles from './OTPInput.module.scss'
import { graphql } from '@/gql'
import { NumberInput } from '@/components/domains/common/Inputs'

const UserRecoveryTokenQuery = graphql(`
  query UserRecoveryTokenQuery($props: UserIDProps!) {
    user {
      passwordRecovery {
        compare(props: $props)
      }
    }
  }
`)

export const OTPInput: React.FC<PasswordRecoveryProps> = ({
  setPage,
  currentUserID,
}) => {
  const [token] = useLazyQuery(UserRecoveryTokenQuery, {
    fetchPolicy: 'no-cache',
  })

  const handleForm = async (values: FormProps) => {
    if (!currentUserID || !values) return

    const inputToken = Object.entries(values)
      .map(([, value]) => value as string)
      .join('')

    const { data } = await token({
      variables: {
        props: {
          user_ID: currentUserID,
          user_inputToken: inputToken,
        },
      },
    })

    const result = data?.user?.passwordRecovery?.compare

    if (result) {
      setPage('reset')
      return
    }

    return { opt1: 'Wprowadzono zły token' }
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
      <div>
        <Form onSubmit={handleForm}>
          {({
            handleSubmit,
            touched = {},
            errors = {},
            submitErrors,
            dirtySinceLastSubmit,
          }) => {
            const displayError = Object.entries(errors)
              ?.map(([, value], index) => {
                if (!value) return
                if (touched[`otp${index}`] && value) return value as string
                return undefined
              })
              .filter((el) => el !== undefined)

            console.log(displayError)
            return (
              <form onSubmit={handleSubmit} className={styles.form}>
                <h2>Wprowadź kod, który został wysłany na twój adres email</h2>
                <div className={inputStyles.inputWrapper}>
                  {Array.from({ length: 4 }).map((_, index) => {
                    // kluczem może być index, bo w trakcie działania nie będzie zmieniała się liczba pozycji
                    return (
                      <NumberInput
                        key={index}
                        name={`otp${index}`}
                        className={`${inputStyles.input} `}
                        type="number"
                        placeholder={''}
                        required
                        noFieldLevelErrorDisplay
                      />
                    )
                  })}
                </div>
                {displayError.length > 0 && (
                  <div className={inputStyles.status}>
                    Wszystkie pola są wymagane
                  </div>
                )}
                {submitErrors?.opt1 && !dirtySinceLastSubmit && (
                  <div className={inputStyles.status}>{submitErrors?.opt1}</div>
                )}
                <br />
                <Button
                  type="primary"
                  htmlType="submit"
                  className={styles.loginButton}
                >
                  <p>Zweryfikuj konto</p>
                </Button>
              </form>
            )
          }}
        </Form>
      </div>
    </>
  )
}
