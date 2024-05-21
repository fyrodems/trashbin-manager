import { useMutation } from '@apollo/client'
import { App } from 'antd'
import { type CompanyAddressDeleteProps } from '../CompanyAddressesPanel/interfaces'
import { graphql } from '@/gql'
import { ConfirmModal } from '@/components/domains/common/ConfirmModal'

const deleteAddressMutation = graphql(`
  mutation CompanyAddressDelete($props: CompanyAddressDeleteMutationProps!) {
    company {
      addresses {
        delete(props: $props) {
          status {
            message
          }
        }
      }
    }
  }
`)

export const CompanyAddressDelete: React.FC<CompanyAddressDeleteProps> = ({
  address,
  refetch,
}) => {
  const { message } = App.useApp()
  const [deleteAddress] = useMutation<{
    company: { addresses: { delete: { status: { message: string } } } }
  }>(deleteAddressMutation)

  const handleDeleteAddress = async () => {
    const { data } = await deleteAddress({
      variables: {
        props: {
          usersAddress_ID: address.usersAddress_ID,
          usersAddress_userID: address.usersAddress_userID,
        },
      },
    })

    refetch()

    const status = data?.company?.addresses?.delete?.status.message
    await (status === 'Error'
      ? message.error('Wystąpił błąd')
      : message.success('Usunięto adres'))
  }

  return (
    <ConfirmModal
      popupTitle={'Czy na pewno chcesz usunąć ten adres?'}
      buttonContent={'Usuń adres'}
      confirmFunction={handleDeleteAddress}
    />
  )
}
