export interface ApplicationArchiveType {
  __typename?: 'ApplicationArchiveType'
  addressApplications?: ApplicationAddressType[]
  cardsApplications?: ApplicationCardType[]
  dumpstersApplications?: NewDumpsterApplicationType[]
  personalDataApplications?: PersonalDataApplicationsType[]
}

export type ApplicationAddressType = {
  __typename?: 'AddressApplicationArchiveType'
  addressApplications_ID: number
  addressApplications_dateAdded: string
  addressApplications_dateReviewed?: string | null
  addressApplications_typeID: number
  addressApplications_reviewedBy?: number
  addressApplications_statusID: number
  addressApplications_street: string
  addressApplications_houseNumber: string
  addressApplications_apartamentNumber?: string | null
  addressApplications_postCode: string
  addressApplications_city: string
  addressApplications_addressTypeID: number
  addressApplications_addressID?: number
  addressApplications_userName: string
  addressApplications_userLogin: string
  addressApplications_userIdentificationNumber: string
} | null

export type ApplicationCardType = {
  __typename?: 'CardApplicationArchiveType'
  cardsApplications_ID: number
  cardsApplications_dateAdded: string
  cardsApplications_dateReviewed?: string | null
  cardsApplications_typeID: number
  cardsApplications_reviewedBy?: number
  cardsApplications_statusID: number
  cardsApplications_userIdentificationNumber: string
  cardsApplications_userLogin: string
  cardsApplications_userName: string
} | null

export type PersonalDataApplicationsType = {
  __typename?: 'PersonalDataApplicationArchiveType'
  personalDataApplications_ID: number
  personalDataApplications_dateAdded: string
  personalDataApplications_dateReviewed?: string | null
  personalDataApplications_reviewedBy?: number
  personalDataApplications_statusID: number
  personalDataApplications_name: string
  personalDataApplications_userIdentificationNumber: string
  personalDataApplications_userLogin: string
  personalDataApplications_userName: string
} | null

export type NewDumpsterApplicationType = {
  __typename?: 'DumpsterApplicationArchiveType'
  dumpstersApplications_ID: number
  dumpstersApplications_dateAdded: string
  dumpstersApplications_dateReviewed?: string | null
  dumpstersApplications_typeID: number
  dumpstersApplications_reviewedBy?: number
  dumpstersApplications_statusID: number
  dumpstersApplications_cardNumber: string
  dumpstersApplications_dumpsterNumber: string
  dumpstersApplications_userIdentificationNumber: string
  dumpstersApplications_userLogin: string
  dumpstersApplications_userName: string
} | null
