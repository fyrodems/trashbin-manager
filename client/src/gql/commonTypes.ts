import { UserType } from '@/types/UserType'
import { Scalars, StatusEnum } from './graphql'

export type CardsBulkOrderType = {
  __typename?: 'CardsBulkOrderType'
  cardsBulkOrder_ID: number
  cardsBulkOrder_userID: number
  cardsBulkOrder_numOfCards: number
  cardsBulkOrder_statusID: number
  cardsBulkOrder_orderDate: string
}

export type DumpsterInfoType = {
  __typename?: 'DumpsterInfoType'
  dumpster_ID: number
  dumpster_name: string
  dumpster_description?: string
  dumpster_street: string
  dumpster_city: string
  dumpster_postCode: string
  dumpster_communityID: number
  dumpster_houseNumbers: string
  dumpster_hasError: boolean
  contracts?: Array<ContractInfoType>
  bins?: Array<DumpsterBinType>
}
export type AdminDumpstersSearchQueryType = {
  __typename?: 'AdminDumpstersSearchQueryType'
  dumpster_ID: number
  dumpster_name: string
  dumpster_description?: string
  dumpster_street: string
  dumpster_city: string
  dumpster_postCode: string
  dumpster_communityID: number
  dumpster_houseNumbers: string
  dumpster_hasError: boolean
  bins?: Array<DumpsterBinType>
  owners: Array<AdminDumpstersSearchUserInfo>
}

export type CommonDumpstersInfoType = {
  __typename?: 'CommonDumpstersInfoType'
  dumpster_ID: number
  dumpster_name: string
  dumpster_description?: string
  dumpster_street: string
  dumpster_city: string
  dumpster_postCode: string
  dumpster_communityID: number
  dumpster_houseNumbers: string
  dumpster_hasError: boolean
}

export type StatusType = {
  __typename?: 'StatusType'
  description?: Scalars['String']
  message: StatusEnum
}

export type MutationResponseType = {
  __typename?: 'MutationResponseType'
  status: StatusType
}

export type RateInfoType = {
  name: 'RateInfoType'
  rate_ID: number
  rate_typeID: number
  rate_dumpsterContractID?: number
  rate_userContractID?: number
  rate_value: number
  rate_statusID: number
}

export type DumpsterBinType = {
  name: 'DumpsterBinType'
  dumpsterBin_ID: number
  dumpsterBin_dumpsterID: number
  dumpsterBin_isFull: boolean
  dumpsterBin_typeID: number
}

export type GarbageEntryType = {
  __typename?: 'GarbageEntryType'
  garbage_ID: number
  garbage_usersID: number
  garbage_dumpsterID: number
  garbage_weight: number
  garbage_typeID: number
  garbage_date: string
}

export type UserContractsType = {
  __typename?: 'UserContractsType'
  userContracts?: Array<{
    usersContract_ID: number
    usersContract_userID: number
    usersContract_number: string
    usersContract_dateFrom: string
    usersContract_dateTo: string
    usersContract_statusID: number
    usersContract_communityID: number
    rates?: UserContractRatesType
  }>

  housingAssociationContracts?: Array<{
    dumpsterContract_ID: number
    dumpsterContract_number: string
    dumpsterContract_dumpsterID: number
    dumpsterContract_dateFrom: string
    dumpsterContract_dateTo: string
    dumpsterContract_statusID: number
    dumpsterContract_communityID: number
    rates?: UserContractRatesType
  }>
}

export type UserContractType = {
  __typename?: 'UserContractType'
  usersContract_ID: number
  usersContract_userID: number
  usersContract_number: string
  usersContract_dateFrom: string
  usersContract_dateTo: string
  usersContract_statusID: number
  usersContract_communityID: number
  rates?: UserContractRatesType
}

export type UserContractRatesType = {
  __typename?: 'UserContractRatesType'
  paper: number
  plastic: number
  glass: number
  bio: number
  mixed: number
}

export type DumpsterContractType = {
  __typename?: 'DumpsterContractType'
  dumpsterContract_ID: number
  dumpsterContract_number: string
  dumpsterContract_dumpsterID: number
  dumpsterContract_dateFrom: string
  dumpsterContract_dateTo: string
  dumpsterContract_statusID: number
  dumpsterContract_communityID: number
}

export type ContractInfoType = {
  __typename?: 'ContractInfoType'
  dumpsterContract_ID: number
  dumpsterContract_number: string
  dumpsterContract_dumpsterID: number
  dumpsterContract_dateFrom: string
  dumpsterContract_dateTo: string
  dumpsterContract_statusID: number
  dumpsterContract_communityID: number
  rates?: Array<RateInfoType>
}

