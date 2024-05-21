import { App } from 'antd'
import { useMutation } from '@apollo/client'
import { type DeleteDumpsterValue } from '../cardsInterfaces'
import { graphql } from '@/gql'
import { ConfirmModal } from '@/components/domains/common/ConfirmModal'

const officialDumpstersDeleteMutation = graphql(`
  mutation OfficialDumpstersDelete(
    $props: OfficialDumpstersDeleteMutationProps!
  ) {
    official {
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

export const OfficialDeleteDumpster: React.FC<DeleteDumpsterValue> = ({
  card_ID,
  dumpster_ID,
  refetch,
}) => {
  const [remove] = useMutation(officialDumpstersDeleteMutation)
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

    const status = data?.official?.dumpsters?.delete?.status.message

    if (status === 'Error') {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      message.error('Wystąpił błąd')
    } else {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      message.success('Usunięto dostęp do altany')
    }

    await refetch()
  }

  return (
    <ConfirmModal
      popupTitle={'Czy na pewno chcesz usunąć dostęp do tej altany?'}
      buttonContent={'Usuń dostęp'}
      confirmFunction={async () => deleteDumpster()}
    ></ConfirmModal>
  )
}
