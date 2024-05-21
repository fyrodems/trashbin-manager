import { App, Button } from 'antd'
import { useMutation } from '@apollo/client'
import { type DeleteDumpsterValue } from '../adminDumpstersInterfaces'
import { graphql } from '@/gql'

const adminDumpsterDeleteMutation = graphql(`
  mutation AdminDumpstersDelete($props: AdminDumpstersDeleteMutationProps!) {
    admin {
      dumpsters {
        delete(props: $props) {
          status {
            message
          }
        }
      }
    }
  }
`)

export const AdminDumpsterDeleteForm: React.FC<DeleteDumpsterValue> = ({
  dumpster_ID,
}) => {
  const [remove] = useMutation(adminDumpsterDeleteMutation)
  const { message } = App.useApp()
  const deleteOfficial = async () => {
    const { data } = await remove({
      variables: {
        props: {
          dumpster_ID,
        },
      },
    })

    const status = data?.admin?.dumpsters?.delete?.status.message

    if (status === 'Error') {
      await message.error('Wystąpił błąd')
      return
    }

    await message.success('Usunięto altanę')
  }

  return (
    <Button onClick={async () => deleteOfficial()}>Dezaktywuj altanę</Button>
  )
}
