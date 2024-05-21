export interface AdminOfficialInfoType {
  users_ID: number
  users_name: string
  users_identificationNumber: string
  users_login: string
  users_phoneNumber?: string | null
  users_statusID: number
  users_typeID: number
  addresses?: UsersAddressInfoType[]
}

interface UsersAddressInfoType {
  usersAddress_street: string
  usersAddress_houseNumber: string
  usersAddress_city: string
}

export interface AdminOfficialsListDataType {
  key: React.Key
  users_name: string
  users_identificationNumber: string
  users_login: string
  users_phoneNumber: string
  users_ID: number
  users_statusID: number
  users_typeID: number
}
