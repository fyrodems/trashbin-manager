import React, { useState } from 'react'
import { Form } from 'react-final-form'
import { App, Button, Modal } from 'antd'
import { useMutation } from '@apollo/client'
import { EditOutlined } from '@ant-design/icons'
import { PasswordInput } from '../../../common/Inputs'
import styles from './AdminOfficialChangePasswordModal.module.scss'
import { graphql } from '@/gql'

interface AdminOfficialChangePasswordModalProps {
  user_ID: number
}

const adminChangeOfficialPassword = graphql(`
  mutation AdminChangePassword(
    $props: AdminChangeOfficialAndSuperOfficialChangePasswordProps!
  ) {
    admin {
      officials {
        changePassword(props: $props) {
          status {
            message
          }
        }
      }
    }
  }
`)

interface FormProps {
  newPassword: string
  confirmNewPassword: string
}

export const AdminOfficialChangePasswordModal: React.FC<
  AdminOfficialChangePasswordModalProps
> = ({ user_ID }) => {
  const [open, setOpen] = useState(false)
  const { message } = App.useApp()

  const [changePassword, { loading }] = useMutation(
    adminChangeOfficialPassword,
    {
      fetchPolicy: 'no-cache',
    }
  )

  const onSubmit = async (values: FormProps) => {
    const { newPassword, confirmNewPassword } = values

    if (newPassword !== confirmNewPassword)
      return { confirmNewPassword: 'Hasła się różnią' }

    const { data } = await changePassword({
      variables: {
        props: {
          user_ID,
          user_newPassword: newPassword,
          user_confirmNewPassword: confirmNewPassword,
        },
      },
    })

    const status = data?.admin?.officials?.changePassword?.status.message

    await (status === 'Error'
      ? message.error('Wystąpił błąd')
      : message.success('Poprawnie zmieniono dane'))
    setOpen(false)
  }

  return (
    <>
      <Button
        onClick={() => {
          setOpen(true)
        }}
        className={styles.iconButton}
      >
        <EditOutlined />
      </Button>
      {open && (
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
          <Form onSubmit={onSubmit}>
            {({ handleSubmit }) => (
              <form id="passwordUpdate" onSubmit={handleSubmit}>
                <PasswordInput name="newPassword" placeholder="Nowe hasło" />
                <PasswordInput
                  name="confirmNewPassword"
                  placeholder="Powtórz hasło"
                />
              </form>
            )}
          </Form>
        </Modal>
      )}
    </>
  )
}