export type OfficialUserOccupantSearchType = {
  __typename?: 'OfficialUserSearchType'
  users_ID: number
  users_login: string
  users_name: string
  users_identificationNumber: string
  users_phoneNumber?: string
  users_statusID: number
  connection_ID?: number
  addresses?: Array<UsersAddressInfoType>
}

export type NewDumpsterApplicationType = {
  __typename?: 'NewDumpsterApplicationType'
  dumpstersApplications_ID: number
  dumpstersApplications_dateAdded: string
  dumpstersApplications_dateReviewed?: string
  dumpstersApplications_typeID: number
  dumpstersApplications_reviewedBy?: number
  dumpstersApplications_userID: number
  dumpstersApplications_dumpsterID: number
  dumpstersApplications_statusID: number
  dumpstersApplications_cardID: number
}

export type NewUserInfoType = {
  __typename?: 'NewUserInfoType'
  personalDataApplications_ID: number
  personalDataApplications_dateAdded: string
  personalDataApplications_dateReviewed?: string
  personalDataApplications_typeID: number
  personalDataApplications_reviewedBy?: number
  personalDataApplications_userID: number
  personalDataApplications_statusID: number
  personalDataApplications_name: string
}

export type PersonalDataApplicationsType = {
  __typename?: 'PersonalDataApplicationsType'
  personalDataApplications_ID: number
  personalDataApplications_dateAdded: string
  personalDataApplications_dateReviewed?: string
  personalDataApplications_typeID: number
  personalDataApplications_reviewedBy?: number
  personalDataApplications_userID: number
  personalDataApplications_statusID: number
  personalDataApplications_name: string
  personalDataApplications_oldName: string
}

export type CommunityInfoType = {
  community_ID: number
  community_name: string
  community_description: string
  community_municipalityID: number
  community_voivodeshipID: number
}

export type MunicipalityInfoType = {
  municipality_ID: number
  municipality_name: string
  municipality_description: string
  municipality_voivodeshipID: number
}

export type TerritorialDivisionFullDataType = {
  name: 'TerritorialDivisionFullDataType'
  voivodeship: VoivodeshipInfoType
  municipality: MunicipalityInfoType
  community: CommunityInfoType
}

export type VoivodeshipInfoType = {
  voivodeship_ID: number
  voivodeship_name: string
  voivodeship_description?: string
}

export type UsersApplicationsType = {
  __typename?: 'UsersApplicationsType'
  cards?: Array<UsersApplicationCardType>
  address?: Array<NewAddressType>
  dumpsters?: Array<NewDumpsterApplicationType>
  personalData?: Array<PersonalDataApplicationsType>
}

export type UsersApplicationCardType = {
  __typename?: 'UsersApplicationCardType'
  cardsApplications_ID: Scalars['Int']
  cardsApplications_userID: Scalars['Int']
  cardsApplications_statusID: Scalars['Int']
  cardsApplications_typeID: Scalars['Int']
  cardsApplications_dateAdded: Scalars['String']
  cardsApplications_dateReviewed?: Scalars['String']
}

export type OfficialCardsTypeWDumpstersType = {
  usersCards_ID: Scalars['Int']
  usersCards_userID: Scalars['Int']
  usersCards_statusID: Scalars['Int']
  usersCards_number: Scalars['String']
  usersCards_numberPIN: Scalars['String']
  usersCards_rentedToUserID?: Scalars['Int']
  dumpsters: Array<DumpsterInfoType>
}

export type OfficialSelectedUserDumpstersType = {
  bins: {
    dumpsterBin_ID: number
    dumpsterBin_dumpsterID: number
    dumpsterBin_isFull: boolean
    dumpsterBin_typeID: number
  }[]
  contracts: {
    rates: {
      rate_ID: number
      rate_value: number
      rate_dumpsterContractID: number | null
      rate_typeID: number
      rate_statusID: number
      rate_userContractID: number | null
    }[]
    dumpsterContract_ID: number
    dumpsterContract_number: string
    dumpsterContract_dumpsterID: number
    dumpsterContract_statusID: number
    dumpsterContract_communityID: number
    dumpsterContract_dateFrom: string
    dumpsterContract_dateTo: string
  }[]
  dumpster_ID: number
  dumpster_name: string
  dumpster_description: string | null
  dumpster_street: string
  dumpster_city: string
  dumpster_postCode: string
  dumpster_communityID: number
  dumpster_houseNumbers: string
  dumpster_hasError: boolean
  dumpster_statusID: number
}

