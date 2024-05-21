import { App } from 'antd'
import { useMutation } from '@apollo/client'
import { ConfirmModal } from '../../../common/ConfirmModal'
import { type DeleteCardValue } from '../userCardsInterfaces'
import { graphql } from '@/gql'

const userCardsDeleteMutation = graphql(`
  mutation UserCardsDelete($props: UserCardsDeleteMutationProps!) {
    user {
      cards {
        delete(props: $props) {
          status {
            message
          }
        }
      }
    }
  }
`)

export const UserDeleteCardForm: React.FC<DeleteCardValue> = ({
  usersCards_ID,
  cardNumber,
  refetch,
}) => {
  const [remove] = useMutation(userCardsDeleteMutation)
  const { message } = App.useApp()
  const deleteCard = async () => {
    const { data } = await remove({
      variables: {
        props: {
          usersCards_ID,
        },
      },
    })

    const status = data?.user?.cards?.delete?.status.message
    await refetch()
    await (status === 'Error'
      ? message.error('Wystąpił błąd')
      : message.success('Zablokowano kartę'))
  }

  return (
    <ConfirmModal
      popupTitle={`Czy na pewno chcesz zablokować kartę o numerze ${cardNumber}?`}
      buttonContent="Zablokuj kartę"
      confirmFunction={deleteCard}
      buttonType="primary"
    />
  )
}
