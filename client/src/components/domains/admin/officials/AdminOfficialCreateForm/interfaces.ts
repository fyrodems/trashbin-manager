export interface UserInfo {
  users_ID: number
  users_name: string
  users_identificationNumber: string
  users_login: string
  users_password: string
  users_phoneNumber: string
  users_statusID: number
  users_typeID: number
  confirm: boolean
  usersAddress_street: string
  usersAddress_houseNumber: string
  usersAddress_apartamentNumber: string
  usersAddress_postCode: string
  usersAddress_city: string
  usersAddress_communityID: number
  addresses?: UsersAddressInfoType[]
}

interface UsersAddressInfoType {
  usersAddress_ID: number
  usersAddress_userID: number
  usersAddress_street: string
  usersAddress_houseNumber: string
  usersAddress_apartamentNumber?: string
  usersAddress_postCode: string
  usersAddress_city: string
  usersAddress_typeID: number
  usersAddress_communityID: number
}