export type OfficialSelectedUserCardsType = {
  dumpsters: {
    bins: {
      dumpsterBin_ID: number
      dumpsterBin_dumpsterID: number
      dumpsterBin_isFull: boolean
      dumpsterBin_typeID: number
    }[]
    contracts: {
      rates: {
        rate_ID: number
        rate_value: number
        rate_dumpsterContractID: number | null
        rate_typeID: number
        rate_statusID: number
        rate_userContractID: number | null
      }[]
      dumpsterContract_ID: number
      dumpsterContract_number: string
      dumpsterContract_dumpsterID: number
      dumpsterContract_statusID: number
      dumpsterContract_communityID: number
      dumpsterContract_dateFrom: string
      dumpsterContract_dateTo: string
    }[]
    dumpster_ID: number
    dumpster_name: string
    dumpster_description: string | null
    dumpster_street: string
    dumpster_city: string
    dumpster_postCode: string
    dumpster_communityID: number
    dumpster_houseNumbers: string
    dumpster_hasError: boolean
    dumpster_statusID: number
  }[]
  usersCards_ID: number
  usersCards_userID: number
  usersCards_statusID: number
  usersCards_number: string
  usersCards_numberPIN: string | null
  usersCards_rentedToUserID: number | null
  usersCards_typeID: number
  usersCards_dumpstersIDs: string
}

export type UsersCardsType = {
  __typename?: 'UsersCardsType'
  usersCards_ID: Scalars['Int']
  usersCards_userID: Scalars['Int']
  usersCards_statusID: Scalars['Int']
  usersCards_number: Scalars['String']
  usersCards_numberPIN: Scalars['String']
}

export type UsersAddressInfoType = {
  __typename?: 'UsersAddressInfoType'
  usersAddress_ID: Scalars['Int']
  usersAddress_userID: Scalars['Int']
  usersAddress_street: Scalars['String']
  usersAddress_houseNumber: Scalars['String']
  usersAddress_apartamentNumber?: Scalars['String']
  usersAddress_postCode: Scalars['String']
  usersAddress_city: Scalars['String']
  usersAddress_typeID: Scalars['Int']
  usersAddress_communityID: Scalars['Int']
}

export type OfficialSelectedUserAddressInfoType = {
  __typename?: 'UsersAddressInfoType'
  usersAddress_ID: number
  usersAddress_userID: number
  usersAddress_street: string
  usersAddress_houseNumber: string
  usersAddress_apartamentNumber: string | null
  usersAddress_postCode: string
  usersAddress_city: string
  usersAddress_typeID: number
  usersAddress_communityID: number
  usersAddress_statusID: number
}

export type AdminDumpstersSearchUserInfo = {
  users_name: string
  users_identificationNumber: string
  users_phoneNumber?: string
  users_login: string
  users_statusID: number
  users_ID: number
}
export type UserInfoMutation = {
  __typename?: 'UserInfoMutation'
  contacts: MutationResponseType
  password: MutationResponseType
  profile: MutationResponseType
  pin?: MutationResponseType
}

export type OfficialInfoType = {
  __typename?: 'OfficialInfoType'
  users_ID: number
  users_name: string
  users_identificationNumber: string
  users_login: string
  users_phoneNumber?: string
  users_statusID: number
  users_typeID: number
  addresses?: Array<UsersAddressInfoType>
}

export type NewOrderType = {
  __typename?: 'NewOrderType'
  cardsBulkOrder_ID: number
  cardsBulkOrder_userID: number
  cardsBulkOrder_numOfCards: number
  cardsBulkOrder_statusID: number
  cardsBulkOrder_orderDate: string
  user: OfficialInfoType
}

export type OfficialUserSearchType = {
  __typename?: 'OfficialUserSearchType'
  users_ID: number
  users_login: string
  users_name: string
  users_identificationNumber: string
  users_phoneNumber?: string
  users_statusID?: number
  users_PINnumber?: string
}

export type OfficialSelectedUserBasicInfoDataType = {
  __typename?: 'OfficialSelectedUserBasicInfoDataType'
  users_ID: number
  users_login: string
  users_password: string
  users_typeID: number
  users_statusID: number
  users_identificationNumber: string
  users_phoneNumber: string | null
  users_name: string
  users_PINnumber: string | null
  users_recoveryToken: string | null
}

export type UserFullDataType = {
  __typename?: 'UserFullDataType'
  userType?: UserType
  basicInfo?: OfficialUserSearchType
  cards: Array<OfficialCardsTypeWDumpstersType>
  dumpsters?: Array<DumpsterInfoType>
  addressInfo?: Array<UsersAddressInfoType>
  contracts?: UserContractsType
}

export type UserInfoType = {
  __typename?: 'UserInfoType'
  users_ID: number
  users_name: string
  users_identificationNumber: string
  users_login: string
  users_password: string
  users_phoneNumber?: string
  users_statusID: number
  users_typeID: number
  addresses?: Array<UsersAddressInfoType>
}

