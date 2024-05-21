export interface UserInfo {
  users_ID: number
  users_name: string
  users_identificationNumber: string
  users_login: string
  users_password: string
  passwordConfirm: string
  users_phoneNumber: string
  users_statusID: number
  users_typeID: number
  usersAddress_street: string
  usersAddress_houseNumber: string
  usersAddress_apartamentNumber: string
  usersAddress_postCode: string
  usersAddress_city: string
  voivodeship: number
  municipality: number
  usersAddress_communityID: number
}

export interface FindMunicipalitiesProps {
  voivodeship_ID: number
}

export interface FindCommunitiesProps {
  municipality_ID: number
}

export interface SelectOptionsProps {
  value: string
  label: string
}
