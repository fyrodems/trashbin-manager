import { useMutation } from '@apollo/client'
import { App, Button, Modal } from 'antd'
import { Form } from 'react-final-form'
import styles from './PINUpdate.module.scss'
import { graphql } from '@/gql'
import { Input } from '@/components/domains/common/Input'

const PINUpdateMutation = graphql(`
  mutation PINUpdate($props: UserInfoPINMutationProps!) {
    user {
      info {
        pin(props: $props) {
          status {
            message
          }
        }
      }
    }
  }
`)

interface UpdatePINProps {
  open: boolean
  setOpen: (state: boolean) => void
}

export const PINUpdate: React.FC<UpdatePINProps> = ({ open, setOpen }) => {
  const [update, { loading }] = useMutation(PINUpdateMutation)
  const { message } = App.useApp()

  const onSubmit = async (values: { newPIN: string }) => {
    const { data } = await update({
      variables: {
        props: {
          new: values.newPIN,
        },
      },
    })
    setOpen(false)

    const status = data?.user?.info?.pin?.status?.message

    await (status === 'Error'
      ? message.error('Wystąpił błąd')
      : message.success('Zarchiwizowano kontrakt'))
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
            form="PINUpdate"
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
          <form className={styles.form} id="PINUpdate" onSubmit={handleSubmit}>
            <Input name="newPIN" placeholder="Nowy PIN" type="text" />
          </form>
        )}
      </Form>
    </Modal>
  )
}
