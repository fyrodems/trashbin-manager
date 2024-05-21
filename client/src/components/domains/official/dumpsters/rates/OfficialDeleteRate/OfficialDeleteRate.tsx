import { App } from 'antd'
import { useMutation } from '@apollo/client'
import { type OfficialDeleteRateProps } from './interfaces'
import { graphql } from '@/gql'
import { ConfirmModal } from '@/components/domains/common/ConfirmModal'

const officialRatesDeleteMutation = graphql(`
  mutation OfficialRatesDelete($props: OfficialRatesDeleteMutationProps!) {
    official {
      rates {
        delete(props: $props) {
          status {
            message
          }
        }
      }
    }
  }
`)

export const OfficialDeleteRate: React.FC<OfficialDeleteRateProps> = ({
  rate_ID,
  refetch,
}) => {
  const [remove] = useMutation(officialRatesDeleteMutation)
  const { message } = App.useApp()

  const deleteRate = async () => {
    const { data } = await remove({
      variables: {
        props: {
          rate_ID,
        },
      },
    })

    await refetch()

    const status = data?.official?.rates?.delete?.status.message
    await (status === 'Error'
      ? message.error('Wystąpił błąd')
      : message.success('Usunięto stawkę'))
  }

  return (
    <ConfirmModal
      popupTitle={'Czy na pewno chcesz usunąć tę stawkę?'}
      buttonContent={'Usuń stawkę'}
      confirmFunction={async () => deleteRate()}
    />
  )
}
