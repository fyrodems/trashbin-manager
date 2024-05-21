import { App } from 'antd'
import { useMutation } from '@apollo/client'
import { StopTwoTone } from '@ant-design/icons'
import { type DeleteUserValue } from '../officialFoundUserInterfaces'
import { graphql } from '@/gql'
import { ConfirmModal } from '@/components/domains/common/ConfirmModal'
import { Status } from '@/types/Status'

const officialUserDeleteMutation = graphql(`
  mutation OfficialUsersDelete($props: OfficialDeleteUserMutationProps!) {
    official {
      users {
        delete(props: $props) {
          status {
            message
          }
        }
      }
    }
  }
`)

export const OfficialDeleteUser: React.FC<DeleteUserValue> = ({
  user_ID,
  users_name,
  users_statusID,
  refetch,
}) => {
  const [remove] = useMutation(officialUserDeleteMutation)
  const { message } = App.useApp()
  const deleteUser = async () => {
    const { data } = await remove({
      variables: {
        props: {
          user_ID,
        },
      },
    })

    const status = data?.official?.users?.delete?.status.message

    if (status === 'Error') {
      await message.error('Wystąpił błąd')
    } else {
      await message.success('Dezaktywowano konto użytkownika')

      await refetch()
    }
  }

  return (
    <>
      <ConfirmModal
        isDisabled={users_statusID === Status.BLOCKED}
        popupTitle={
          'Czy na pewno chcesz usunąć konto użytkownika ' + users_name + '?'
        }
        buttonType="default"
        isDanger
        buttonContent={
          <span
            style={{
              display: 'flex',
              margin: '0 auto',
              gap: '6px',
              alignItems: 'center',
            }}
          >
            <StopTwoTone
              twoToneColor={
                users_statusID === Status.BLOCKED ? 'gray' : '#c60202'
              }
            />
            Dezaktywuj konto
          </span>
        }
        confirmFunction={async () => deleteUser()}
      />
    </>
  )
}
