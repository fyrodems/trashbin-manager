import { Button, App } from 'antd'
import { useMutation } from '@apollo/client'
import { CloseCircleOutlined } from '@ant-design/icons'
import { type DeleteAddressInfoValue } from '../../userProfileInterfaces'
import { graphql } from '@/gql'

const userAddressInfoDeleteMutation = graphql(`
  mutation UserAddressInfoDelete($props: UserAddressInfoDeleteMutationProps!) {
    user {
      addressInfo {
        delete(props: $props) {
          status {
            message
          }
        }
      }
    }
  }
`)

export const UserDeleteAddressInfoForm: React.FC<DeleteAddressInfoValue> = ({
  userID,
  addressID,
}) => {
  const [remove] = useMutation(userAddressInfoDeleteMutation)
  const { message } = App.useApp()

  const deleteAddressInfo = async () => {
    const { data } = await remove({
      variables: {
        props: {
          usersAddress_userID: userID,
          usersAddress_addressID: addressID,
        },
      },
    })

    const status = data?.user?.addressInfo?.delete?.status.message

    await (status === 'Error'
      ? message.warning('Wniosek o usunięcie adresu oczekuje na akceptację')
      : message.success('Wysłano wniosek o usunięcie adresu'))
  }

  return (
    <Button onClick={async () => deleteAddressInfo()}>
      <CloseCircleOutlined /> Usuń adres
    </Button>
  )
}
