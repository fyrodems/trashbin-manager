export interface OfficialAddressesApplicationsArchivesProps {
  applicationList: OfficialAddressesArchiveApplication[] | undefined
}

export type OfficialAddressesArchiveApplication = {
  addressApplications_ID: number
  addressApplications_typeID: number
  addressApplications_addressTypeID: number
  addressApplications_userName: string
  addressApplications_statusID: number
  addressApplications_dateAdded: string
  addressApplications_userLogin: string
  addressApplications_userIdentificationNumber: string
  addressApplications_street: string
  addressApplications_houseNumber: string
  addressApplications_apartamentNumber?: string | null
  addressApplications_postCode: string
  addressApplications_city: string
  addressApplications_dateReviewed?: string | null
} | null

export interface OfficialCardsApplicationsArchivesProps {
  applicationList: OfficialCardArchiveApplication[] | undefined
}

export type OfficialCardArchiveApplication = {
  cardsApplications_ID: number
  cardsApplications_typeID: number
  cardsApplications_dateAdded: string
  cardsApplications_dateReviewed?: string | null
  cardsApplications_statusID: number
  cardsApplications_userIdentificationNumber: string
  cardsApplications_userLogin: string
  cardsApplications_userName: string
} | null

export interface OfficialDumpstersApplicationsArchivesProps {
  applicationList: OfficialDumpsterArchiveApplication[] | undefined
}

export type OfficialDumpsterArchiveApplication = {
  dumpstersApplications_ID: number
  dumpstersApplications_cardNumber: string
  dumpstersApplications_typeID: number
  dumpstersApplications_dateAdded: string
  dumpstersApplications_dateReviewed?: string | null
  dumpstersApplications_dumpsterNumber: string
  dumpstersApplications_statusID: number
  dumpstersApplications_userIdentificationNumber: string
  dumpstersApplications_userLogin: string
  dumpstersApplications_userName: string
} | null

export interface OfficialPersonalDataApplicationsArchivesProps {
  applicationList: OfficialPersonalDataArchiveApplication[] | undefined
}

export type OfficialPersonalDataArchiveApplication = {
  personalDataApplications_ID: number
  personalDataApplications_dateAdded: string
  personalDataApplications_dateReviewed?: string | null
  personalDataApplications_name: string
  personalDataApplications_statusID: number
  personalDataApplications_userIdentificationNumber: string
  personalDataApplications_userLogin: string
  personalDataApplications_userName: string
} | null
