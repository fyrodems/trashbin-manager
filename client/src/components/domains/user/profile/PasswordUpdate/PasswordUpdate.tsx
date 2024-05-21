import { useMutation } from '@apollo/client'
import { Button, Modal, App } from 'antd'
import { type FormApi } from 'final-form'
import { Form } from 'react-final-form'
import {
  type PasswordValues,
  type PasswordUpdateProps,
} from '../userProfileInterfaces'
import styles from './PasswordUpdate.module.scss'
import { graphql } from '@/gql'
import { Input } from '@/components/domains/common/Input'
import { PasswordInput } from '@/components/domains/common/Inputs'
import { validationMessages } from '@/utils/validationMessages'

const passwordUpdateMutation = graphql(`
  mutation PasswordUpdate($props: UserInfoPasswordMutationProps!) {
    user {
      info {
        password(props: $props) {
          status {
            message
          }
        }
      }
    }
  }
`)

export const PasswordUpdate: React.FC<PasswordUpdateProps> = ({
  open,
  setOpen,
}) => {
  const [update, { loading }] = useMutation(passwordUpdateMutation)
  const { message } = App.useApp()
  const onSubmit = async (
    values: PasswordValues,
    { restart }: FormApi<PasswordValues>
  ) => {
    const { data } = await update({
      variables: {
        props: {
          old: values.oldPassword,
          new: values.newPassword,
        },
      },
    })

    if (data?.user?.info?.password.status.message === 'Error') {
      return {
        oldPassword: 'Nieprawidłowe hasło',
      }
    }

    await message.success('Zmieniono hasło')
    restart()
    setOpen(false)
  }

  const validate = (values: PasswordValues) => {
    return {
      oldPassword: values.oldPassword ? undefined : validationMessages.required,
    }
  }

  return (
    <Modal
      className={styles.modal}
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
            form="passwordUpdate"
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
      <Form onSubmit={onSubmit} validate={validate}>
        {({ handleSubmit }) => (
          <form
            className={styles.form}
            id="passwordUpdate"
            onSubmit={handleSubmit}
          >
            <Input
              name="oldPassword"
              placeholder="Poprzednie hasło"
              type="password"
            />
            <PasswordInput name="newPassword" placeholder="Nowe hasło" />
          </form>
        )}
      </Form>
    </Modal>
  )
}
