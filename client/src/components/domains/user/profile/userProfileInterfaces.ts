import { type UserFullDataType } from '@/gql/commonTypes'

export interface PasswordValues {
  oldPassword: string
  newPassword: string
}

export interface PasswordUpdateProps {
  open: boolean
  setOpen: (state: boolean) => void
}

export interface ContactValues {
  users_login: string
  users_phoneNumber?: string
}

export interface ContactUpdateProps {
  open: boolean
  setOpen: (state: boolean) => void
}

export interface BaseDataValues {
  users_name: string
  user_ID: number
  users_login: string
  users_phoneNumber: string
}

export interface BaseDataUpdateProps {
  open: boolean
  setOpen: (state: boolean) => void
}

// addresses interfaces below

export interface UserCreateAddressFormProps {
  userID: number
  addressInfo: AddressInfo[]
  isOpen: boolean
}

export interface SelectOptionsProps {
  value: string
  label: string
}

export interface UserIDProps {
  userID: number
}

export interface AddressDataProps {
  addressData: AddressInfo
}

export interface FindMunicipalitiesProps {
  voivodeship_ID: number
}

export interface FindCommunitiesProps {
  municipality_ID: number
}

export interface AddressInfo {
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

export interface FormValidationAddressInfo {
  usersAddress_street: string
  usersAddress_houseNumber: string
  usersAddress_postCode: string
  usersAddress_city: string
  usersAddress_typeID: number
  usersAddress_communityID: number
  voivodeship?: number
  municipality?: number
}

export interface SelectOptionsProps {
  value: string
  label: string
}

export interface UserIDProps {
  userID: number
}

export interface AddressDataProps {
  addressData: AddressInfo
}

export interface FindMunicipalitiesProps {
  voivodeship_ID: number
}

export interface FindCommunitiesProps {
  municipality_ID: number
}

export interface UserCreateCorrespondecneAddressFormProps {
  userID: number
  setIsCorrespondenceAddressOpen: (open: boolean) => void
  isCorrespondenceAddressOpen: boolean
  adresZamieszkania: AddressInfo
  adresZameldowania: AddressInfo
}

export interface DeleteAddressInfoValue {
  userID: number
  addressID: number
}

export interface SelectOptionsProps {
  value: string
  label: string
}

export interface UserIDProps {
  userID: number
}

export interface AddressDataProps {
  addressData: AddressInfo
}

export interface FindMunicipalitiesProps {
  voivodeship_ID: number
}

export interface FindCommunitiesProps {
  municipality_ID: number
}

export interface FindFullDataProps {
  usersAddress_communityID: number
}

export interface UserPanelAddressProps {
  usersData: UserFullDataType
}

// create correspondence address interfaces

export interface FormInitialValues {
  communityName?: string
  municipality?: number
  municipalityName?: string
  usersAddress_ID?: number
  usersAddress_apartamentNumber?: string
  usersAddress_city?: string
  usersAddress_communityID?: number
  usersAddress_houseNumber?: string
  usersAddress_postCode?: string
  usersAddress_street?: string
  usersAddress_typeID?: number
  usersAddress_userID?: number
  voivodeship?: number
  voivodeshipName?: string
  community?: number
}
