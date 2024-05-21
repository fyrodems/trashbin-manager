import { App } from 'antd'
import { useMutation } from '@apollo/client'
import { DeleteFilled } from '@ant-design/icons'
import { ConfirmModal } from '../../../common/ConfirmModal'
import { type DeleteOfficialValue } from './interfaces'
import { graphql } from '@/gql'

const adminOfficialDeleteMutation = graphql(`
  mutation AdminOfficialsDelete($props: AdminOfficialsDeleteMutationProps!) {
    admin {
      officials {
        delete(props: $props) {
          status {
            message
          }
        }
      }
    }
  }
`)

export const AdminOfficialDeleteForm: React.FC<DeleteOfficialValue> = ({
  user_ID,
}) => {
  const [remove] = useMutation(adminOfficialDeleteMutation)
  const { message } = App.useApp()
  const deleteOfficial = async () => {
    const { data } = await remove({
      variables: {
        props: {
          user_ID,
        },
      },
    })

    const status = data?.admin?.officials?.delete?.status.message

    if (status === 'Error') {
      await message.error('Wystąpił błąd')
      return
    }

    await message.success('Usunięto urzędnika')
  }

  return (
    <ConfirmModal
      popupTitle={`Czy na pewno chcesz usunąć podmiot?`}
      buttonContent={<DeleteFilled />}
      confirmFunction={async () => deleteOfficial()}
      buttonType="text"
    />
  )
}
