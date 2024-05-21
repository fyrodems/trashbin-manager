import { useMutation } from '@apollo/client'
import { App } from 'antd'
import { RedoOutlined } from '@ant-design/icons'
import {
  type UserInfoUpdateProps,
  type UserInfoUpdateValues,
} from '../officialFoundUserInterfaces'
import { graphql } from '@/gql'
import { ConfirmModal } from '@/components/domains/common/ConfirmModal'
import { Status } from '@/types/Status'

const editUserInfoMutation = graphql(`
  mutation OfficialUserInfoEdit($props: OfficialUserInfoEditMutationProps!) {
    official {
      info {
        edit(props: $props) {
          status {
            message
          }
        }
      }
    }
  }
`)

export const OfficialActivateUser: React.FC<UserInfoUpdateProps> = ({
  userInfoData,
  refetch,
}) => {
  const [update] = useMutation(editUserInfoMutation)
  const { message } = App.useApp()

  const handleClick = async () => {
    const values: UserInfoUpdateValues = {
      users_ID: userInfoData.basicInfo.users_ID,
      users_login: userInfoData.basicInfo.users_login,
      users_phoneNumber: userInfoData.basicInfo.users_phoneNumber,
      users_name: userInfoData.basicInfo.users_name,
      users_identificationNumber:
        userInfoData.basicInfo.users_identificationNumber,
      users_statusID: 1,
    }

    const { data } = await update({
      variables: {
        props: {
          ...values,
        },
      },
    })

    const status = data?.official?.info?.edit?.status?.message

    if (status === 'Error') {
      await message.error('Wystąpił błąd')
    } else {
      await message.success('Aktywowano konto użytkownika')

      await refetch()
    }
  }

  return (
    <ConfirmModal
      isDisabled={userInfoData.basicInfo.users_statusID === Status.ACTIVE}
      popupTitle={
        'Czy na pewno chcesz ponownie aktywować konto użytkownika ' +
        userInfoData.basicInfo.users_name +
        '?'
      }
      buttonContent={
        <span
          style={{
            display: 'flex',
            margin: '0 auto',
            gap: '6px',
            alignItems: 'center',
          }}
        >
          <RedoOutlined />
          Przywróć konto użytkownika
        </span>
      }
      confirmFunction={handleClick}
    />
  )
}
