export interface FoundUsersListProps {
  loading: boolean
  usersList: FoundUser[]
}

export interface DataType {
  key: React.Key
  ID: number
  name: string
  login: string
  phoneNumber?: string
  statusID: number
}

export interface FoundUser {
  users_ID: number
  users_login: string
  users_name: string
  users_identificationNumber: string
  users_phoneNumber?: string | null
  users_statusID: number
}

export interface SearchUserInfo {
  users_name?: string
  users_identificationNumber?: string
  users_login?: string
  users_phoneNumber?: string
}
