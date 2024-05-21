import { useAuth } from '@/auth/authProvider'
import { UserView } from '@/components/domains/user/views/UserMainView'
import { OfficialView } from '@/components/domains/official/view/OfficialMainView'
import { AdminView } from '@/components/domains/admin/AdminView'
import { CompanyView } from '@/components/domains/company/views/CompanyMainView/CompanyMainView'
import { UserType } from '@/types/UserType'
import { Status } from '@/types/Status'

export const AppRoute: React.FC = () => {
  const { user } = useAuth()
  if (!user) {
    return null
  }

  // if user is normal users
  if (
    user.userType === UserType.USER &&
    user.basicInfo.users_statusID === Status.ACTIVE
  ) {
    return <UserView />
  }

  // if user is official
  if (
    user.userType === UserType.OFFICIAL ||
    user.userType === UserType.SUPER_OFFICIAL
  ) {
    return <OfficialView />
  }

  // if user is company
  if (
    user.userType === UserType.COMPANY ||
    user.userType === UserType.HOUSING_ASSOCIATION
  ) {
    return <CompanyView />
  }

  // if user is admin
  if (user.userType === UserType.ADMIN) {
    return <AdminView />
  }

  return <div />
}
