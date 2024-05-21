import { App } from 'antd'
import { useMutation } from '@apollo/client'
import { CloseCircleOutlined } from '@ant-design/icons'
import { type DeleteAddressInfoValue } from '../addressesInterfaces'
import { graphql } from '@/gql'
import { ConfirmModal } from '@/components/domains/common/ConfirmModal'

const officialAddressInfoDeleteMutation = graphql(`
  mutation OfficialAddressInfoDelete(
    $props: OfficialAddressInfoDeleteMutationProps!
  ) {
    official {
      address {
        delete(props: $props) {
          status {
            message
            description
          }
        }
      }
    }
  }
`)

export const OfficialDeleteAddressInfo: React.FC<DeleteAddressInfoValue> = ({
  usersAddress_ID,
  usersAddress_userID,
  refetch,
}) => {
  const [remove] = useMutation(officialAddressInfoDeleteMutation)
  const { message } = App.useApp()
  const deleteAddressInfo = async () => {
    const { data } = await remove({
      variables: {
        props: {
          usersAddress_ID,
          usersAddress_userID,
        },
      },
    })

    const status = data?.official?.address?.delete?.status.message
    const errorMessage =
      (data?.official?.address?.delete?.status.description &&
        data?.official?.address?.delete?.status.description) ??
      'Wystąpił błąd'

    await (status === 'Error'
      ? message.error(errorMessage)
      : message.success('Usunięto adres'))

    await refetch()
  }

  return (
    <ConfirmModal
      popupTitle={'Czy na pewno chcesz usunąć ten adres?'}
      buttonContent={
        <span style={{ color: '#868686' }}>
          <CloseCircleOutlined /> Usuń adres
        </span>
      }
      confirmFunction={deleteAddressInfo}
    ></ConfirmModal>
  )
}
