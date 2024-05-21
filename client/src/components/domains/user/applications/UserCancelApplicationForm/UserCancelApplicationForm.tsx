import { Button, App } from 'antd'
import { useMutation } from '@apollo/client'
import { type CancelApplicationValue } from '../applicationsInterfaces'
import { graphql } from '@/gql'

const userApplicationCancelMutation = graphql(`
  mutation UserApplicationCancel($props: UserApplicationCancelMutationProps!) {
    user {
      applications {
        cancel(props: $props) {
          status {
            message
          }
        }
      }
    }
  }
`)

export const UserCancelApplicationForm: React.FC<CancelApplicationValue> = ({
  application_ID,
  applicationCategory,
}) => {
  const [remove] = useMutation(userApplicationCancelMutation)
  const { message } = App.useApp()

  const cancelApplication = async () => {
    const { data } = await remove({
      variables: {
        props: {
          application_ID,
          applicationCategory,
        },
      },
    })

    const status = data?.user?.applications?.cancel?.status.message

    await (status === 'Error'
      ? message.error('Wystąpił błąd')
      : message.success('Anulowano wniosek'))
  }

  return (
    <div
      style={{ padding: '15px', display: 'flex', justifyContent: 'flex-end' }}
    >
      <Button onClick={async () => cancelApplication()}>Anuluj wniosek</Button>
    </div>
  )
}
