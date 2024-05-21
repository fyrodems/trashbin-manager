export interface UserAddressApplictionListProps {
  applicationList?: UserAddressApplication[]
}

export interface UserAddressApplication {
  addressApplications_ID: number
  addressApplications_addressID?: number
  addressApplications_apartamentNumber?: string
  addressApplications_typeID: number
  addressApplications_city: string
  addressApplications_communityID: number
  addressApplications_dateAdded: string
  addressApplications_dateReviewed?: string
  addressApplications_houseNumber: string
  addressApplications_postCode: string
  addressApplications_reviewedBy?: number
  addressApplications_statusID: number
  addressApplications_street: string
  addressApplications_addressTypeID: number
  addressApplications_userID: number
}

export interface CancelApplicationValue {
  application_ID: number
  applicationCategory: string
}

export interface UserCardsApplictionListProps {
  applicationList?: UserCardApplication[]
}
export interface UserCardApplication {
  cardsApplications_ID: number
  cardsApplications_typeID: number
  cardsApplications_dateAdded: string
  cardsApplications_dateReviewed?: string
  cardsApplications_statusID: number
  cardsApplications_userID: number
}

export interface UserDumpsterApplictionListProps {
  applicationList?: UserDumpsterApplication[]
}

export interface UserPersonalDataApplicationListProps {
  applicationList?: PersonalDataApplication[]
}

export interface UserApplications {
  cards?: UserCardApplication[]
  address?: UserAddressApplication[]
  dumpsters?: UserDumpsterApplication[]
  personalData?: PersonalDataApplication[]
}

export interface UserInfoType {
  users_ID: number
  users_name: string
  users_identificationNumber: string
  users_login: string
  users_password: string
  users_phoneNumber?: string
  users_statusID: number
  users_typeID: number
  addresses?: UsersAddressInfoType[]
}

export interface UsersAddressInfoType {
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

export interface UserAddressApplication {
  addressApplications_ID: number
  addressApplications_addressID?: number
  addressApplications_apartamentNumber?: string
  addressApplications_typeID: number
  addressApplications_city: string
  addressApplications_communityID: number
  addressApplications_dateAdded: string
  addressApplications_dateReviewed?: string
  addressApplications_houseNumber: string
  addressApplications_postCode: string
  addressApplications_reviewedBy?: number
  addressApplications_statusID: number
  addressApplications_street: string
  addressApplications_addressTypeID: number
  addressApplications_userID: number
}

export interface UserDumpsterApplication {
  dumpstersApplications_ID: number
  dumpstersApplications_cardID: number
  dumpstersApplications_typeID: number
  dumpstersApplications_dateAdded: string
  dumpstersApplications_dateReviewed?: string
  dumpstersApplications_dumpsterID: number
  dumpstersApplications_reviewedBy?: number
  dumpstersApplications_statusID: number
  dumpstersApplications_userID: number
}

export interface PersonalDataApplication {
  personalDataApplications_ID: number
  personalDataApplications_typeID: number
  personalDataApplications_dateAdded: string
  personalDataApplications_dateReviewed?: string
  personalDataApplications_name: string
  personalDataApplications_reviewedBy?: number
  personalDataApplications_statusID: number
  personalDataApplications_userID: number
}
