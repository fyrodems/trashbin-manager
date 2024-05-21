import { App } from 'antd'
import { useMutation } from '@apollo/client'
import { ConfirmModal } from '../../../common/ConfirmModal'
import { type DeleteDumpsterValue } from '../userCardsInterfaces'
import { graphql } from '@/gql'

const userDumpstersDeleteMutation = graphql(`
  mutation UserDumpstersDelete($props: UserDumpstersDeleteMutationProps!) {
    user {
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

export const UserDeleteDumpsterForm: React.FC<DeleteDumpsterValue> = ({
  card_ID,
  dumpster_ID,
  cardNumber,
  dumpsterNumber,
  refetch,
}) => {
  const [remove] = useMutation(userDumpstersDeleteMutation)
  const { message } = App.useApp()
  const deleteDumpster = async () => {
    const { data } = await remove({
      variables: {
        props: {
          card_ID,
          dumpster_ID,
        },
      },
    })

    const status = data?.user?.dumpsters?.delete?.status.message

    await refetch()
    await (status === 'Error'
      ? message.error('Wystąpił błąd')
      : message.success('Usunięto dostęp do altany śmietnikowej'))
  }

  return (
    <ConfirmModal
      popupTitle={`Czy na pewno chcesz usunąć dostęp do altany śmietnikowej ${dumpsterNumber} z poziomu karty ${cardNumber}?`}
      buttonContent="Usuń dostęp"
      confirmFunction={deleteDumpster}
    />
  )
}
