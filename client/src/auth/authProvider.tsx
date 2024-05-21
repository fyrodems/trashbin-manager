import {
  type PropsWithChildren,
  createContext,
  useContext,
  useState,
} from 'react'
import { useQuery } from '@apollo/client'
import { graphql } from '@/gql'
import { type UserFullDataType } from '@/gql/commonTypes'

interface AuthInfo {
  loading: boolean
  user: UserFullDataType | null
  loggedIn: boolean
  refetchUserData: (
    variables?: Partial<Record<string, any>> | undefined
  ) => Promise<void>
  idleLoggedOut: boolean
  setIdleLoggedOut: React.Dispatch<React.SetStateAction<boolean>>
}

export const AuthContext = createContext<AuthInfo | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }

  return context
}

const currentUserQuery = graphql(`
  query CurrentUser {
    user {
      info {
        get {
          userType
          basicInfo {
            users_ID
            users_statusID
            users_name
            users_identificationNumber
            users_login
            users_phoneNumber
          }
          addressInfo {
            usersAddress_communityID
            usersAddress_typeID
            usersAddress_ID
            usersAddress_street
            usersAddress_houseNumber
            usersAddress_apartamentNumber
            usersAddress_postCode
            usersAddress_city
          }
          cards {
            usersCards_ID
            usersCards_number
          }
          dumpsters {
            dumpster_ID
            dumpster_name
          }
        }
      }
    }
  }
`)

export const AuthProvider: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  const [idleLoggedOut, setIdleLoggedOut] = useState(false)
  const { data, error, loading, refetch } = useQuery(currentUserQuery)

  const auth: AuthInfo = {
    user: data?.user?.info?.get ?? null,
    loggedIn:
      Boolean(data) &&
      !error &&
      data?.user?.info?.get?.basicInfo?.users_statusID !== 3,
    loading,
    async refetchUserData() {
      try {
        await refetch()
      } catch (error) {
        console.error('Error refetching user data:', error)
      }
    },
    idleLoggedOut,
    setIdleLoggedOut,
  }

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}
