import { type ReactElement } from 'react'
import { createBrowserRouter, Navigate } from 'react-router-dom'
import { AppLayout } from '../layouts/AppLayout'
import { OfficialFoundUserView } from '../components/domains/official/view/OfficialFoundUserView/OfficialFoundUserView'
import { Root } from './Root'
import { AppRoute } from './AppRoute'
import { AuthLayout } from '@/layouts/AuthLayout'
import { useAuth } from '@/auth/authProvider'
import { LoginView } from '@/components/domains/guest/LoginView'
import { RegisterView } from '@/components/domains/guest/RegisterView'
import { UserProfileView } from '@/components/domains/user/views/UserProfileView/UserProfileView'
import { UserCardsView } from '@/components/domains/user/views/UserCardsView/UserCardsView'
import { UserApplicationsView } from '@/components/domains/user/views/UserApplicationsView/UserApplicationsView'
import { UserStatisticsView } from '@/components/domains/user/views/UserStatisticsView/UserStatisticsView'
import { OfficialSearchUserView } from '@/components/domains/official/view/OfficialSearchUserView/OfficialSearchUserView'
import { OfficialCreateNewUserView } from '@/components/domains/official/view/OfficialCreateNewUserView/OfficialCreateNewUserView'
import { OfficialDumpstersView } from '@/components/domains/official/view/OfficialDumpstersView/OfficialDumpstersView'
import { OfficialArchivedApplicationsView } from '@/components/domains/official/view/OfficialArchivedApplicationsView/OfficialArchivedApplicationsView'
import { SuperOfficialCreateOfficialView } from '@/components/domains/official/view/SuperOfficialCreateOfficialView/SuperOfficialCreateOfficialView'
import { CompanyDumpstersView } from '@/components/domains/company/views/CompanyDumpstersView/CompanyDumpstersView'
import { CompanyProfileView } from '@/components/domains/company/views/CompanyProfileView/CompanyProfileView'
import { CompanyCardsOrdersPanel } from '@/components/domains/company/cards/CompanyCardsOrdersPanel/CompanyCardsOrdersPanel'
import { PasswordReminder } from '@/components/domains/guest/PasswordReminder'
import { CompanyOccupantsView } from '@/components/domains/company/views/CompanyOccupantsView/CompanyOccupantsView'

interface CustomRouteProps {
  element: ReactElement
  allowedUserTypes: number[]
  fallback?: string
}

const CustomRoute: React.FC<CustomRouteProps> = ({
  element,
  allowedUserTypes,
  fallback = '/login',
}: CustomRouteProps) => {
  const { user } = useAuth()

  const isAllowed = user && allowedUserTypes.includes(user.userType)
  return isAllowed ? element : <Navigate to={fallback} replace />
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
  },
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: <AuthLayout access="loggedOut" fallback="/home" />,
        children: [
          {
            path: 'login',
            element: <LoginView />,
          },
          {
            path: 'register',
            element: <RegisterView />,
          },
          {
            path: 'forgot',
            element: <PasswordReminder />,
          },
        ],
      },
      {
        path: '/',
        element: <AuthLayout access="loggedIn" /* fallback="/login" */ />,
        children: [
          {
            path: 'home',
            element: <AppRoute />,
          },
          /* user */
          {
            path: 'profile',
            element: (
              <CustomRoute
                element={<UserProfileView />}
                allowedUserTypes={[4]}
              />
            ),
          },
          {
            path: 'cards',
            element: (
              <CustomRoute
                element={<UserCardsView />}
                allowedUserTypes={[4, 10, 9]}
              />
            ),
          },
          {
            path: 'applications',
            element: (
              <CustomRoute
                element={<UserApplicationsView />}
                allowedUserTypes={[4]}
              />
            ),
          },
          {
            path: 'statistics',
            element: (
              <CustomRoute
                element={<UserStatisticsView />}
                allowedUserTypes={[4]}
              />
            ),
          },

          /* official */
          {
            path: 'users',
            element: (
              <CustomRoute
                element={<OfficialSearchUserView />}
                allowedUserTypes={[5, 6]}
              />
            ),
          },
          {
            path: 'user/:id',
            element: (
              <CustomRoute
                element={<OfficialFoundUserView />}
                allowedUserTypes={[5, 6]}
              />
            ),
          },
          {
            path: 'create-user',
            element: (
              <CustomRoute
                element={<OfficialCreateNewUserView />}
                allowedUserTypes={[5, 6]}
              />
            ),
          },
          {
            path: 'officials',
            element: (
              <CustomRoute
                element={<SuperOfficialCreateOfficialView />}
                allowedUserTypes={[6]}
              />
            ),
          },
          {
            path: 'dumpster',
            element: (
              <CustomRoute
                element={<OfficialDumpstersView />}
                allowedUserTypes={[5, 6]}
              />
            ),
          },
          {
            path: 'archived-applications',
            element: (
              <CustomRoute
                element={<OfficialArchivedApplicationsView />}
                allowedUserTypes={[5, 6]}
              />
            ),
          },
          /* company aka. spółdzielnia / firma */
          {
            path: 'company-profile',
            element: (
              <CustomRoute
                element={<CompanyProfileView />}
                allowedUserTypes={[9, 10]}
              />
            ),
          },
          {
            path: 'company-dumpsters',
            element: (
              <CustomRoute
                element={<CompanyDumpstersView />}
                allowedUserTypes={[9, 10]}
              />
            ),
          },
          {
            path: 'card-orders',
            element: (
              <CustomRoute
                element={<CompanyCardsOrdersPanel />}
                allowedUserTypes={[9, 10]}
              />
            ),
          },
          /* tylko spółdzielnia */
          {
            path: 'company-occupants',
            element: (
              <CustomRoute
                element={<CompanyOccupantsView />}
                allowedUserTypes={[10]}
              />
            ),
          },
        ],
      },
    ],
  },
])