export type NewAddressType = {
  __typename?: 'NewAddressType'
  addressApplications_ID: number
  addressApplications_dateAdded: string
  addressApplications_dateReviewed: string
  addressApplications_typeID: number
  addressApplications_reviewedBy: number
  addressApplications_userID: number
  addressApplications_statusID: number
  addressApplications_street: string
  addressApplications_houseNumber: string
  addressApplications_apartamentNumber: string
  addressApplications_postCode: string
  addressApplications_city: string
  addressApplications_addressTypeID: number
  addressApplications_communityID: number
  addressApplications_addressID?: number
  user?: Array<UserInfoType>
}

export type DumpsterDataType = {
  __typename?: 'DumpsterDataType'
  dumpster_ID: number
  dumpster_name: string
  dumpster_description?: string
  dumpster_street: string
  dumpster_city: string
  dumpster_postCode: string
  dumpster_communityID: number
  dumpster_houseNumbers: string
  dumpster_hasError: boolean
}

export type NewCardType = {
  __typename?: 'NewCardType'
  cardsApplications_ID: number
  cardsApplications_dateAdded: string
  cardsApplications_dateReviewed?: string
  cardsApplications_typeID: number
  cardsApplications_reviewedBy?: number
  cardsApplications_userID: number
  cardsApplications_statusID: number
  user?: UserInfoType
  dumpsters: Array<DumpsterDataType>
}

export type ApplicationArchiveType = {
  __typename?: 'ApplicationArchiveType'
  addressApplications?: Array<ApplicationAddressType>
  cardsApplications?: Array<ApplicationCardType>
  dumpstersApplications?: Array<NewDumpsterApplicationType>
  personalDataApplications?: Array<PersonalDataApplicationsType>
}

export type ApplicationAddressType = {
  __typename?: 'ApplicationAddressType'
  addressApplications_ID: number
  addressApplications_dateAdded: string
  addressApplications_dateReviewed?: string
  addressApplications_typeID: number
  addressApplications_reviewedBy?: number
  addressApplications_userID: number
  addressApplications_statusID: number
  addressApplications_street: string
  addressApplications_houseNumber: string
  addressApplications_apartamentNumber?: string
  addressApplications_postCode: string
  addressApplications_city: string
  addressApplications_addressTypeID: number
  addressApplications_communityID: number
  addressApplications_addressID?: number
}

export type ApplicationCardType = {
  __typename?: 'ApplicationCardType'
  cardsApplications_ID: number
  cardsApplications_dateAdded: string
  cardsApplications_dateReviewed?: string
  cardsApplications_typeID: number
  cardsApplications_reviewedBy?: number
  cardsApplications_userID: number
  cardsApplications_statusID: number
}

export type CommonUserInfoType = {
  __typename?: 'CommonUserInfoType'
  basicInfo: {
    users_ID: number
    users_login: string
    users_name: string
    users_identificationNumber: string
    users_phoneNumber?: string
    users_statusID: number
  }
}

export type CompanyGarbageType = {
  __typename?: 'CompanyGarbageType'
  dumpsterID: number
  garbage: {
    paper: number
    plastic: number
    glass: number
    bio: number
    mixed: number
  }
}

// uaktualnione typy

export type AdminNewOrderType = {
  __typename?: 'AdminNewOrderType'
  cardsBulkOrder_ID: number
  cardsBulkOrder_userID: number
  cardsBulkOrder_numOfCards: number
  cardsBulkOrder_statusID: number
  cardsBulkOrder_orderDate: string
  user: AdminUserInfoType
}

export type AdminUserInfoType = {
  __typename?: 'AdminUserInfoType'
  users_ID: number
  users_login: string
  users_name: string
  users_identificationNumber: string
  users_phoneNumber?: string
  users_statusID: number
  users_typeID: number
  addresses: AdminUserAddressType
}

export type AdminUserAddressType = {
  __typename?: 'AdminUserAddressType'
  usersAddress_ID: number
  usersAddress_userID: number
  usersAddress_street: string
  usersAddress_houseNumber: string
  usersAddress_apartamentNumber?: string
  usersAddress_postCode: string
  usersAddress_city: string
  usersAddress_typeID: number
  usersAddress_communityID: number
  usersAddress_statusID: number
}

export type AdminDumpstersSearchQueryResult = {
  __typename?: 'AdminDumpstersSearchQueryResult'
  dumpster_ID: number
  dumpster_name: string
  dumpster_description?: string
  dumpster_street: string
  dumpster_city: string
  dumpster_postCode: string
  dumpster_communityID: number
  dumpster_houseNumbers: string
  dumpster_hasError: boolean
  dumpster_statusID: number
  bins: Array<DumpsterBinType>
  owners: Array<AdminDumpstersOwnerType>
}

export type AdminDumpstersOwnerType = {
  __typename?: 'AdminDumpstersOwnerType'
  users_name: string
  users_identificationNumber: string
  users_phoneNumber?: string
  users_login: string
  users_statusID: number
  users_ID: number
}
