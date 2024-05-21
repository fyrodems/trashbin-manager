export interface UserInfo {
  users_ID: number
  users_name: string
  users_identificationNumber: string
  users_login: string
  users_password: string
  users_phoneNumber?: string
  users_statusID: number
  users_typeID: number
  confirm: boolean
  usersAddress_street: string
  usersAddress_houseNumber: string
  usersAddress_apartamentNumber?: string | null
  usersAddress_postCode: string
  usersAddress_city: string
  usersAddress_communityID: number
  voivodeship: number
  municipality: number
}
