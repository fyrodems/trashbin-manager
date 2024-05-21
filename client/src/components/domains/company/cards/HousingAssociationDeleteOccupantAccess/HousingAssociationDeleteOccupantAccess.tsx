import { useMutation } from '@apollo/client'
import { App } from 'antd'
import { type HousingAssociationOperationsProps } from '../interfaces'
import { graphql } from '@/gql'
import { ConfirmModal } from '@/components/domains/common/ConfirmModal'

const deleteUserFromCardMutation = graphql(`
  mutation CompanyCardsRentDelete(
    $props: CompanyCardsRentDeleteMutationProps!
  ) {
    company {
      cardsRent {
        delete(props: $props) {
          status {
            message
          }
        }
      }
    }
  }
`)

export const HousingAssociationDeleteOccupantAccess: React.FC<
  HousingAssociationOperationsProps
> = ({ cardID, userID, refetchUserData }) => {
  const [deleteUser] = useMutation(deleteUserFromCardMutation)
  const { message } = App.useApp()

  const deleteUserFromCard = async () => {
    if (!cardID || !userID) {
      return message.error('Dostęp nie może zostać usunięty')
    }

    const { data } = await deleteUser({
      variables: {
        props: {
          cardID,
          userID,
        },
      },
    })

    await refetchUserData()

    const status = data?.company?.cardsRent?.delete?.status.message
    await (status === 'Error'
      ? message.error('Dostęp nie może zostać usunięty')
      : message.success('Usunięto dostęp użytkownikowi'))
  }

  if (userID === null) {
    return null
  }

  return (
    <ConfirmModal
      popupTitle="Czy na pewno chcesz usunąć dostęp użytkownikowi?"
      buttonContent="Usuń dostęp użytkownikowi"
      confirmFunction={async () => deleteUserFromCard()}
    />
  )
}
