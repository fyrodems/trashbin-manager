import { App, Button } from 'antd'
import { useMutation } from '@apollo/client'
import { DeleteOutlined } from '@ant-design/icons'
import { type DeleteOwnerValue } from '../adminDumpstersInterfaces'
import styles from './AdminOwnerDeleteForm.module.scss'
import { graphql } from '@/gql'

const adminOwnerDeleteMutation = graphql(`
  mutation AdminOwnersDelete($props: AdminOwnersDeleteMutationProps!) {
    admin {
      owners {
        delete(props: $props) {
          status {
            message
          }
        }
      }
    }
  }
`)

export const AdminOwnerDeleteForm: React.FC<DeleteOwnerValue> = ({
  dumpster_ID,
  user_ID,
}) => {
  const [remove] = useMutation(adminOwnerDeleteMutation)
  const { message } = App.useApp()
  const deleteOwner = async () => {
    if (user_ID) {
      const { data } = await remove({
        variables: {
          props: {
            dumpster_ID,
            user_ID,
          },
        },
      })

      const status = data?.admin?.owners?.delete?.status.message

      if (status === 'Error') {
        await message.error('Wystąpił błąd')
        return
      }

      await message.success('Usunięto właściela')
    }
  }

  return (
    <Button
      disabled={user_ID === undefined}
      onClick={async () => deleteOwner()}
      className={styles.iconButton}
    >
      <DeleteOutlined />
    </Button>
  )
}
