import { App } from 'antd'
import { useMutation } from '@apollo/client'
import { DeleteFilled } from '@ant-design/icons'
import { type DeleteOfficialValue } from '../superOfficialInterfaces'
import { graphql } from '@/gql'
import { ConfirmModal } from '@/components/domains/common/ConfirmModal'

const superOfficialOfficialDeleteMutation = graphql(`
  mutation SuperOfficialOfficialDelete(
    $props: SuperOfficialOfficialDeleteMutationProps!
  ) {
    official {
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

export const SuperOfficialDeleteOfficialForm: React.FC<DeleteOfficialValue> = ({
  users_ID,
  users_name,
  refetch,
}) => {
  const [remove] = useMutation(superOfficialOfficialDeleteMutation)
  const { message } = App.useApp()
  const deleteOfficial = async () => {
    const { data } = await remove({
      variables: {
        props: {
          users_ID,
        },
      },
    })

    const status = data?.official?.officials?.delete?.status.message

    await (status === 'Error'
      ? message.error('Wystąpił błąd')
      : message.success('Usunięto urzędnika'))

    await refetch()
  }

  return (
    <ConfirmModal
      popupTitle={`Czy na pewno chcesz usunąć urzędnika ${users_name}?`}
      buttonContent={<DeleteFilled />}
      confirmFunction={async () => deleteOfficial()}
      buttonType="text"
    />
  )
}
