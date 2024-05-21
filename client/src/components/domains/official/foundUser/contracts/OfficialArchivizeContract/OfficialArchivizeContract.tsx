import { App } from 'antd'
import { useMutation } from '@apollo/client'
import { type ArchivizeContractProps } from '../contractsInterfaces'
import { graphql } from '@/gql'
import { ConfirmModal } from '@/components/domains/common/ConfirmModal'

const officialArchivizeContractMutation = graphql(`
  mutation OfficialUserContractsArchivize(
    $props: OfficialUserContractsArchivizeMutationProps!
  ) {
    official {
      userContracts {
        archivize(props: $props) {
          status {
            message
          }
        }
      }
    }
  }
`)

export const OfficialArchivizeContract: React.FC<ArchivizeContractProps> = ({
  usersContract_ID,
  refetch,
}) => {
  const [archivize] = useMutation(officialArchivizeContractMutation)
  const { message } = App.useApp()

  const archivizeContract = async () => {
    const { data } = await archivize({
      variables: {
        props: {
          usersContract_ID,
        },
      },
    })

    const status = data?.official?.userContracts?.archivize?.status.message

    await (status === 'Error'
      ? message.error('Wystąpił błąd')
      : message.success('Zarchiwizowano kontrakt'))

    await refetch()
  }

  return (
    <ConfirmModal
      popupTitle={'Czy na pewno chcesz zarchiwizować tę umowę?'}
      buttonContent={'Archiwizuj'}
      confirmFunction={archivizeContract}
    ></ConfirmModal>
  )
}
