/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type AddressApplicationArchiveType = {
  __typename?: 'AddressApplicationArchiveType';
  addressApplications_ID: Scalars['Int'];
  addressApplications_addressID?: Maybe<Scalars['Int']>;
  addressApplications_addressTypeID: Scalars['Int'];
  addressApplications_apartamentNumber?: Maybe<Scalars['String']>;
  addressApplications_city: Scalars['String'];
  addressApplications_communityID: Scalars['Int'];
  addressApplications_dateAdded: Scalars['String'];
  addressApplications_dateReviewed?: Maybe<Scalars['String']>;
  addressApplications_houseNumber: Scalars['String'];
  addressApplications_postCode: Scalars['String'];
  addressApplications_reviewedBy?: Maybe<Scalars['Int']>;
  addressApplications_statusID: Scalars['Int'];
  addressApplications_street: Scalars['String'];
  addressApplications_typeID: Scalars['Int'];
  addressApplications_userID: Scalars['Int'];
  addressApplications_userIdentificationNumber: Scalars['String'];
  addressApplications_userLogin: Scalars['String'];
  addressApplications_userName: Scalars['String'];
};

export type AdminCardsOrdersMutation = {
  __typename?: 'AdminCardsOrdersMutation';
  verifyAdd?: Maybe<MutationResponseType>;
};


export type AdminCardsOrdersMutationVerifyAddArgs = {
  props: AdminCardsOrdersVerifyAddMutationProps;
};

export type AdminCardsOrdersQuery = {
  __typename?: 'AdminCardsOrdersQuery';
  get?: Maybe<Array<AdminNewOrderType>>;
};

export type AdminCardsOrdersVerifyAddMutationProps = {
  cardsBulkOrder_ID: Scalars['Int'];
  cardsNumbers: Array<Scalars['String']>;
  isVerified: Scalars['Boolean'];
};

export type AdminChangeOfficialAndSuperOfficialChangePasswordProps = {
  user_ID: Scalars['Int'];
  user_confirmNewPassword: Scalars['String'];
  user_newPassword: Scalars['String'];
};

export type AdminDumpstersAddMutationProps = {
  bio_binsNumber: Scalars['Int'];
  dumpster_city: Scalars['String'];
  dumpster_communityID: Scalars['Int'];
  dumpster_description?: InputMaybe<Scalars['String']>;
  dumpster_houseNumbers: Scalars['String'];
  dumpster_name: Scalars['String'];
  dumpster_postCode: Scalars['String'];
  dumpster_street: Scalars['String'];
  glass_binsNumber: Scalars['Int'];
  mixed_binsNumber: Scalars['Int'];
  paper_binsNumber: Scalars['Int'];
  plastic_binsNumber: Scalars['Int'];
};

export type AdminDumpstersBinEditMutationProps = {
  dumpsterBin_ID: Scalars['Int'];
  dumpsterBin_typeID: Scalars['Int'];
};

export type AdminDumpstersDeleteMutationProps = {
  dumpster_ID: Scalars['Int'];
};

export type AdminDumpstersEditMutationProps = {
  dumpster_ID: Scalars['Int'];
  dumpster_city: Scalars['String'];
  dumpster_communityID: Scalars['Int'];
  dumpster_description?: InputMaybe<Scalars['String']>;
  dumpster_hasError: Scalars['Boolean'];
  dumpster_houseNumbers: Scalars['String'];
  dumpster_name: Scalars['String'];
  dumpster_postCode: Scalars['String'];
  dumpster_street: Scalars['String'];
};

export type AdminDumpstersMutation = {
  __typename?: 'AdminDumpstersMutation';
  add?: Maybe<MutationResponseType>;
  bin?: Maybe<MutationResponseType>;
  delete?: Maybe<MutationResponseType>;
  edit?: Maybe<MutationResponseType>;
};


export type AdminDumpstersMutationAddArgs = {
  props: AdminDumpstersAddMutationProps;
};


export type AdminDumpstersMutationBinArgs = {
  props: AdminDumpstersBinEditMutationProps;
};


export type AdminDumpstersMutationDeleteArgs = {
  props: AdminDumpstersDeleteMutationProps;
};


export type AdminDumpstersMutationEditArgs = {
  props: AdminDumpstersEditMutationProps;
};

export type AdminDumpstersOwnerType = {
  __typename?: 'AdminDumpstersOwnerType';
  users_ID: Scalars['Int'];
  users_identificationNumber: Scalars['String'];
  users_login: Scalars['String'];
  users_name: Scalars['String'];
  users_phoneNumber?: Maybe<Scalars['String']>;
  users_statusID: Scalars['Int'];
};

export type AdminDumpstersQuery = {
  __typename?: 'AdminDumpstersQuery';
  get?: Maybe<Array<AdminDumpstersSearchQueryResult>>;
};

export type AdminDumpstersSearchQueryResult = {
  __typename?: 'AdminDumpstersSearchQueryResult';
  bins: Array<Maybe<DumpsterBinType>>;
  dumpster_ID: Scalars['Int'];
  dumpster_city: Scalars['String'];
  dumpster_communityID: Scalars['Int'];
  dumpster_description?: Maybe<Scalars['String']>;
  dumpster_hasError: Scalars['Boolean'];
  dumpster_houseNumbers: Scalars['String'];
  dumpster_name: Scalars['String'];
  dumpster_postCode: Scalars['String'];
  dumpster_statusID: Scalars['Int'];
  dumpster_street: Scalars['String'];
  owners: Array<Maybe<AdminDumpstersOwnerType>>;
};

export type AdminMutation = {
  __typename?: 'AdminMutation';
  cardsOrders?: Maybe<AdminCardsOrdersMutation>;
  dumpsters?: Maybe<AdminDumpstersMutation>;
  officials?: Maybe<AdminOfficialsMutation>;
  owners?: Maybe<AdminOwnersMutation>;
};

export type AdminNewOfficialAddMutationProps = {
  usersAddress_apartamentNumber?: InputMaybe<Scalars['String']>;
  usersAddress_city: Scalars['String'];
  usersAddress_communityID: Scalars['Int'];
  usersAddress_houseNumber: Scalars['String'];
  usersAddress_postCode: Scalars['String'];
  usersAddress_street: Scalars['String'];
  users_identificationNumber: Scalars['String'];
  users_login: Scalars['String'];
  users_name: Scalars['String'];
  users_password: Scalars['String'];
  users_phoneNumber: Scalars['String'];
  users_typeID?: InputMaybe<Scalars['Int']>;
};

export type AdminNewOrderType = {
  __typename?: 'AdminNewOrderType';
  cardsBulkOrder_ID: Scalars['Int'];
  cardsBulkOrder_numOfCards: Scalars['Int'];
  cardsBulkOrder_orderDate: Scalars['String'];
  cardsBulkOrder_statusID: Scalars['Int'];
  cardsBulkOrder_userID: Scalars['Int'];
  user: AdminUserInfoType;
};

export type AdminOfficialsDeleteMutationProps = {
  user_ID: Scalars['Int'];
};

export type AdminOfficialsMutation = {
  __typename?: 'AdminOfficialsMutation';
  add?: Maybe<MutationResponseType>;
  changePassword?: Maybe<MutationResponseType>;
  delete?: Maybe<MutationResponseType>;
};


export type AdminOfficialsMutationAddArgs = {
  props: AdminNewOfficialAddMutationProps;
};


export type AdminOfficialsMutationChangePasswordArgs = {
  props: AdminChangeOfficialAndSuperOfficialChangePasswordProps;
};


export type AdminOfficialsMutationDeleteArgs = {
  props: AdminOfficialsDeleteMutationProps;
};

export type AdminOfficialsQuery = {
  __typename?: 'AdminOfficialsQuery';
  get?: Maybe<Array<AdminUserInfoType>>;
};

export type AdminOwnersAddMutationProps = {
  dumpster_ID: Scalars['Int'];
  user_ID: Scalars['Int'];
};

export type AdminOwnersDeleteMutationProps = {
  dumpster_ID: Scalars['Int'];
  user_ID: Scalars['Int'];
};

export type AdminOwnersMutation = {
  __typename?: 'AdminOwnersMutation';
  add?: Maybe<MutationResponseType>;
  delete?: Maybe<MutationResponseType>;
};


export type AdminOwnersMutationAddArgs = {
  props: AdminOwnersAddMutationProps;
};


export type AdminOwnersMutationDeleteArgs = {
  props: AdminOwnersDeleteMutationProps;
};

export type AdminQuery = {
  __typename?: 'AdminQuery';
  cardsOrders?: Maybe<AdminCardsOrdersQuery>;
  dumpsters?: Maybe<AdminDumpstersQuery>;
  officials?: Maybe<AdminOfficialsQuery>;
};

export type AdminUserAddressType = {
  __typename?: 'AdminUserAddressType';
  usersAddress_ID: Scalars['Int'];
  usersAddress_apartamentNumber?: Maybe<Scalars['String']>;
  usersAddress_city: Scalars['String'];
  usersAddress_communityID: Scalars['Int'];
  usersAddress_houseNumber: Scalars['String'];
  usersAddress_postCode: Scalars['String'];
  usersAddress_statusID: Scalars['Int'];
  usersAddress_street: Scalars['String'];
  usersAddress_typeID: Scalars['Int'];
  usersAddress_userID: Scalars['Int'];
};

export type AdminUserInfoType = {
  __typename?: 'AdminUserInfoType';
  addresses: Array<AdminUserAddressType>;
  users_ID: Scalars['Int'];
  users_identificationNumber: Scalars['String'];
  users_login: Scalars['String'];
  users_name: Scalars['String'];
  users_phoneNumber?: Maybe<Scalars['String']>;
  users_statusID: Scalars['Int'];
  users_typeID: Scalars['Int'];
};

export type ApplicationAddressType = {
  __typename?: 'ApplicationAddressType';
  addressApplications_ID: Scalars['Int'];
  addressApplications_addressID?: Maybe<Scalars['Int']>;
  addressApplications_addressTypeID: Scalars['Int'];
  addressApplications_apartamentNumber?: Maybe<Scalars['String']>;
  addressApplications_city: Scalars['String'];
  addressApplications_communityID: Scalars['Int'];
  addressApplications_dateAdded: Scalars['String'];
  addressApplications_dateReviewed?: Maybe<Scalars['String']>;
  addressApplications_houseNumber: Scalars['String'];
  addressApplications_postCode: Scalars['String'];
  addressApplications_reviewedBy?: Maybe<Scalars['Int']>;
  addressApplications_statusID: Scalars['Int'];
  addressApplications_street: Scalars['String'];
  addressApplications_typeID: Scalars['Int'];
  addressApplications_userID: Scalars['Int'];
};

export type ApplicationArchiveType = {
  __typename?: 'ApplicationArchiveType';
  addressApplications: Array<Maybe<AddressApplicationArchiveType>>;
  cardsApplications: Array<Maybe<CardApplicationArchiveType>>;
  dumpstersApplications: Array<Maybe<DumpsterApplicationArchiveType>>;
  personalDataApplications: Array<Maybe<PersonalDataApplicationArchiveType>>;
};

export type ApplicationCardType = {
  __typename?: 'ApplicationCardType';
  cardsApplications_ID: Scalars['Int'];
  cardsApplications_dateAdded: Scalars['String'];
  cardsApplications_dateReviewed?: Maybe<Scalars['String']>;
  cardsApplications_reviewedBy?: Maybe<Scalars['Int']>;
  cardsApplications_statusID: Scalars['Int'];
  cardsApplications_typeID: Scalars['Int'];
  cardsApplications_userID: Scalars['Int'];
};

export type AuthLoginMutationProps = {
  users_login: Scalars['String'];
  users_password: Scalars['String'];
};

export type AuthMutation = {
  __typename?: 'AuthMutation';
  login: MutationResponseType;
  register: MutationResponseType;
};


export type AuthMutationLoginArgs = {
  props: AuthLoginMutationProps;
};


export type AuthMutationRegisterArgs = {
  props: AuthRegisterMutationProps;
};

export type AuthRegisterMutationProps = {
  usersAddress_apartamentNumber?: InputMaybe<Scalars['String']>;
  usersAddress_city: Scalars['String'];
  usersAddress_communityID: Scalars['Int'];
  usersAddress_houseNumber: Scalars['String'];
  usersAddress_postCode: Scalars['String'];
  usersAddress_street: Scalars['String'];
  users_identificationNumber: Scalars['String'];
  users_login: Scalars['String'];
  users_name: Scalars['String'];
  users_password: Scalars['String'];
  users_phoneNumber?: InputMaybe<Scalars['String']>;
};

export type BasicInfoType = {
  __typename?: 'BasicInfoType';
  users_ID: Scalars['Int'];
  /** PESEL/NIP */
  users_identificationNumber: Scalars['String'];
  /** login/email */
  users_login: Scalars['String'];
  users_name: Scalars['String'];
  users_phoneNumber?: Maybe<Scalars['String']>;
  /** ID statusu usera */
  users_statusID: Scalars['Int'];
};

export type CardApplicationArchiveType = {
  __typename?: 'CardApplicationArchiveType';
  cardsApplications_ID: Scalars['Int'];
  cardsApplications_dateAdded: Scalars['String'];
  cardsApplications_dateReviewed?: Maybe<Scalars['String']>;
  cardsApplications_reviewedBy?: Maybe<Scalars['Int']>;
  cardsApplications_statusID: Scalars['Int'];
  cardsApplications_typeID: Scalars['Int'];
  cardsApplications_userID: Scalars['Int'];
  cardsApplications_userIdentificationNumber: Scalars['String'];
  cardsApplications_userLogin: Scalars['String'];
  cardsApplications_userName: Scalars['String'];
};

export type CardsBulkOrderType = {
  __typename?: 'CardsBulkOrderType';
  cardsBulkOrder_ID: Scalars['Int'];
  cardsBulkOrder_numOfCards: Scalars['Int'];
  cardsBulkOrder_orderDate: Scalars['String'];
  cardsBulkOrder_statusID: Scalars['Int'];
  cardsBulkOrder_userID: Scalars['Int'];
};

export type CardsWithMatchingDumpstersType = {
  __typename?: 'CardsWithMatchingDumpstersType';
  dumpsters: Array<DumpsterMathingCardInfoType>;
  usersCards_ID: Scalars['Int'];
  usersCards_number: Scalars['String'];
};

export type ChangePasswordMutationProps = {
  user_ID: Scalars['Int'];
  user_newPassword: Scalars['String'];
};

export type CommonDumpstersGetQueryProps = {
  communities: Array<Scalars['Int']>;
  ownerID?: InputMaybe<Scalars['Int']>;
};

export type CommonDumpstersInfoType = {
  __typename?: 'CommonDumpstersInfoType';
  dumpster_ID: Scalars['Int'];
  dumpster_city: Scalars['String'];
  dumpster_communityID: Scalars['Int'];
  dumpster_description?: Maybe<Scalars['String']>;
  dumpster_hasError: Scalars['Boolean'];
  /** numery domów do których należy */
  dumpster_houseNumbers: Scalars['String'];
  dumpster_name: Scalars['String'];
  dumpster_postCode: Scalars['String'];
  dumpster_street: Scalars['String'];
};

export type CommonDumpstersQuery = {
  __typename?: 'CommonDumpstersQuery';
  get?: Maybe<Array<CommonDumpstersInfoType>>;
};


export type CommonDumpstersQueryGetArgs = {
  props: CommonDumpstersGetQueryProps;
};

export type CommonQuery = {
  __typename?: 'CommonQuery';
  dumpsters?: Maybe<CommonDumpstersQuery>;
  user?: Maybe<CommonUserQuery>;
};

export type CommonUserDataGetQueryProps = {
  users_ID: Scalars['Int'];
};

export type CommonUserDataGetQueryType = {
  __typename?: 'CommonUserDataGetQueryType';
  basicInfo: BasicInfoType;
};

export type CommonUserQuery = {
  __typename?: 'CommonUserQuery';
  get: CommonUserDataGetQueryType;
};


export type CommonUserQueryGetArgs = {
  props?: InputMaybe<CommonUserDataGetQueryProps>;
};

export type CommunityInfoType = {
  __typename?: 'CommunityInfoType';
  community_ID: Scalars['Int'];
  community_description: Scalars['String'];
  community_municipalityID: Scalars['Int'];
  community_name: Scalars['String'];
  community_voivodeshipID: Scalars['Int'];
};

export type CompanyAddressAddMutationProps = {
  usersAddress_apartamentNumber?: InputMaybe<Scalars['String']>;
  usersAddress_city: Scalars['String'];
  usersAddress_communityID: Scalars['Int'];
  usersAddress_houseNumber: Scalars['String'];
  usersAddress_postCode: Scalars['String'];
  usersAddress_street: Scalars['String'];
  usersAddress_typeID: Scalars['Int'];
  usersAddress_userID: Scalars['Int'];
};

export type CompanyAddressDeleteMutationProps = {
  usersAddress_ID: Scalars['Int'];
  usersAddress_userID: Scalars['Int'];
};

export type CompanyAddressEditMutationProps = {
  usersAddress_addressID: Scalars['Int'];
  usersAddress_apartamentNumber?: InputMaybe<Scalars['String']>;
  usersAddress_city: Scalars['String'];
  usersAddress_communityID: Scalars['Int'];
  usersAddress_houseNumber: Scalars['String'];
  usersAddress_postCode: Scalars['String'];
  usersAddress_street: Scalars['String'];
  usersAddress_typeID: Scalars['Int'];
  usersAddress_userID: Scalars['Int'];
};

export type CompanyAddressMutation = {
  __typename?: 'CompanyAddressMutation';
  add?: Maybe<MutationResponseType>;
  delete?: Maybe<MutationResponseType>;
  edit?: Maybe<MutationResponseType>;
};


export type CompanyAddressMutationAddArgs = {
  props: CompanyAddressAddMutationProps;
};


export type CompanyAddressMutationDeleteArgs = {
  props: CompanyAddressDeleteMutationProps;
};


export type CompanyAddressMutationEditArgs = {
  props: CompanyAddressEditMutationProps;
};

export type CompanyAddressQuery = {
  __typename?: 'CompanyAddressQuery';
  get?: Maybe<Array<UsersAddressType>>;
};

export type CompanyCardsAddMutationProps = {
  numOfCards: Scalars['Int'];
  userID: Scalars['Int'];
};

export type CompanyCardsMutation = {
  __typename?: 'CompanyCardsMutation';
  add?: Maybe<MutationResponseType>;
};


export type CompanyCardsMutationAddArgs = {
  props: CompanyCardsAddMutationProps;
};

export type CompanyCardsQuery = {
  __typename?: 'CompanyCardsQuery';
  get?: Maybe<Array<CardsBulkOrderType>>;
};

export type CompanyCardsRentAddMutationProps = {
  cardID: Scalars['Int'];
  userID: Scalars['Int'];
};

export type CompanyCardsRentDeleteMutationProps = {
  cardID: Scalars['Int'];
  userID: Scalars['Int'];
};

export type CompanyCardsRentMutation = {
  __typename?: 'CompanyCardsRentMutation';
  add?: Maybe<MutationResponseType>;
  delete?: Maybe<MutationResponseType>;
};


export type CompanyCardsRentMutationAddArgs = {
  props: CompanyCardsRentAddMutationProps;
};


export type CompanyCardsRentMutationDeleteArgs = {
  props: CompanyCardsRentDeleteMutationProps;
};

export type CompanyDumpstersAddMutationProps = {
  card_ID: Scalars['Int'];
  dumpster_ID: Scalars['Int'];
  user_ID: Scalars['Int'];
};

export type CompanyDumpstersMutation = {
  __typename?: 'CompanyDumpstersMutation';
  add?: Maybe<MutationResponseType>;
};


export type CompanyDumpstersMutationAddArgs = {
  props: CompanyDumpstersAddMutationProps;
};

export type CompanyDumpstersQuery = {
  __typename?: 'CompanyDumpstersQuery';
  get?: Maybe<Array<DumpsterInfoType>>;
};

export type CompanyGarbageGetQueryProps = {
  company_ID: Scalars['Int'];
  garbage_dateFrom: Scalars['String'];
  garbage_dateTo: Scalars['String'];
};

export type CompanyGarbageQuery = {
  __typename?: 'CompanyGarbageQuery';
  get?: Maybe<Array<CompanyGarbageType>>;
};


export type CompanyGarbageQueryGetArgs = {
  props?: InputMaybe<CompanyGarbageGetQueryProps>;
};

export type CompanyGarbageType = {
  __typename?: 'CompanyGarbageType';
  dumpsterID: Scalars['Int'];
  garbage: RateType;
};

export type CompanyInfoMutation = {
  __typename?: 'CompanyInfoMutation';
  pin: MutationResponseType;
  profile: MutationResponseType;
};


export type CompanyInfoMutationPinArgs = {
  props: CompanyPiNnumberMutationProps;
};


export type CompanyInfoMutationProfileArgs = {
  props: CompanyInfoProfileMutationProps;
};

export type CompanyInfoProfileMutationProps = {
  email?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  phoneNumber?: InputMaybe<Scalars['String']>;
};

export type CompanyMutation = {
  __typename?: 'CompanyMutation';
  addresses?: Maybe<CompanyAddressMutation>;
  cards?: Maybe<CompanyCardsMutation>;
  cardsRent?: Maybe<CompanyCardsRentMutation>;
  dumpsters?: Maybe<CompanyDumpstersMutation>;
  info?: Maybe<CompanyInfoMutation>;
  occupants?: Maybe<CompanyOccupantsMutation>;
};

export type CompanyOccupantsAddMutationProps = {
  company_ID: Scalars['Int'];
  occupant_ID: Scalars['Int'];
};

export type CompanyOccupantsDeleteMutationProps = {
  connection_ID: Scalars['Int'];
};

export type CompanyOccupantsGetQueryProps = {
  company_ID: Scalars['Int'];
};

export type CompanyOccupantsMutation = {
  __typename?: 'CompanyOccupantsMutation';
  add?: Maybe<MutationResponseType>;
  delete?: Maybe<MutationResponseType>;
};


export type CompanyOccupantsMutationAddArgs = {
  props: CompanyOccupantsAddMutationProps;
};


export type CompanyOccupantsMutationDeleteArgs = {
  props: CompanyOccupantsDeleteMutationProps;
};

export type CompanyOccupantsQuery = {
  __typename?: 'CompanyOccupantsQuery';
  get?: Maybe<Array<CompanyUserType>>;
};


export type CompanyOccupantsQueryGetArgs = {
  props?: InputMaybe<CompanyOccupantsGetQueryProps>;
};

export type CompanyPiNnumberMutationProps = {
  newPIN: Scalars['String'];
};

export type CompanyQuery = {
  __typename?: 'CompanyQuery';
  addresses?: Maybe<CompanyAddressQuery>;
  cards?: Maybe<CompanyCardsQuery>;
  dumpsters?: Maybe<CompanyDumpstersQuery>;
  garbage?: Maybe<CompanyGarbageQuery>;
  occupants?: Maybe<CompanyOccupantsQuery>;
};

export type CompanyUserType = {
  __typename?: 'CompanyUserType';
  addresses?: Maybe<Array<Maybe<UsersAddressType>>>;
  connection_ID?: Maybe<Scalars['Int']>;
  users_ID: Scalars['Int'];
  /** PESEL/NIP */
  users_identificationNumber: Scalars['String'];
  /** login/email */
  users_login: Scalars['String'];
  users_name: Scalars['String'];
  users_phoneNumber?: Maybe<Scalars['String']>;
  /** ID statusu usera */
  users_statusID: Scalars['Int'];
};

export type ContractType = {
  __typename?: 'ContractType';
  /** ID of the contract */
  dumpsterContract_ID: Scalars['Int'];
  dumpsterContract_communityID: Scalars['Int'];
  dumpsterContract_dateFrom: Scalars['String'];
  dumpsterContract_dateTo: Scalars['String'];
  dumpsterContract_dumpsterID: Scalars['Int'];
  /** Contract number */
  dumpsterContract_number: Scalars['String'];
  dumpsterContract_statusID: Scalars['Int'];
  rates?: Maybe<Array<Maybe<RateInfoType>>>;
};

export type DumpsterApplicationArchiveType = {
  __typename?: 'DumpsterApplicationArchiveType';
  dumpstersApplications_ID: Scalars['Int'];
  dumpstersApplications_cardID: Scalars['Int'];
  dumpstersApplications_cardNumber: Scalars['String'];
  dumpstersApplications_dateAdded: Scalars['String'];
  dumpstersApplications_dateReviewed?: Maybe<Scalars['String']>;
  dumpstersApplications_dumpsterID: Scalars['Int'];
  dumpstersApplications_dumpsterNumber: Scalars['String'];
  dumpstersApplications_reviewedBy?: Maybe<Scalars['Int']>;
  dumpstersApplications_statusID: Scalars['Int'];
  dumpstersApplications_typeID: Scalars['Int'];
  dumpstersApplications_userID: Scalars['Int'];
  dumpstersApplications_userIdentificationNumber: Scalars['String'];
  dumpstersApplications_userLogin: Scalars['String'];
  dumpstersApplications_userName: Scalars['String'];
};

export type DumpsterBinType = {
  __typename?: 'DumpsterBinType';
  dumpsterBin_ID: Scalars['Int'];
  dumpsterBin_dumpsterID: Scalars['Int'];
  dumpsterBin_isFull: Scalars['Boolean'];
  dumpsterBin_typeID: Scalars['Int'];
};

export type DumpsterDataType = {
  __typename?: 'DumpsterDataType';
  dumpster_ID: Scalars['Int'];
  dumpster_city: Scalars['String'];
  dumpster_communityID: Scalars['Int'];
  dumpster_description?: Maybe<Scalars['String']>;
  dumpster_hasError: Scalars['Boolean'];
  dumpster_houseNumbers: Scalars['String'];
  dumpster_name: Scalars['String'];
  dumpster_postCode: Scalars['String'];
  dumpster_street: Scalars['String'];
};

export type DumpsterInfoType = {
  __typename?: 'DumpsterInfoType';
  bins: Array<Maybe<DumpsterBinType>>;
  contracts: Array<Maybe<ContractType>>;
  dumpster_ID: Scalars['Int'];
  dumpster_city: Scalars['String'];
  /** id gminy */
  dumpster_communityID: Scalars['Int'];
  dumpster_description?: Maybe<Scalars['String']>;
  dumpster_hasError: Scalars['Boolean'];
  /** numery domów do których należy */
  dumpster_houseNumbers: Scalars['String'];
  dumpster_name: Scalars['String'];
  dumpster_postCode: Scalars['String'];
  dumpster_statusID: Scalars['Int'];
  dumpster_street: Scalars['String'];
};

export type DumpsterMathingCardInfoType = {
  __typename?: 'DumpsterMathingCardInfoType';
  dumpster_city: Scalars['String'];
  /** numery domów do których należy */
  dumpster_houseNumbers: Scalars['String'];
  dumpster_name: Scalars['String'];
  dumpster_street: Scalars['String'];
};

export type GarbageLineChartType = {
  __typename?: 'GarbageLineChartType';
  garbage_fullDate: Scalars['String'];
  garbage_sum: Scalars['Int'];
  garbage_typeID: Scalars['Int'];
  month: Scalars['String'];
  monthIndex: Scalars['Int'];
  waste_name: Scalars['String'];
};

export type GarbagePieChartType = {
  __typename?: 'GarbagePieChartType';
  garbageTypes: Array<GarbageSummaryByTypesType>;
  total: Scalars['Int'];
};

export type GarbageSummaryByTypesType = {
  __typename?: 'GarbageSummaryByTypesType';
  color: Scalars['String'];
  mass: Scalars['Int'];
  type: Scalars['String'];
  typeID?: Maybe<Scalars['Int']>;
};

export type GenericStatusesType = {
  __typename?: 'GenericStatusesType';
  Users: Array<UserInfoType>;
  UsersCards: Array<UsersCardsType>;
  UsersContract: Array<ContractType>;
  status_ID: Scalars['Int'];
  status_description?: Maybe<Scalars['String']>;
  status_name: Scalars['String'];
  status_type: Scalars['String'];
};

export type GenericTypesType = {
  __typename?: 'GenericTypesType';
  Garbage: Array<UserGarbageSummaryQuery>;
  Rate: Array<RateInfoType>;
  Users: Array<UserInfoType>;
  UsersAddress: Array<UsersAddressType>;
  type_ID: Scalars['Int'];
  type_description?: Maybe<Scalars['String']>;
  type_name: Scalars['String'];
  type_type: Scalars['String'];
};

export type HousingAssociationContractsType = {
  __typename?: 'HousingAssociationContractsType';
  dumpsterContract_ID: Scalars['Int'];
  dumpsterContract_communityID: Scalars['Int'];
  dumpsterContract_dateFrom: Scalars['String'];
  dumpsterContract_dateTo: Scalars['String'];
  dumpsterContract_dumpsterID: Scalars['Int'];
  dumpsterContract_number: Scalars['String'];
  dumpsterContract_statusID: Scalars['Int'];
  rates?: Maybe<HousingAssociationRatesType>;
};

export type HousingAssociationRatesType = {
  __typename?: 'HousingAssociationRatesType';
  bio?: Maybe<Scalars['Int']>;
  glass?: Maybe<Scalars['Int']>;
  mixed?: Maybe<Scalars['Int']>;
  paper?: Maybe<Scalars['Int']>;
  plastic?: Maybe<Scalars['Int']>;
};

export type IsUserExistProps = {
  users_login: Scalars['String'];
};

export type MunicipalityInfoType = {
  __typename?: 'MunicipalityInfoType';
  municipality_ID: Scalars['Int'];
  municipality_description: Scalars['String'];
  municipality_name: Scalars['String'];
  municipality_voivodeshipID: Scalars['Int'];
};

export type Mutation = {
  __typename?: 'Mutation';
  admin?: Maybe<AdminMutation>;
  auth?: Maybe<AuthMutation>;
  company?: Maybe<CompanyMutation>;
  official?: Maybe<OfficialMutation>;
  user?: Maybe<UserMutation>;
};

export type MutationResponseStatusType = {
  __typename?: 'MutationResponseStatusType';
  description?: Maybe<Scalars['String']>;
  message: StatusEnum;
};

export type MutationResponseType = {
  __typename?: 'MutationResponseType';
  description?: Maybe<Scalars['String']>;
  status: MutationResponseStatusType;
};

export type NewAddressType = {
  __typename?: 'NewAddressType';
  addressApplications_ID: Scalars['Int'];
  addressApplications_addressID?: Maybe<Scalars['Int']>;
  addressApplications_addressTypeID: Scalars['Int'];
  addressApplications_apartamentNumber?: Maybe<Scalars['String']>;
  addressApplications_city: Scalars['String'];
  addressApplications_communityID: Scalars['Int'];
  addressApplications_dateAdded: Scalars['String'];
  addressApplications_dateReviewed?: Maybe<Scalars['String']>;
  addressApplications_houseNumber: Scalars['String'];
  addressApplications_postCode: Scalars['String'];
  addressApplications_reviewedBy?: Maybe<Scalars['Int']>;
  addressApplications_statusID: Scalars['Int'];
  addressApplications_street: Scalars['String'];
  addressApplications_typeID: Scalars['Int'];
  addressApplications_userID: Scalars['Int'];
  user: OfficialApplicationsUserInfoType;
};

export type NewCardType = {
  __typename?: 'NewCardType';
  cardsApplications_ID: Scalars['Int'];
  cardsApplications_dateAdded: Scalars['String'];
  cardsApplications_dateReviewed?: Maybe<Scalars['String']>;
  cardsApplications_reviewedBy?: Maybe<Scalars['Int']>;
  cardsApplications_statusID: Scalars['Int'];
  cardsApplications_typeID: Scalars['Int'];
  cardsApplications_userID: Scalars['Int'];
  dumpsters: Array<Maybe<DumpsterDataType>>;
  user: UserInfoType;
};

export type NewDumpsterApplicationType = {
  __typename?: 'NewDumpsterApplicationType';
  dumpstersApplications_ID: Scalars['Int'];
  dumpstersApplications_cardID: Scalars['Int'];
  dumpstersApplications_cardNumber: Scalars['String'];
  dumpstersApplications_dateAdded: Scalars['String'];
  dumpstersApplications_dateReviewed?: Maybe<Scalars['String']>;
  dumpstersApplications_dumpsterID: Scalars['Int'];
  dumpstersApplications_dumpsterName: Scalars['String'];
  dumpstersApplications_reviewedBy?: Maybe<Scalars['Int']>;
  dumpstersApplications_statusID: Scalars['Int'];
  dumpstersApplications_typeID: Scalars['Int'];
  dumpstersApplications_userID: Scalars['Int'];
  dumpstersApplications_userName: Scalars['String'];
};

export type NewOrderType = {
  __typename?: 'NewOrderType';
  cardsBulkOrder_ID: Scalars['Int'];
  cardsBulkOrder_numOfCards: Scalars['Int'];
  cardsBulkOrder_orderDate: Scalars['String'];
  cardsBulkOrder_statusID: Scalars['Int'];
  cardsBulkOrder_userID: Scalars['Int'];
  user: UserInfoType;
};

export type NewUserInfoType = {
  __typename?: 'NewUserInfoType';
  personalDataApplications_ID: Scalars['Int'];
  personalDataApplications_dateAdded: Scalars['String'];
  personalDataApplications_dateReviewed?: Maybe<Scalars['String']>;
  personalDataApplications_name: Scalars['String'];
  personalDataApplications_reviewedBy?: Maybe<Scalars['Int']>;
  personalDataApplications_statusID: Scalars['Int'];
  personalDataApplications_typeID: Scalars['Int'];
  personalDataApplications_userID: Scalars['Int'];
};

export type OfficialAddAddressInfoApplicationsVerifyMutationProps = {
  addressApplications_ID: Scalars['Int'];
  isVerified: Scalars['Boolean'];
  reviewer: Scalars['Int'];
  user_ID: Scalars['Int'];
};

export type OfficialAddDumpstersApplicationsVerifyMutationProps = {
  card_ID: Scalars['Int'];
  dumpster_ID: Scalars['Int'];
  dumpstersApplications_ID: Scalars['Int'];
  isVerified: Scalars['Boolean'];
  reviewer: Scalars['Int'];
};

export type OfficialAddressInfoAddMutationProps = {
  usersAddress_apartamentNumber?: InputMaybe<Scalars['String']>;
  usersAddress_city: Scalars['String'];
  usersAddress_communityID: Scalars['Int'];
  usersAddress_houseNumber: Scalars['String'];
  usersAddress_postCode: Scalars['String'];
  usersAddress_street: Scalars['String'];
  usersAddress_typeID: Scalars['Int'];
  usersAddress_userID: Scalars['Int'];
};

export type OfficialAddressInfoApplicationsMutation = {
  __typename?: 'OfficialAddressInfoApplicationsMutation';
  verifyAdd?: Maybe<MutationResponseType>;
  verifyDelete?: Maybe<MutationResponseType>;
  verifyEdit?: Maybe<MutationResponseType>;
};


export type OfficialAddressInfoApplicationsMutationVerifyAddArgs = {
  props: OfficialAddAddressInfoApplicationsVerifyMutationProps;
};


export type OfficialAddressInfoApplicationsMutationVerifyDeleteArgs = {
  props: OfficialDeleteAddressInfoApplicationsVerifyMutationProps;
};


export type OfficialAddressInfoApplicationsMutationVerifyEditArgs = {
  props: OfficialEditAddressInfoApplicationsVerifyMutationProps;
};

export type OfficialAddressInfoDeleteMutationProps = {
  usersAddress_ID: Scalars['Int'];
  usersAddress_userID: Scalars['Int'];
};

export type OfficialAddressInfoEditMutationProps = {
  usersAddress_ID: Scalars['Int'];
  usersAddress_apartamentNumber?: InputMaybe<Scalars['String']>;
  usersAddress_city: Scalars['String'];
  usersAddress_communityID: Scalars['Int'];
  usersAddress_houseNumber: Scalars['String'];
  usersAddress_postCode: Scalars['String'];
  usersAddress_street: Scalars['String'];
  usersAddress_typeID: Scalars['Int'];
};

export type OfficialAddressInfoMutation = {
  __typename?: 'OfficialAddressInfoMutation';
  add?: Maybe<MutationResponseType>;
  delete?: Maybe<MutationResponseType>;
  edit?: Maybe<MutationResponseType>;
};


export type OfficialAddressInfoMutationAddArgs = {
  props: OfficialAddressInfoAddMutationProps;
};


export type OfficialAddressInfoMutationDeleteArgs = {
  props: OfficialAddressInfoDeleteMutationProps;
};


export type OfficialAddressInfoMutationEditArgs = {
  props: OfficialAddressInfoEditMutationProps;
};

export type OfficialApplicationsAddressInfoQuery = {
  __typename?: 'OfficialApplicationsAddressInfoQuery';
  get?: Maybe<Array<NewAddressType>>;
};


export type OfficialApplicationsAddressInfoQueryGetArgs = {
  props?: InputMaybe<OfficialApplicationsAddressInfoQueryProps>;
};

export type OfficialApplicationsAddressInfoQueryProps = {
  users_data?: InputMaybe<Scalars['String']>;
};

export type OfficialApplicationsArchiveQuery = {
  __typename?: 'OfficialApplicationsArchiveQuery';
  get: ApplicationArchiveType;
};

export type OfficialApplicationsCardsQuery = {
  __typename?: 'OfficialApplicationsCardsQuery';
  get?: Maybe<Array<NewCardType>>;
};


export type OfficialApplicationsCardsQueryGetArgs = {
  props?: InputMaybe<OfficialApplicationsCardsQueryProps>;
};

export type OfficialApplicationsCardsQueryProps = {
  users_data?: InputMaybe<Scalars['String']>;
};

export type OfficialApplicationsDumpstersQuery = {
  __typename?: 'OfficialApplicationsDumpstersQuery';
  get?: Maybe<Array<NewDumpsterApplicationType>>;
};


export type OfficialApplicationsDumpstersQueryGetArgs = {
  props?: InputMaybe<OfficialApplicationsDumpstersQueryProps>;
};

export type OfficialApplicationsDumpstersQueryProps = {
  users_data?: InputMaybe<Scalars['String']>;
};

export type OfficialApplicationsMutation = {
  __typename?: 'OfficialApplicationsMutation';
  addressInfo?: Maybe<OfficialAddressInfoApplicationsMutation>;
  cards?: Maybe<OfficialCardsApplicationsMutation>;
  dumpsters?: Maybe<OfficialDumpstersApplicationsMutation>;
  newUser?: Maybe<OfficialNewUserApplicationMutation>;
  userInfo?: Maybe<OfficialUserInfoApplicationsMutation>;
};

export type OfficialApplicationsNewUsersQuery = {
  __typename?: 'OfficialApplicationsNewUsersQuery';
  get?: Maybe<Array<UserInfoType>>;
};


export type OfficialApplicationsNewUsersQueryGetArgs = {
  props?: InputMaybe<OfficialApplicationsNewUsersQueryProps>;
};

export type OfficialApplicationsNewUsersQueryProps = {
  users_data?: InputMaybe<Scalars['String']>;
};

export type OfficialApplicationsQuery = {
  __typename?: 'OfficialApplicationsQuery';
  addressInfo?: Maybe<OfficialApplicationsAddressInfoQuery>;
  archive?: Maybe<OfficialApplicationsArchiveQuery>;
  cards?: Maybe<OfficialApplicationsCardsQuery>;
  dumpsters?: Maybe<OfficialApplicationsDumpstersQuery>;
  newUser?: Maybe<OfficialApplicationsNewUsersQuery>;
  userInfo?: Maybe<OfficialApplicationsUserInfoQuery>;
};

export type OfficialApplicationsUserInfoQuery = {
  __typename?: 'OfficialApplicationsUserInfoQuery';
  get?: Maybe<Array<PersonalDataApplicationsType>>;
};


export type OfficialApplicationsUserInfoQueryGetArgs = {
  props?: InputMaybe<OfficialApplicationsUserInfoQueryProps>;
};

export type OfficialApplicationsUserInfoQueryProps = {
  users_data?: InputMaybe<Scalars['String']>;
};

export type OfficialApplicationsUserInfoType = {
  __typename?: 'OfficialApplicationsUserInfoType';
  addresses?: Maybe<Array<Maybe<UsersAddressType>>>;
  users_ID: Scalars['Int'];
  /** PESEL/NIP */
  users_identificationNumber: Scalars['String'];
  /** login/email */
  users_login: Scalars['String'];
  users_name: Scalars['String'];
  users_phoneNumber?: Maybe<Scalars['String']>;
  /** ID statusu usera */
  users_statusID: Scalars['Int'];
};

export type OfficialBinGetQueryProps = {
  dumpsterBin_ID: Scalars['Int'];
};

export type OfficialBinsQuery = {
  __typename?: 'OfficialBinsQuery';
  get?: Maybe<DumpsterBinType>;
};


export type OfficialBinsQueryGetArgs = {
  props: OfficialBinGetQueryProps;
};

export type OfficialCardsAddMutationProps = {
  usersCards_number: Scalars['String'];
  usersCards_numberPIN?: InputMaybe<Scalars['String']>;
  /** id statusu karty */
  usersCards_statusID: Scalars['Int'];
  usersCards_userID: Scalars['Int'];
};

export type OfficialCardsApplicationsMutation = {
  __typename?: 'OfficialCardsApplicationsMutation';
  verify?: Maybe<MutationResponseType>;
};


export type OfficialCardsApplicationsMutationVerifyArgs = {
  props: OfficialCardsApplicationsVerifyMutationProps;
};

export type OfficialCardsApplicationsVerifyMutationProps = {
  card_number?: InputMaybe<Scalars['String']>;
  cardsApplications_ID: Scalars['Int'];
  isVerified: Scalars['Boolean'];
  reviewer: Scalars['Int'];
  user_ID?: InputMaybe<Scalars['Int']>;
};

export type OfficialCardsDeleteMutationProps = {
  usersCards_ID: Scalars['Int'];
};

export type OfficialCardsEditMutationProps = {
  usersCards_ID: Scalars['Int'];
  usersCards_number: Scalars['String'];
  usersCards_numberPIN?: InputMaybe<Scalars['String']>;
  /** id statusu karty */
  usersCards_statusID: Scalars['Int'];
};

export type OfficialCardsMutation = {
  __typename?: 'OfficialCardsMutation';
  add?: Maybe<MutationResponseType>;
  delete?: Maybe<MutationResponseType>;
  edit?: Maybe<MutationResponseType>;
};


export type OfficialCardsMutationAddArgs = {
  props: OfficialCardsAddMutationProps;
};


export type OfficialCardsMutationDeleteArgs = {
  props: OfficialCardsDeleteMutationProps;
};


export type OfficialCardsMutationEditArgs = {
  props: OfficialCardsEditMutationProps;
};

export type OfficialCardsTypeWDumpstersType = {
  __typename?: 'OfficialCardsTypeWDumpstersType';
  dumpsters: Array<Maybe<DumpsterInfoType>>;
  usersCards_ID: Scalars['Int'];
  usersCards_number: Scalars['String'];
  usersCards_numberPIN?: Maybe<Scalars['String']>;
  usersCards_rentedToUserID?: Maybe<Scalars['Int']>;
  /** id statusu karty */
  usersCards_statusID: Scalars['Int'];
  usersCards_userID: Scalars['Int'];
};

export type OfficialContractsAddMutationProps = {
  dumpsterContract_communityID: Scalars['Int'];
  dumpsterContract_dateFrom: Scalars['String'];
  dumpsterContract_dateTo: Scalars['String'];
  dumpsterContract_dumpsterID: Scalars['Int'];
  dumpsterContract_number: Scalars['String'];
  dumpsterContract_statusID: Scalars['Int'];
};

export type OfficialContractsArchivizeMutationProps = {
  dumpsterContract_ID: Scalars['Int'];
};

export type OfficialContractsDeleteMutationProps = {
  dumpsterContract_ID: Scalars['Int'];
};

export type OfficialContractsEditMutationProps = {
  dumpsterContract_ID: Scalars['Int'];
  dumpsterContract_dateFrom: Scalars['String'];
  dumpsterContract_dateTo: Scalars['String'];
  dumpsterContract_dumpsterID: Scalars['Int'];
  dumpsterContract_statusID: Scalars['Int'];
};

export type OfficialContractsMutation = {
  __typename?: 'OfficialContractsMutation';
  add?: Maybe<MutationResponseType>;
  archivize?: Maybe<MutationResponseType>;
  delete?: Maybe<MutationResponseType>;
  edit?: Maybe<MutationResponseType>;
};


export type OfficialContractsMutationAddArgs = {
  props: OfficialContractsAddMutationProps;
};


export type OfficialContractsMutationArchivizeArgs = {
  props: OfficialContractsArchivizeMutationProps;
};


export type OfficialContractsMutationDeleteArgs = {
  props: OfficialContractsDeleteMutationProps;
};


export type OfficialContractsMutationEditArgs = {
  props: OfficialContractsEditMutationProps;
};

export type OfficialCreateUserAddMutationProps = {
  usersAddress_apartamentNumber?: InputMaybe<Scalars['String']>;
  usersAddress_city: Scalars['String'];
  usersAddress_communityID: Scalars['Int'];
  usersAddress_houseNumber: Scalars['String'];
  usersAddress_postCode: Scalars['String'];
  usersAddress_street: Scalars['String'];
  users_identificationNumber: Scalars['String'];
  users_login: Scalars['String'];
  users_name: Scalars['String'];
  users_password: Scalars['String'];
  users_phoneNumber?: InputMaybe<Scalars['String']>;
};

export type OfficialCreateUserMutation = {
  __typename?: 'OfficialCreateUserMutation';
  add: MutationResponseType;
};


export type OfficialCreateUserMutationAddArgs = {
  props: OfficialCreateUserAddMutationProps;
};

export type OfficialDeleteAddressInfoApplicationsVerifyMutationProps = {
  addressApplications_ID: Scalars['Int'];
  isVerified: Scalars['Boolean'];
  reviewer: Scalars['Int'];
  userAddress_ID: Scalars['Int'];
};

export type OfficialDeleteUserMutation = {
  __typename?: 'OfficialDeleteUserMutation';
  delete?: Maybe<MutationResponseType>;
};


export type OfficialDeleteUserMutationDeleteArgs = {
  props: OfficialDeleteUserMutationProps;
};

export type OfficialDeleteUserMutationProps = {
  user_ID: Scalars['Int'];
};

export type OfficialDumpstersAddMutationProps = {
  card_ID: Scalars['Int'];
  dumpster_ID: Scalars['Int'];
};

export type OfficialDumpstersApplicationsMutation = {
  __typename?: 'OfficialDumpstersApplicationsMutation';
  verifyAdd?: Maybe<MutationResponseType>;
};


export type OfficialDumpstersApplicationsMutationVerifyAddArgs = {
  props: OfficialAddDumpstersApplicationsVerifyMutationProps;
};

export type OfficialDumpstersDeleteMutationProps = {
  card_ID: Scalars['Int'];
  dumpster_ID: Scalars['Int'];
};

export type OfficialDumpstersMutation = {
  __typename?: 'OfficialDumpstersMutation';
  add?: Maybe<MutationResponseType>;
  delete?: Maybe<MutationResponseType>;
};


export type OfficialDumpstersMutationAddArgs = {
  props: OfficialDumpstersAddMutationProps;
};


export type OfficialDumpstersMutationDeleteArgs = {
  props: OfficialDumpstersDeleteMutationProps;
};

export type OfficialDumpstersQuery = {
  __typename?: 'OfficialDumpstersQuery';
  get?: Maybe<Array<DumpsterInfoType>>;
};

export type OfficialEditAddressInfoApplicationsVerifyMutationProps = {
  addressApplications_ID: Scalars['Int'];
  isVerified: Scalars['Boolean'];
  reviewer: Scalars['Int'];
  userAddress_ID: Scalars['Int'];
};

export type OfficialEditUserInfoApplicationsVerifyMutationProps = {
  isVerified: Scalars['Boolean'];
  personalDataApplications_ID: Scalars['Int'];
  reviewer: Scalars['Int'];
  user_ID: Scalars['Int'];
};

export type OfficialMutation = {
  __typename?: 'OfficialMutation';
  address?: Maybe<OfficialAddressInfoMutation>;
  applications?: Maybe<OfficialApplicationsMutation>;
  cards?: Maybe<OfficialCardsMutation>;
  contracts?: Maybe<OfficialContractsMutation>;
  createUser?: Maybe<OfficialCreateUserMutation>;
  dumpsters?: Maybe<OfficialDumpstersMutation>;
  info?: Maybe<OfficialUserInfoMutation>;
  officials?: Maybe<SuperOfficialOfficialsMutation>;
  rates?: Maybe<OfficialRatesMutation>;
  userContracts?: Maybe<OfficialUserContractsMutation>;
  users?: Maybe<OfficialDeleteUserMutation>;
};

export type OfficialNewUserApplicationMutation = {
  __typename?: 'OfficialNewUserApplicationMutation';
  verify?: Maybe<MutationResponseType>;
};


export type OfficialNewUserApplicationMutationVerifyArgs = {
  props: OfficialNewUserApplicationVerifyMutationProps;
};

export type OfficialNewUserApplicationVerifyMutationProps = {
  isVerified: Scalars['Boolean'];
  userID: Scalars['Int'];
};

export type OfficialQuery = {
  __typename?: 'OfficialQuery';
  applications?: Maybe<OfficialApplicationsQuery>;
  bins?: Maybe<OfficialBinsQuery>;
  dumpsters?: Maybe<OfficialDumpstersQuery>;
  officials?: Maybe<SuperOfficialOfficialsQuery>;
  user?: Maybe<OfficialSelectedUserDataQuery>;
  users?: Maybe<OfficialUserInfoQuery>;
};

export type OfficialRatesAddMutationProps = {
  rate_dumpsterContractID: Scalars['Int'];
  rate_typeID: Scalars['Int'];
  rate_value: Scalars['Float'];
};

export type OfficialRatesDeleteMutationProps = {
  rate_ID: Scalars['Int'];
};

export type OfficialRatesEditMutationProps = {
  rate_ID: Scalars['Int'];
  rate_typeID: Scalars['Int'];
  rate_value: Scalars['Float'];
};

export type OfficialRatesMutation = {
  __typename?: 'OfficialRatesMutation';
  add?: Maybe<MutationResponseType>;
  delete?: Maybe<MutationResponseType>;
  edit?: Maybe<MutationResponseType>;
};


export type OfficialRatesMutationAddArgs = {
  props: OfficialRatesAddMutationProps;
};


export type OfficialRatesMutationDeleteArgs = {
  props: OfficialRatesDeleteMutationProps;
};


export type OfficialRatesMutationEditArgs = {
  props: OfficialRatesEditMutationProps;
};

export type OfficialSelectedUserDataGetQueryProps = {
  users_ID: Scalars['Int'];
};

export type OfficialSelectedUserDataGetQueryResult = {
  __typename?: 'OfficialSelectedUserDataGetQueryResult';
  result: OfficialSelectedUserDataType;
};


export type OfficialSelectedUserDataGetQueryResultResultArgs = {
  props?: InputMaybe<OfficialSelectedUserDataGetQueryProps>;
};

export type OfficialSelectedUserDataQuery = {
  __typename?: 'OfficialSelectedUserDataQuery';
  get?: Maybe<OfficialSelectedUserDataGetQueryResult>;
};


export type OfficialSelectedUserDataQueryGetArgs = {
  props?: InputMaybe<OfficialSelectedUserDataGetQueryProps>;
};

export type OfficialSelectedUserDataType = {
  __typename?: 'OfficialSelectedUserDataType';
  addressInfo: Array<Maybe<UsersAddressType>>;
  basicInfo: OfficialUserSearchType;
  cards: Array<Maybe<OfficialCardsTypeWDumpstersType>>;
  contracts?: Maybe<UserContractType>;
  dumpsters: Array<Maybe<DumpsterInfoType>>;
  userType: Scalars['Int'];
};

export type OfficialUserContractsAddMutationProps = {
  usersContract_communityID: Scalars['Int'];
  usersContract_dateFrom: Scalars['String'];
  usersContract_dateTo: Scalars['String'];
  usersContract_number: Scalars['String'];
  usersContract_rateBio: Scalars['Float'];
  usersContract_rateGlass: Scalars['Float'];
  usersContract_rateMixed: Scalars['Float'];
  usersContract_ratePaper: Scalars['Float'];
  usersContract_ratePlastic: Scalars['Float'];
  usersContract_statusID: Scalars['Int'];
  usersContract_userID: Scalars['Int'];
};

export type OfficialUserContractsArchivizeMutationProps = {
  usersContract_ID: Scalars['Int'];
};

export type OfficialUserContractsEditMutationProps = {
  usersContract_ID: Scalars['Int'];
  usersContract_dateFrom: Scalars['String'];
  usersContract_dateTo: Scalars['String'];
  usersContract_number: Scalars['String'];
  usersContract_rateBio: Scalars['Float'];
  usersContract_rateGlass: Scalars['Float'];
  usersContract_rateMixed: Scalars['Float'];
  usersContract_ratePaper: Scalars['Float'];
  usersContract_ratePlastic: Scalars['Float'];
  usersContract_statusID: Scalars['Int'];
};

export type OfficialUserContractsMutation = {
  __typename?: 'OfficialUserContractsMutation';
  add?: Maybe<MutationResponseType>;
  archivize?: Maybe<MutationResponseType>;
  edit?: Maybe<MutationResponseType>;
};


export type OfficialUserContractsMutationAddArgs = {
  props: OfficialUserContractsAddMutationProps;
};


export type OfficialUserContractsMutationArchivizeArgs = {
  props: OfficialUserContractsArchivizeMutationProps;
};


export type OfficialUserContractsMutationEditArgs = {
  props: OfficialUserContractsEditMutationProps;
};

export type OfficialUserInfoApplicationsMutation = {
  __typename?: 'OfficialUserInfoApplicationsMutation';
  verifyEdit?: Maybe<MutationResponseType>;
};


export type OfficialUserInfoApplicationsMutationVerifyEditArgs = {
  props: OfficialEditUserInfoApplicationsVerifyMutationProps;
};

export type OfficialUserInfoEditMutationProps = {
  newPassword?: InputMaybe<Scalars['String']>;
  oldPassword?: InputMaybe<Scalars['String']>;
  users_ID: Scalars['Int'];
  users_identificationNumber: Scalars['String'];
  users_login: Scalars['String'];
  users_name: Scalars['String'];
  users_phoneNumber?: InputMaybe<Scalars['String']>;
  users_statusID: Scalars['Int'];
};

export type OfficialUserInfoGetQueryProps = {
  users_name?: InputMaybe<Scalars['String']>;
};

export type OfficialUserInfoGetQueryResult = {
  __typename?: 'OfficialUserInfoGetQueryResult';
  result?: Maybe<Array<OfficialUserSearchType>>;
};


export type OfficialUserInfoGetQueryResultResultArgs = {
  props?: InputMaybe<OfficialUserInfoGetQueryProps>;
};

export type OfficialUserInfoMutation = {
  __typename?: 'OfficialUserInfoMutation';
  edit?: Maybe<MutationResponseType>;
};


export type OfficialUserInfoMutationEditArgs = {
  props: OfficialUserInfoEditMutationProps;
};

export type OfficialUserInfoQuery = {
  __typename?: 'OfficialUserInfoQuery';
  get?: Maybe<OfficialUserInfoGetQueryResult>;
};


export type OfficialUserInfoQueryGetArgs = {
  props?: InputMaybe<OfficialUserInfoGetQueryProps>;
};

export type OfficialUserSearchType = {
  __typename?: 'OfficialUserSearchType';
  users_ID: Scalars['Int'];
  users_PINnumber?: Maybe<Scalars['String']>;
  users_identificationNumber: Scalars['String'];
  users_login: Scalars['String'];
  users_name: Scalars['String'];
  users_phoneNumber?: Maybe<Scalars['String']>;
  users_statusID: Scalars['Int'];
};

export type PersonalDataApplicationArchiveType = {
  __typename?: 'PersonalDataApplicationArchiveType';
  personalDataApplications_ID: Scalars['Int'];
  personalDataApplications_dateAdded: Scalars['String'];
  personalDataApplications_dateReviewed?: Maybe<Scalars['String']>;
  personalDataApplications_name: Scalars['String'];
  personalDataApplications_reviewedBy?: Maybe<Scalars['Int']>;
  personalDataApplications_statusID: Scalars['Int'];
  personalDataApplications_typeID: Scalars['Int'];
  personalDataApplications_userID: Scalars['Int'];
  personalDataApplications_userIdentificationNumber: Scalars['String'];
  personalDataApplications_userLogin: Scalars['String'];
  personalDataApplications_userName: Scalars['String'];
};

export type PersonalDataApplicationsType = {
  __typename?: 'PersonalDataApplicationsType';
  personalDataApplications_ID: Scalars['Int'];
  personalDataApplications_dateAdded: Scalars['String'];
  personalDataApplications_dateReviewed?: Maybe<Scalars['String']>;
  personalDataApplications_name: Scalars['String'];
  personalDataApplications_oldName: Scalars['String'];
  personalDataApplications_reviewedBy?: Maybe<Scalars['Int']>;
  personalDataApplications_statusID: Scalars['Int'];
  personalDataApplications_typeID: Scalars['Int'];
  personalDataApplications_userID: Scalars['Int'];
};

export type Query = {
  __typename?: 'Query';
  admin?: Maybe<AdminQuery>;
  common?: Maybe<CommonQuery>;
  company?: Maybe<CompanyQuery>;
  official?: Maybe<OfficialQuery>;
  territorialDivision?: Maybe<TerritorialDivisionQuery>;
  user?: Maybe<UserQuery>;
};

export type RateInfoType = {
  __typename?: 'RateInfoType';
  rate_ID: Scalars['Int'];
  rate_dumpsterContractID?: Maybe<Scalars['Int']>;
  rate_statusID: Scalars['Int'];
  rate_typeID: Scalars['Int'];
  rate_userContractID?: Maybe<Scalars['Int']>;
  rate_value: Scalars['Float'];
};

export type RateLogsType = {
  __typename?: 'RateLogsType';
  rateLogs_ID: Scalars['Int'];
  rateLogs_changeDate: Scalars['String'];
  /** Identyfikator użytkownika, który zmienia */
  rateLogs_changeIDUser: Scalars['Int'];
  rateLogs_changeSQL: Scalars['String'];
  /** Identyfikator stawki, której dane są zmieniane */
  rateLogs_rateID: Scalars['Int'];
};

export type RateType = {
  __typename?: 'RateType';
  bio?: Maybe<Scalars['Float']>;
  glass?: Maybe<Scalars['Float']>;
  mixed?: Maybe<Scalars['Float']>;
  paper?: Maybe<Scalars['Float']>;
  plastic?: Maybe<Scalars['Float']>;
};

export enum StatusEnum {
  Blocked = 'Blocked',
  Error = 'Error',
  Success = 'Success',
  WaitingForApproval = 'WaitingForApproval'
}

export type SuperOfficialNewOfficialAddMutationProps = {
  users_identificationNumber: Scalars['String'];
  users_login: Scalars['String'];
  users_name: Scalars['String'];
  users_password: Scalars['String'];
  users_phoneNumber?: InputMaybe<Scalars['String']>;
};

export type SuperOfficialOfficialDeleteMutationProps = {
  users_ID: Scalars['Int'];
};

export type SuperOfficialOfficialEditMutationProps = {
  users_ID: Scalars['Int'];
  users_confirmPassword?: InputMaybe<Scalars['String']>;
  users_identificationNumber: Scalars['String'];
  users_login: Scalars['String'];
  users_name: Scalars['String'];
  users_password?: InputMaybe<Scalars['String']>;
  users_phoneNumber?: InputMaybe<Scalars['String']>;
};

export type SuperOfficialOfficialRestoreMutationProps = {
  users_ID: Scalars['Int'];
};

export type SuperOfficialOfficialsMutation = {
  __typename?: 'SuperOfficialOfficialsMutation';
  add?: Maybe<MutationResponseType>;
  delete?: Maybe<MutationResponseType>;
  edit?: Maybe<MutationResponseType>;
  restore?: Maybe<MutationResponseType>;
};


export type SuperOfficialOfficialsMutationAddArgs = {
  props: SuperOfficialNewOfficialAddMutationProps;
};


export type SuperOfficialOfficialsMutationDeleteArgs = {
  props: SuperOfficialOfficialDeleteMutationProps;
};


export type SuperOfficialOfficialsMutationEditArgs = {
  props: SuperOfficialOfficialEditMutationProps;
};


export type SuperOfficialOfficialsMutationRestoreArgs = {
  props: SuperOfficialOfficialRestoreMutationProps;
};

export type SuperOfficialOfficialsQuery = {
  __typename?: 'SuperOfficialOfficialsQuery';
  get?: Maybe<Array<Maybe<UserInfoType>>>;
};

export type TerritorialCommunitiesGetQueryProps = {
  municipality_ID: Scalars['Int'];
};

export type TerritorialCommunitiesQuery = {
  __typename?: 'TerritorialCommunitiesQuery';
  get?: Maybe<Array<CommunityInfoType>>;
};


export type TerritorialCommunitiesQueryGetArgs = {
  props?: InputMaybe<TerritorialCommunitiesGetQueryProps>;
};

export type TerritorialDivisionFullDataType = {
  __typename?: 'TerritorialDivisionFullDataType';
  community: CommunityInfoType;
  municipality: MunicipalityInfoType;
  voivodeship: VoivodeshipInfoType;
};

export type TerritorialDivisionQuery = {
  __typename?: 'TerritorialDivisionQuery';
  communities?: Maybe<TerritorialCommunitiesQuery>;
  fullData?: Maybe<TerritorialFullDataQuery>;
  municipalities?: Maybe<TerritorialMunicipalitiesQuery>;
  voivodeships?: Maybe<TerritorialVoivodeshipsQuery>;
};

export type TerritorialFullDataGetQueryProps = {
  community_ID: Scalars['Int'];
};

export type TerritorialFullDataQuery = {
  __typename?: 'TerritorialFullDataQuery';
  get: TerritorialDivisionFullDataType;
};


export type TerritorialFullDataQueryGetArgs = {
  props?: InputMaybe<TerritorialFullDataGetQueryProps>;
};

export type TerritorialMunicipalitiesGetQueryProps = {
  voivodeship_ID: Scalars['Int'];
};

export type TerritorialMunicipalitiesQuery = {
  __typename?: 'TerritorialMunicipalitiesQuery';
  get?: Maybe<Array<MunicipalityInfoType>>;
};


export type TerritorialMunicipalitiesQueryGetArgs = {
  props?: InputMaybe<TerritorialMunicipalitiesGetQueryProps>;
};

export type TerritorialVoivodeshipsQuery = {
  __typename?: 'TerritorialVoivodeshipsQuery';
  get?: Maybe<Array<VoivodeshipInfoType>>;
};

export type UserAddressInfoAddMutationProps = {
  usersAddress_apartamentNumber?: InputMaybe<Scalars['String']>;
  usersAddress_city: Scalars['String'];
  usersAddress_communityID: Scalars['Int'];
  usersAddress_houseNumber: Scalars['String'];
  usersAddress_postCode: Scalars['String'];
  usersAddress_street: Scalars['String'];
  usersAddress_typeID: Scalars['Int'];
  usersAddress_userID: Scalars['Int'];
};

export type UserAddressInfoDeleteMutationProps = {
  usersAddress_addressID: Scalars['Int'];
  usersAddress_userID: Scalars['Int'];
};

export type UserAddressInfoEditMutationProps = {
  usersAddress_addressID?: InputMaybe<Scalars['Int']>;
  usersAddress_apartamentNumber?: InputMaybe<Scalars['String']>;
  usersAddress_city: Scalars['String'];
  usersAddress_communityID: Scalars['Int'];
  usersAddress_houseNumber: Scalars['String'];
  usersAddress_postCode: Scalars['String'];
  usersAddress_street: Scalars['String'];
  usersAddress_typeID: Scalars['Int'];
  usersAddress_userID: Scalars['Int'];
};

export type UserAddressInfoMutation = {
  __typename?: 'UserAddressInfoMutation';
  add?: Maybe<MutationResponseType>;
  delete?: Maybe<MutationResponseType>;
  edit?: Maybe<MutationResponseType>;
};


export type UserAddressInfoMutationAddArgs = {
  props: UserAddressInfoAddMutationProps;
};


export type UserAddressInfoMutationDeleteArgs = {
  props: UserAddressInfoDeleteMutationProps;
};


export type UserAddressInfoMutationEditArgs = {
  props: UserAddressInfoEditMutationProps;
};

export type UserAddressInfoQuery = {
  __typename?: 'UserAddressInfoQuery';
  get?: Maybe<Array<UsersAddressType>>;
};

export type UserApplicationCancelMutationProps = {
  applicationCategory: Scalars['String'];
  application_ID: Scalars['Int'];
};

export type UserApplicationCardType = {
  __typename?: 'UserApplicationCardType';
  cardsApplications_ID: Scalars['Int'];
  cardsApplications_dateAdded: Scalars['String'];
  cardsApplications_dateReviewed?: Maybe<Scalars['String']>;
  cardsApplications_statusID: Scalars['Int'];
  cardsApplications_typeID: Scalars['Int'];
  cardsApplications_userID: Scalars['Int'];
};

export type UserApplicationsMutation = {
  __typename?: 'UserApplicationsMutation';
  cancel?: Maybe<MutationResponseType>;
};


export type UserApplicationsMutationCancelArgs = {
  props: UserApplicationCancelMutationProps;
};

export type UserApplicationsQuery = {
  __typename?: 'UserApplicationsQuery';
  get?: Maybe<UserApplicationsType>;
};

export type UserApplicationsType = {
  __typename?: 'UserApplicationsType';
  address: Array<ApplicationAddressType>;
  cards: Array<UserApplicationCardType>;
  dumpsters: Array<NewDumpsterApplicationType>;
  personalData: Array<NewUserInfoType>;
};

export type UserCardQuery = {
  __typename?: 'UserCardQuery';
  cardsAndDumpsters?: Maybe<Array<CardsWithMatchingDumpstersType>>;
  get?: Maybe<Array<UsersCardsType>>;
};

export type UserCardsAddMutationProps = {
  dumpstersIDs: Array<Scalars['Int']>;
  usersCards_numberPIN?: InputMaybe<Scalars['Int']>;
  usersCards_userID: Scalars['Int'];
};

export type UserCardsDeleteMutationProps = {
  usersCards_ID: Scalars['Int'];
};

export type UserCardsMutation = {
  __typename?: 'UserCardsMutation';
  add?: Maybe<MutationResponseType>;
  delete?: Maybe<MutationResponseType>;
};


export type UserCardsMutationAddArgs = {
  props: UserCardsAddMutationProps;
};


export type UserCardsMutationDeleteArgs = {
  props: UserCardsDeleteMutationProps;
};

export type UserChangerType = {
  __typename?: 'UserChangerType';
  userChanger_ID: Scalars['Int'];
  /** ID usera dokonujuącego zmiany */
  userChanger_userID: Scalars['Int'];
  usersLogs?: Maybe<Array<UsersLogsType>>;
};

export type UserContractDumpsterType = {
  __typename?: 'UserContractDumpsterType';
  /** ID of the contract */
  dumpsterContract_ID: Scalars['Int'];
  dumpsterContract_communityID: Scalars['Int'];
  dumpsterContract_dateFrom: Scalars['String'];
  dumpsterContract_dateTo: Scalars['String'];
  dumpsterContract_dumpsterID: Scalars['Int'];
  /** Contract number */
  dumpsterContract_number: Scalars['String'];
  dumpsterContract_statusID: Scalars['Int'];
  rates?: Maybe<RateType>;
};

export type UserContractMainType = {
  __typename?: 'UserContractMainType';
  rates?: Maybe<RateType>;
  usersContract_ID: Scalars['Int'];
  usersContract_communityID: Scalars['Int'];
  usersContract_dateFrom: Scalars['String'];
  usersContract_dateTo: Scalars['String'];
  usersContract_number: Scalars['String'];
  usersContract_statusID: Scalars['Int'];
  usersContract_userID: Scalars['Int'];
};

export type UserContractQuery = {
  __typename?: 'UserContractQuery';
  get: UserContractType;
};

export type UserContractType = {
  __typename?: 'UserContractType';
  housingAssociationContracts?: Maybe<Array<UserContractDumpsterType>>;
  userContracts?: Maybe<Array<UserContractMainType>>;
};

export type UserDumpsterQuery = {
  __typename?: 'UserDumpsterQuery';
  get?: Maybe<Array<DumpsterInfoType>>;
};

export type UserDumpstersAddMutationProps = {
  card_ID: Scalars['Int'];
  dumpster_ID: Scalars['Int'];
  user_ID: Scalars['Int'];
};

export type UserDumpstersDeleteMutationProps = {
  card_ID: Scalars['Int'];
  dumpster_ID: Scalars['Int'];
};

export type UserDumpstersMutation = {
  __typename?: 'UserDumpstersMutation';
  add?: Maybe<MutationResponseType>;
  delete?: Maybe<MutationResponseType>;
};


export type UserDumpstersMutationAddArgs = {
  props: UserDumpstersAddMutationProps;
};


export type UserDumpstersMutationDeleteArgs = {
  props: UserDumpstersDeleteMutationProps;
};

export type UserGarbageGetQueryProps = {
  garbage_endDate: Scalars['String'];
  garbage_startDate: Scalars['String'];
};

export type UserGarbageGetQueryResult = {
  __typename?: 'UserGarbageGetQueryResult';
  result: UserGarbageSummaryQuery;
};


export type UserGarbageGetQueryResultResultArgs = {
  props: UserGarbageGetQueryProps;
};

export type UserGarbageQuery = {
  __typename?: 'UserGarbageQuery';
  get?: Maybe<UserGarbageGetQueryResult>;
};


export type UserGarbageQueryGetArgs = {
  props?: InputMaybe<UserGarbageGetQueryProps>;
};

export type UserGarbageSummaryQuery = {
  __typename?: 'UserGarbageSummaryQuery';
  lineChart: Array<GarbageLineChartType>;
  pieChart: GarbagePieChartType;
};

export type UserIdProps = {
  user_ID: Scalars['Int'];
  user_inputToken: Scalars['String'];
};

export type UserInfoContactsMutationProps = {
  users_login: Scalars['String'];
  users_phoneNumber?: InputMaybe<Scalars['String']>;
};

export type UserInfoMutation = {
  __typename?: 'UserInfoMutation';
  contacts: MutationResponseType;
  password: MutationResponseType;
  pin: MutationResponseType;
  profile: MutationResponseType;
};


export type UserInfoMutationContactsArgs = {
  props: UserInfoContactsMutationProps;
};


export type UserInfoMutationPasswordArgs = {
  props: UserInfoPasswordMutationProps;
};


export type UserInfoMutationPinArgs = {
  props: UserInfoPinMutationProps;
};


export type UserInfoMutationProfileArgs = {
  props: UserInfoProfileMutationProps;
};

export type UserInfoPinMutationProps = {
  new: Scalars['String'];
};

export type UserInfoPasswordMutationProps = {
  new: Scalars['String'];
  old: Scalars['String'];
};

export type UserInfoProfileMutationProps = {
  name: Scalars['String'];
  user_ID: Scalars['Int'];
};

export type UserInfoQuery = {
  __typename?: 'UserInfoQuery';
  get?: Maybe<OfficialSelectedUserDataType>;
  verification?: Maybe<Scalars['Int']>;
};

export type UserInfoType = {
  __typename?: 'UserInfoType';
  addresses: Array<UsersAddressType>;
  users_ID: Scalars['Int'];
  /** PESEL/NIP */
  users_identificationNumber: Scalars['String'];
  /** login/email */
  users_login: Scalars['String'];
  users_name: Scalars['String'];
  users_password: Scalars['String'];
  users_phoneNumber?: Maybe<Scalars['String']>;
  /** ID statusu usera */
  users_statusID: Scalars['Int'];
  /** typ (np. urzędnik) */
  users_typeID: Scalars['Int'];
};

export type UserMutation = {
  __typename?: 'UserMutation';
  addressInfo?: Maybe<UserAddressInfoMutation>;
  applications?: Maybe<UserApplicationsMutation>;
  cards?: Maybe<UserCardsMutation>;
  dumpsters?: Maybe<UserDumpstersMutation>;
  info?: Maybe<UserInfoMutation>;
  passwordRecovery?: Maybe<UserRecoveryMutation>;
};

export type UserQuery = {
  __typename?: 'UserQuery';
  addressInfo?: Maybe<UserAddressInfoQuery>;
  applications?: Maybe<UserApplicationsQuery>;
  card?: Maybe<UserCardQuery>;
  contract?: Maybe<UserContractQuery>;
  dumpster?: Maybe<UserDumpsterQuery>;
  garbage?: Maybe<UserGarbageQuery>;
  info?: Maybe<UserInfoQuery>;
  passwordRecovery?: Maybe<UserRecoveryQuery>;
};

export type UserReceiverType = {
  __typename?: 'UserReceiverType';
  userReceiver_ID: Scalars['Int'];
  /** ID usera, którego dotyczą zmiany */
  userReceiver_userID: Scalars['Int'];
  usersLogs?: Maybe<Array<UsersLogsType>>;
};

export type UserRecoveryMutation = {
  __typename?: 'UserRecoveryMutation';
  get?: Maybe<Scalars['Int']>;
  resetPassword: MutationResponseType;
};


export type UserRecoveryMutationGetArgs = {
  props?: InputMaybe<IsUserExistProps>;
};


export type UserRecoveryMutationResetPasswordArgs = {
  props: ChangePasswordMutationProps;
};

export type UserRecoveryQuery = {
  __typename?: 'UserRecoveryQuery';
  compare?: Maybe<Scalars['Boolean']>;
};


export type UserRecoveryQueryCompareArgs = {
  props: UserIdProps;
};

export type UsersAddressType = {
  __typename?: 'UsersAddressType';
  usersAddress_ID: Scalars['Int'];
  usersAddress_apartamentNumber?: Maybe<Scalars['String']>;
  usersAddress_city: Scalars['String'];
  /** id gminy */
  usersAddress_communityID: Scalars['Int'];
  usersAddress_houseNumber: Scalars['String'];
  usersAddress_postCode: Scalars['String'];
  usersAddress_statusID: Scalars['Int'];
  usersAddress_street: Scalars['String'];
  /** id typu adesu (korespondecyjny, zamieszkania, zameldowania) */
  usersAddress_typeID: Scalars['Int'];
  /** id usera */
  usersAddress_userID: Scalars['Int'];
};

export type UsersCardsType = {
  __typename?: 'UsersCardsType';
  usersCards_ID: Scalars['Int'];
  usersCards_number: Scalars['String'];
  usersCards_numberPIN?: Maybe<Scalars['String']>;
  usersCards_rentedToUserID?: Maybe<Scalars['Int']>;
  /** id statusu karty */
  usersCards_statusID: Scalars['Int'];
  usersCards_userID: Scalars['Int'];
};

export type UsersLogsType = {
  __typename?: 'UsersLogsType';
  usersLogs_ID: Scalars['Int'];
  usersLogs_changeDate: Scalars['String'];
  usersLogs_changeSQL: Scalars['String'];
  /** ID usera dokonujuącego zmiany */
  usersLogs_userChangeID: Scalars['Int'];
  /** ID usera, który jest zmieniany */
  usersLogs_userReceiverID: Scalars['Int'];
};

export type VerificationInfoType = {
  __typename?: 'VerificationInfoType';
  by: Scalars['String'];
  date: Scalars['String'];
};

export type VoivodeshipInfoType = {
  __typename?: 'VoivodeshipInfoType';
  voivodeship_ID: Scalars['Int'];
  voivodeship_description?: Maybe<Scalars['String']>;
  voivodeship_name: Scalars['String'];
};

export type CurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type CurrentUserQuery = { __typename?: 'Query', user?: { __typename?: 'UserQuery', info?: { __typename?: 'UserInfoQuery', get?: { __typename?: 'OfficialSelectedUserDataType', userType: number, basicInfo: { __typename?: 'OfficialUserSearchType', users_ID: number, users_statusID: number, users_name: string, users_identificationNumber: string, users_login: string, users_phoneNumber?: string | null }, addressInfo: Array<{ __typename?: 'UsersAddressType', usersAddress_communityID: number, usersAddress_typeID: number, usersAddress_ID: number, usersAddress_street: string, usersAddress_houseNumber: string, usersAddress_apartamentNumber?: string | null, usersAddress_postCode: string, usersAddress_city: string } | null>, cards: Array<{ __typename?: 'OfficialCardsTypeWDumpstersType', usersCards_ID: number, usersCards_number: string } | null>, dumpsters: Array<{ __typename?: 'DumpsterInfoType', dumpster_ID: number, dumpster_name: string } | null> } | null } | null } | null };

export type AdminCardsOrdersGetQueryVariables = Exact<{ [key: string]: never; }>;


export type AdminCardsOrdersGetQuery = { __typename?: 'Query', admin?: { __typename?: 'AdminQuery', cardsOrders?: { __typename?: 'AdminCardsOrdersQuery', get?: Array<{ __typename?: 'AdminNewOrderType', cardsBulkOrder_ID: number, cardsBulkOrder_statusID: number, cardsBulkOrder_orderDate: string, cardsBulkOrder_numOfCards: number, user: { __typename?: 'AdminUserInfoType', users_name: string } }> | null } | null } | null };

export type AdminCardsOrdersVerifyAddMutationVariables = Exact<{
  props: AdminCardsOrdersVerifyAddMutationProps;
}>;


export type AdminCardsOrdersVerifyAddMutation = { __typename?: 'Mutation', admin?: { __typename?: 'AdminMutation', cardsOrders?: { __typename?: 'AdminCardsOrdersMutation', verifyAdd?: { __typename?: 'MutationResponseType', status: { __typename?: 'MutationResponseStatusType', message: StatusEnum } } | null } | null } | null };

export type AdminDumpstersBinEditMutationVariables = Exact<{
  props: AdminDumpstersBinEditMutationProps;
}>;


export type AdminDumpstersBinEditMutation = { __typename?: 'Mutation', admin?: { __typename?: 'AdminMutation', dumpsters?: { __typename?: 'AdminDumpstersMutation', bin?: { __typename?: 'MutationResponseType', status: { __typename?: 'MutationResponseStatusType', message: StatusEnum } } | null } | null } | null };

export type AdminDumpstersAddMutationVariables = Exact<{
  props: AdminDumpstersAddMutationProps;
}>;


export type AdminDumpstersAddMutation = { __typename?: 'Mutation', admin?: { __typename?: 'AdminMutation', dumpsters?: { __typename?: 'AdminDumpstersMutation', add?: { __typename?: 'MutationResponseType', status: { __typename?: 'MutationResponseStatusType', message: StatusEnum } } | null } | null } | null };

export type AdminDumpstersDeleteMutationVariables = Exact<{
  props: AdminDumpstersDeleteMutationProps;
}>;


export type AdminDumpstersDeleteMutation = { __typename?: 'Mutation', admin?: { __typename?: 'AdminMutation', dumpsters?: { __typename?: 'AdminDumpstersMutation', delete?: { __typename?: 'MutationResponseType', status: { __typename?: 'MutationResponseStatusType', message: StatusEnum } } | null } | null } | null };

export type AdminDumpstersEditMutationVariables = Exact<{
  props: AdminDumpstersEditMutationProps;
}>;


export type AdminDumpstersEditMutation = { __typename?: 'Mutation', admin?: { __typename?: 'AdminMutation', dumpsters?: { __typename?: 'AdminDumpstersMutation', edit?: { __typename?: 'MutationResponseType', status: { __typename?: 'MutationResponseStatusType', message: StatusEnum } } | null } | null } | null };

export type AdminDumpstersGet2QueryVariables = Exact<{ [key: string]: never; }>;


export type AdminDumpstersGet2Query = { __typename?: 'Query', admin?: { __typename?: 'AdminQuery', dumpsters?: { __typename?: 'AdminDumpstersQuery', get?: Array<{ __typename?: 'AdminDumpstersSearchQueryResult', dumpster_ID: number, dumpster_street: string, dumpster_city: string, dumpster_postCode: string, dumpster_communityID: number, dumpster_houseNumbers: string, dumpster_hasError: boolean, dumpster_name: string, dumpster_description?: string | null, bins: Array<{ __typename?: 'DumpsterBinType', dumpsterBin_ID: number, dumpsterBin_typeID: number } | null>, owners: Array<{ __typename?: 'AdminDumpstersOwnerType', users_name: string, users_ID: number } | null> }> | null } | null } | null };

export type AdminOwnersAddMutationVariables = Exact<{
  props: AdminOwnersAddMutationProps;
}>;


export type AdminOwnersAddMutation = { __typename?: 'Mutation', admin?: { __typename?: 'AdminMutation', owners?: { __typename?: 'AdminOwnersMutation', add?: { __typename?: 'MutationResponseType', status: { __typename?: 'MutationResponseStatusType', message: StatusEnum } } | null } | null } | null };

export type AdminOfficialsAddMutationVariables = Exact<{
  props: AdminNewOfficialAddMutationProps;
}>;


export type AdminOfficialsAddMutation = { __typename?: 'Mutation', admin?: { __typename?: 'AdminMutation', officials?: { __typename?: 'AdminOfficialsMutation', add?: { __typename?: 'MutationResponseType', status: { __typename?: 'MutationResponseStatusType', message: StatusEnum, description?: string | null } } | null } | null } | null };

export type AdminOwnersDeleteMutationVariables = Exact<{
  props: AdminOwnersDeleteMutationProps;
}>;


export type AdminOwnersDeleteMutation = { __typename?: 'Mutation', admin?: { __typename?: 'AdminMutation', owners?: { __typename?: 'AdminOwnersMutation', delete?: { __typename?: 'MutationResponseType', status: { __typename?: 'MutationResponseStatusType', message: StatusEnum } } | null } | null } | null };

export type AdminChangePasswordMutationVariables = Exact<{
  props: AdminChangeOfficialAndSuperOfficialChangePasswordProps;
}>;


export type AdminChangePasswordMutation = { __typename?: 'Mutation', admin?: { __typename?: 'AdminMutation', officials?: { __typename?: 'AdminOfficialsMutation', changePassword?: { __typename?: 'MutationResponseType', status: { __typename?: 'MutationResponseStatusType', message: StatusEnum } } | null } | null } | null };

export type AdminOfficialsDeleteMutationVariables = Exact<{
  props: AdminOfficialsDeleteMutationProps;
}>;


export type AdminOfficialsDeleteMutation = { __typename?: 'Mutation', admin?: { __typename?: 'AdminMutation', officials?: { __typename?: 'AdminOfficialsMutation', delete?: { __typename?: 'MutationResponseType', status: { __typename?: 'MutationResponseStatusType', message: StatusEnum } } | null } | null } | null };

export type AdminOfficialsGetQueryVariables = Exact<{ [key: string]: never; }>;


export type AdminOfficialsGetQuery = { __typename?: 'Query', admin?: { __typename?: 'AdminQuery', officials?: { __typename?: 'AdminOfficialsQuery', get?: Array<{ __typename?: 'AdminUserInfoType', users_ID: number, users_identificationNumber: string, users_phoneNumber?: string | null, users_typeID: number, users_statusID: number, users_name: string, users_login: string, addresses: Array<{ __typename?: 'AdminUserAddressType', usersAddress_street: string, usersAddress_houseNumber: string, usersAddress_city: string }> }> | null } | null } | null };

export type UserGarbageGetQueryVariables = Exact<{
  props: UserGarbageGetQueryProps;
}>;


export type UserGarbageGetQuery = { __typename?: 'Query', user?: { __typename?: 'UserQuery', garbage?: { __typename?: 'UserGarbageQuery', get?: { __typename?: 'UserGarbageGetQueryResult', result: { __typename?: 'UserGarbageSummaryQuery', pieChart: { __typename?: 'GarbagePieChartType', total: number, garbageTypes: Array<{ __typename?: 'GarbageSummaryByTypesType', color: string, mass: number, type: string, typeID?: number | null }> }, lineChart: Array<{ __typename?: 'GarbageLineChartType', garbage_sum: number, garbage_typeID: number, month: string, monthIndex: number, waste_name: string, garbage_fullDate: string }> } } | null } | null } | null };

export type TerritorialDivisonMunicipalitiesQueryVariables = Exact<{
  props: TerritorialMunicipalitiesGetQueryProps;
}>;


export type TerritorialDivisonMunicipalitiesQuery = { __typename?: 'Query', territorialDivision?: { __typename?: 'TerritorialDivisionQuery', municipalities?: { __typename?: 'TerritorialMunicipalitiesQuery', get?: Array<{ __typename?: 'MunicipalityInfoType', municipality_ID: number, municipality_name: string, municipality_description: string, municipality_voivodeshipID: number }> | null } | null } | null };

export type TerritorialDivisonCommunitiesQueryVariables = Exact<{
  props: TerritorialCommunitiesGetQueryProps;
}>;


export type TerritorialDivisonCommunitiesQuery = { __typename?: 'Query', territorialDivision?: { __typename?: 'TerritorialDivisionQuery', communities?: { __typename?: 'TerritorialCommunitiesQuery', get?: Array<{ __typename?: 'CommunityInfoType', community_ID: number, community_name: string, community_description: string, community_municipalityID: number, community_voivodeshipID: number }> | null } | null } | null };

export type CompanyCardsAddMutationVariables = Exact<{
  props: CompanyCardsAddMutationProps;
}>;


export type CompanyCardsAddMutation = { __typename?: 'Mutation', company?: { __typename?: 'CompanyMutation', cards?: { __typename?: 'CompanyCardsMutation', add?: { __typename?: 'MutationResponseType', status: { __typename?: 'MutationResponseStatusType', message: StatusEnum } } | null } | null } | null };

export type CompanyCardsGetQueryVariables = Exact<{ [key: string]: never; }>;


export type CompanyCardsGetQuery = { __typename?: 'Query', company?: { __typename?: 'CompanyQuery', cards?: { __typename?: 'CompanyCardsQuery', get?: Array<{ __typename?: 'CardsBulkOrderType', cardsBulkOrder_ID: number, cardsBulkOrder_userID: number, cardsBulkOrder_numOfCards: number, cardsBulkOrder_statusID: number, cardsBulkOrder_orderDate: string }> | null } | null } | null };

export type CompanyOccupantsGetsQueryVariables = Exact<{ [key: string]: never; }>;


export type CompanyOccupantsGetsQuery = { __typename?: 'Query', company?: { __typename?: 'CompanyQuery', occupants?: { __typename?: 'CompanyOccupantsQuery', get?: Array<{ __typename?: 'CompanyUserType', users_ID: number, users_login: string, users_name: string, users_identificationNumber: string, users_phoneNumber?: string | null, users_statusID: number, connection_ID?: number | null, addresses?: Array<{ __typename?: 'UsersAddressType', usersAddress_ID: number, usersAddress_userID: number, usersAddress_street: string, usersAddress_houseNumber: string, usersAddress_apartamentNumber?: string | null, usersAddress_postCode: string, usersAddress_city: string, usersAddress_typeID: number, usersAddress_communityID: number, usersAddress_statusID: number } | null> | null }> | null } | null } | null };

export type CompanyCardsRentAddMutationVariables = Exact<{
  props: CompanyCardsRentAddMutationProps;
}>;


export type CompanyCardsRentAddMutation = { __typename?: 'Mutation', company?: { __typename?: 'CompanyMutation', cardsRent?: { __typename?: 'CompanyCardsRentMutation', add?: { __typename?: 'MutationResponseType', status: { __typename?: 'MutationResponseStatusType', message: StatusEnum } } | null } | null } | null };

export type CompanyCardsRentDeleteMutationVariables = Exact<{
  props: CompanyCardsRentDeleteMutationProps;
}>;


export type CompanyCardsRentDeleteMutation = { __typename?: 'Mutation', company?: { __typename?: 'CompanyMutation', cardsRent?: { __typename?: 'CompanyCardsRentMutation', delete?: { __typename?: 'MutationResponseType', status: { __typename?: 'MutationResponseStatusType', message: StatusEnum } } | null } | null } | null };

export type CommonUserGetQueryVariables = Exact<{
  props: CommonUserDataGetQueryProps;
}>;


export type CommonUserGetQuery = { __typename?: 'Query', common?: { __typename?: 'CommonQuery', user?: { __typename?: 'CommonUserQuery', get: { __typename?: 'CommonUserDataGetQueryType', basicInfo: { __typename?: 'BasicInfoType', users_ID: number, users_login: string, users_name: string, users_identificationNumber: string, users_phoneNumber?: string | null, users_statusID: number } } } | null } | null };

export type OfficialContractsAddMutationVariables = Exact<{
  props: OfficialContractsAddMutationProps;
}>;


export type OfficialContractsAddMutation = { __typename?: 'Mutation', official?: { __typename?: 'OfficialMutation', contracts?: { __typename?: 'OfficialContractsMutation', add?: { __typename?: 'MutationResponseType', status: { __typename?: 'MutationResponseStatusType', message: StatusEnum } } | null } | null } | null };

export type OfficialContractsArchivizeMutationVariables = Exact<{
  props: OfficialContractsArchivizeMutationProps;
}>;


export type OfficialContractsArchivizeMutation = { __typename?: 'Mutation', official?: { __typename?: 'OfficialMutation', contracts?: { __typename?: 'OfficialContractsMutation', archivize?: { __typename?: 'MutationResponseType', status: { __typename?: 'MutationResponseStatusType', message: StatusEnum } } | null } | null } | null };

export type OfficialContractsEditMutationVariables = Exact<{
  props: OfficialContractsEditMutationProps;
}>;


export type OfficialContractsEditMutation = { __typename?: 'Mutation', official?: { __typename?: 'OfficialMutation', contracts?: { __typename?: 'OfficialContractsMutation', edit?: { __typename?: 'MutationResponseType', status: { __typename?: 'MutationResponseStatusType', message: StatusEnum } } | null } | null } | null };

export type OfficialRatesAddMutationVariables = Exact<{
  props: OfficialRatesAddMutationProps;
}>;


export type OfficialRatesAddMutation = { __typename?: 'Mutation', official?: { __typename?: 'OfficialMutation', rates?: { __typename?: 'OfficialRatesMutation', add?: { __typename?: 'MutationResponseType', status: { __typename?: 'MutationResponseStatusType', message: StatusEnum } } | null } | null } | null };

export type OfficialRatesDeleteMutationVariables = Exact<{
  props: OfficialRatesDeleteMutationProps;
}>;


export type OfficialRatesDeleteMutation = { __typename?: 'Mutation', official?: { __typename?: 'OfficialMutation', rates?: { __typename?: 'OfficialRatesMutation', delete?: { __typename?: 'MutationResponseType', status: { __typename?: 'MutationResponseStatusType', message: StatusEnum } } | null } | null } | null };

export type OfficialRatesEditMutationVariables = Exact<{
  props: OfficialRatesEditMutationProps;
}>;


export type OfficialRatesEditMutation = { __typename?: 'Mutation', official?: { __typename?: 'OfficialMutation', rates?: { __typename?: 'OfficialRatesMutation', edit?: { __typename?: 'MutationResponseType', status: { __typename?: 'MutationResponseStatusType', message: StatusEnum } } | null } | null } | null };

export type CompanyOccupantsDeleteMutationVariables = Exact<{
  props: CompanyOccupantsDeleteMutationProps;
}>;


export type CompanyOccupantsDeleteMutation = { __typename?: 'Mutation', company?: { __typename?: 'CompanyMutation', occupants?: { __typename?: 'CompanyOccupantsMutation', delete?: { __typename?: 'MutationResponseType', status: { __typename?: 'MutationResponseStatusType', message: StatusEnum } } | null } | null } | null };

export type OfficialUserGetsQueryVariables = Exact<{
  props: OfficialUserInfoGetQueryProps;
}>;


export type OfficialUserGetsQuery = { __typename?: 'Query', official?: { __typename?: 'OfficialQuery', users?: { __typename?: 'OfficialUserInfoQuery', get?: { __typename?: 'OfficialUserInfoGetQueryResult', result?: Array<{ __typename?: 'OfficialUserSearchType', users_ID: number, users_login: string, users_name: string, users_identificationNumber: string, users_phoneNumber?: string | null, users_statusID: number }> | null } | null } | null } | null };

export type CompanyOccupantsAddMutationVariables = Exact<{
  props: CompanyOccupantsAddMutationProps;
}>;


export type CompanyOccupantsAddMutation = { __typename?: 'Mutation', company?: { __typename?: 'CompanyMutation', occupants?: { __typename?: 'CompanyOccupantsMutation', add?: { __typename?: 'MutationResponseType', status: { __typename?: 'MutationResponseStatusType', message: StatusEnum } } | null } | null } | null };

export type CompanyAddressAddMutationVariables = Exact<{
  props: CompanyAddressAddMutationProps;
}>;


export type CompanyAddressAddMutation = { __typename?: 'Mutation', company?: { __typename?: 'CompanyMutation', addresses?: { __typename?: 'CompanyAddressMutation', add?: { __typename?: 'MutationResponseType', status: { __typename?: 'MutationResponseStatusType', message: StatusEnum } } | null } | null } | null };

export type CompanyAddressDeleteMutationVariables = Exact<{
  props: CompanyAddressDeleteMutationProps;
}>;


export type CompanyAddressDeleteMutation = { __typename?: 'Mutation', company?: { __typename?: 'CompanyMutation', addresses?: { __typename?: 'CompanyAddressMutation', delete?: { __typename?: 'MutationResponseType', status: { __typename?: 'MutationResponseStatusType', message: StatusEnum } } | null } | null } | null };

export type CompanyAddressEditMutationVariables = Exact<{
  props: CompanyAddressEditMutationProps;
}>;


export type CompanyAddressEditMutation = { __typename?: 'Mutation', company?: { __typename?: 'CompanyMutation', addresses?: { __typename?: 'CompanyAddressMutation', edit?: { __typename?: 'MutationResponseType', status: { __typename?: 'MutationResponseStatusType', message: StatusEnum } } | null } | null } | null };

export type TerritorialDivisonFullData2QueryVariables = Exact<{
  props: TerritorialFullDataGetQueryProps;
}>;


export type TerritorialDivisonFullData2Query = { __typename?: 'Query', territorialDivision?: { __typename?: 'TerritorialDivisionQuery', fullData?: { __typename?: 'TerritorialFullDataQuery', get: { __typename?: 'TerritorialDivisionFullDataType', community: { __typename?: 'CommunityInfoType', community_ID: number, community_name: string }, voivodeship: { __typename?: 'VoivodeshipInfoType', voivodeship_ID: number, voivodeship_name: string }, municipality: { __typename?: 'MunicipalityInfoType', municipality_ID: number, municipality_name: string } } } | null } | null };

export type CompanyOccupantsGetQueryVariables = Exact<{ [key: string]: never; }>;


export type CompanyOccupantsGetQuery = { __typename?: 'Query', company?: { __typename?: 'CompanyQuery', addresses?: { __typename?: 'CompanyAddressQuery', get?: Array<{ __typename?: 'UsersAddressType', usersAddress_ID: number, usersAddress_userID: number, usersAddress_street: string, usersAddress_houseNumber: string, usersAddress_apartamentNumber?: string | null, usersAddress_postCode: string, usersAddress_city: string, usersAddress_typeID: number, usersAddress_communityID: number, usersAddress_statusID: number }> | null } | null } | null };

export type CompanyProfileUpdateMutationVariables = Exact<{
  props: CompanyInfoProfileMutationProps;
}>;


export type CompanyProfileUpdateMutation = { __typename?: 'Mutation', company?: { __typename?: 'CompanyMutation', info?: { __typename?: 'CompanyInfoMutation', profile: { __typename?: 'MutationResponseType', status: { __typename?: 'MutationResponseStatusType', message: StatusEnum } } } | null } | null };

export type CompanyGarbageGetQueryVariables = Exact<{
  props: CompanyGarbageGetQueryProps;
}>;


export type CompanyGarbageGetQuery = { __typename?: 'Query', company?: { __typename?: 'CompanyQuery', garbage?: { __typename?: 'CompanyGarbageQuery', get?: Array<{ __typename?: 'CompanyGarbageType', dumpsterID: number, garbage: { __typename?: 'RateType', paper?: number | null, glass?: number | null, bio?: number | null, plastic?: number | null, mixed?: number | null } }> | null } | null } | null };

export type CompanyDumpstersGetQueryVariables = Exact<{ [key: string]: never; }>;


export type CompanyDumpstersGetQuery = { __typename?: 'Query', company?: { __typename?: 'CompanyQuery', dumpsters?: { __typename?: 'CompanyDumpstersQuery', get?: Array<{ __typename?: 'DumpsterInfoType', dumpster_ID: number, dumpster_name: string, dumpster_description?: string | null, dumpster_street: string, dumpster_city: string, dumpster_postCode: string, dumpster_communityID: number, dumpster_houseNumbers: string, dumpster_hasError: boolean, contracts: Array<{ __typename?: 'ContractType', dumpsterContract_ID: number, dumpsterContract_number: string, dumpsterContract_dumpsterID: number, dumpsterContract_dateFrom: string, dumpsterContract_dateTo: string, dumpsterContract_statusID: number, dumpsterContract_communityID: number, rates?: Array<{ __typename?: 'RateInfoType', rate_ID: number, rate_value: number, rate_dumpsterContractID?: number | null, rate_typeID: number, rate_statusID: number, rate_userContractID?: number | null } | null> | null } | null>, bins: Array<{ __typename?: 'DumpsterBinType', dumpsterBin_ID: number, dumpsterBin_dumpsterID: number, dumpsterBin_isFull: boolean, dumpsterBin_typeID: number } | null> }> | null } | null } | null };

export type OfficialBinGetQueryVariables = Exact<{
  props: OfficialBinGetQueryProps;
}>;


export type OfficialBinGetQuery = { __typename?: 'Query', official?: { __typename?: 'OfficialQuery', bins?: { __typename?: 'OfficialBinsQuery', get?: { __typename?: 'DumpsterBinType', dumpsterBin_ID: number, dumpsterBin_dumpsterID: number, dumpsterBin_isFull: boolean, dumpsterBin_typeID: number } | null } | null } | null };

export type LoginMutationVariables = Exact<{
  props: AuthLoginMutationProps;
}>;


export type LoginMutation = { __typename?: 'Mutation', auth?: { __typename?: 'AuthMutation', login: { __typename?: 'MutationResponseType', status: { __typename?: 'MutationResponseStatusType', message: StatusEnum } } } | null };

export type ChangePasswordMutationMutationVariables = Exact<{
  props: ChangePasswordMutationProps;
}>;


export type ChangePasswordMutationMutation = { __typename?: 'Mutation', user?: { __typename?: 'UserMutation', passwordRecovery?: { __typename?: 'UserRecoveryMutation', resetPassword: { __typename?: 'MutationResponseType', status: { __typename?: 'MutationResponseStatusType', message: StatusEnum } } } | null } | null };

export type UserRecoveryTokenQueryQueryVariables = Exact<{
  props: UserIdProps;
}>;


export type UserRecoveryTokenQueryQuery = { __typename?: 'Query', user?: { __typename?: 'UserQuery', passwordRecovery?: { __typename?: 'UserRecoveryQuery', compare?: boolean | null } | null } | null };

export type IsUserExistMutationVariables = Exact<{
  props: IsUserExistProps;
}>;


export type IsUserExistMutation = { __typename?: 'Mutation', user?: { __typename?: 'UserMutation', passwordRecovery?: { __typename?: 'UserRecoveryMutation', get?: number | null } | null } | null };

export type CreateUserMutationVariables = Exact<{
  props: AuthRegisterMutationProps;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', auth?: { __typename?: 'AuthMutation', register: { __typename?: 'MutationResponseType', status: { __typename?: 'MutationResponseStatusType', message: StatusEnum } } } | null };

export type OfficialCreateUserAddMutationVariables = Exact<{
  props: OfficialCreateUserAddMutationProps;
}>;


export type OfficialCreateUserAddMutation = { __typename?: 'Mutation', official?: { __typename?: 'OfficialMutation', createUser?: { __typename?: 'OfficialCreateUserMutation', add: { __typename?: 'MutationResponseType', status: { __typename?: 'MutationResponseStatusType', message: StatusEnum } } } | null } | null };

export type OfficialCardsApplicationsVerifyMutationVariables = Exact<{
  props: OfficialCardsApplicationsVerifyMutationProps;
}>;


export type OfficialCardsApplicationsVerifyMutation = { __typename?: 'Mutation', official?: { __typename?: 'OfficialMutation', applications?: { __typename?: 'OfficialApplicationsMutation', cards?: { __typename?: 'OfficialCardsApplicationsMutation', verify?: { __typename?: 'MutationResponseType', status: { __typename?: 'MutationResponseStatusType', message: StatusEnum } } | null } | null } | null } | null };

export type OfficialAddressInfoApplicationsVerifyDeleteMutationVariables = Exact<{
  props: OfficialDeleteAddressInfoApplicationsVerifyMutationProps;
}>;


export type OfficialAddressInfoApplicationsVerifyDeleteMutation = { __typename?: 'Mutation', official?: { __typename?: 'OfficialMutation', applications?: { __typename?: 'OfficialApplicationsMutation', addressInfo?: { __typename?: 'OfficialAddressInfoApplicationsMutation', verifyDelete?: { __typename?: 'MutationResponseType', status: { __typename?: 'MutationResponseStatusType', message: StatusEnum } } | null } | null } | null } | null };

export type OfficialDumpstersApplicationsVerifyAddMutationVariables = Exact<{
  props: OfficialAddDumpstersApplicationsVerifyMutationProps;
}>;


export type OfficialDumpstersApplicationsVerifyAddMutation = { __typename?: 'Mutation', official?: { __typename?: 'OfficialMutation', applications?: { __typename?: 'OfficialApplicationsMutation', dumpsters?: { __typename?: 'OfficialDumpstersApplicationsMutation', verifyAdd?: { __typename?: 'MutationResponseType', status: { __typename?: 'MutationResponseStatusType', message: StatusEnum } } | null } | null } | null } | null };

export type OfficialAddressInfoApplicationsVerifyEditMutationVariables = Exact<{
  props: OfficialEditAddressInfoApplicationsVerifyMutationProps;
}>;


export type OfficialAddressInfoApplicationsVerifyEditMutation = { __typename?: 'Mutation', official?: { __typename?: 'OfficialMutation', applications?: { __typename?: 'OfficialApplicationsMutation', addressInfo?: { __typename?: 'OfficialAddressInfoApplicationsMutation', verifyEdit?: { __typename?: 'MutationResponseType', status: { __typename?: 'MutationResponseStatusType', message: StatusEnum } } | null } | null } | null } | null };

export type OfficialUserInfoApplicationsVerifyEditMutationVariables = Exact<{
  props: OfficialEditUserInfoApplicationsVerifyMutationProps;
}>;


export type OfficialUserInfoApplicationsVerifyEditMutation = { __typename?: 'Mutation', official?: { __typename?: 'OfficialMutation', applications?: { __typename?: 'OfficialApplicationsMutation', userInfo?: { __typename?: 'OfficialUserInfoApplicationsMutation', verifyEdit?: { __typename?: 'MutationResponseType', status: { __typename?: 'MutationResponseStatusType', message: StatusEnum } } | null } | null } | null } | null };

export type OfficialAddressInfoApplicationsVerifyAddMutationVariables = Exact<{
  props: OfficialAddAddressInfoApplicationsVerifyMutationProps;
}>;


export type OfficialAddressInfoApplicationsVerifyAddMutation = { __typename?: 'Mutation', official?: { __typename?: 'OfficialMutation', applications?: { __typename?: 'OfficialApplicationsMutation', addressInfo?: { __typename?: 'OfficialAddressInfoApplicationsMutation', verifyAdd?: { __typename?: 'MutationResponseType', status: { __typename?: 'MutationResponseStatusType', message: StatusEnum } } | null } | null } | null } | null };

export type OfficialNewUserApplicationVerifyMutationVariables = Exact<{
  props: OfficialNewUserApplicationVerifyMutationProps;
}>;


export type OfficialNewUserApplicationVerifyMutation = { __typename?: 'Mutation', official?: { __typename?: 'OfficialMutation', applications?: { __typename?: 'OfficialApplicationsMutation', newUser?: { __typename?: 'OfficialNewUserApplicationMutation', verify?: { __typename?: 'MutationResponseType', status: { __typename?: 'MutationResponseStatusType', message: StatusEnum } } | null } | null } | null } | null };

export type OfficialDumpstersGetQueryVariables = Exact<{ [key: string]: never; }>;


export type OfficialDumpstersGetQuery = { __typename?: 'Query', official?: { __typename?: 'OfficialQuery', dumpsters?: { __typename?: 'OfficialDumpstersQuery', get?: Array<{ __typename?: 'DumpsterInfoType', dumpster_ID: number, dumpster_name: string, dumpster_description?: string | null, dumpster_street: string, dumpster_city: string, dumpster_postCode: string, dumpster_communityID: number, dumpster_houseNumbers: string, dumpster_hasError: boolean, bins: Array<{ __typename?: 'DumpsterBinType', dumpsterBin_typeID: number, dumpsterBin_isFull: boolean } | null>, contracts: Array<{ __typename?: 'ContractType', dumpsterContract_dateTo: string, dumpsterContract_ID: number, dumpsterContract_number: string, dumpsterContract_dateFrom: string, dumpsterContract_statusID: number, dumpsterContract_dumpsterID: number, rates?: Array<{ __typename?: 'RateInfoType', rate_ID: number, rate_typeID: number, rate_value: number, rate_statusID: number } | null> | null } | null> }> | null } | null } | null };

export type OfficialUserInfoEditMutationVariables = Exact<{
  props: OfficialUserInfoEditMutationProps;
}>;


export type OfficialUserInfoEditMutation = { __typename?: 'Mutation', official?: { __typename?: 'OfficialMutation', info?: { __typename?: 'OfficialUserInfoMutation', edit?: { __typename?: 'MutationResponseType', status: { __typename?: 'MutationResponseStatusType', message: StatusEnum } } | null } | null } | null };

export type OfficialAddressInfoAddMutationVariables = Exact<{
  props: OfficialAddressInfoAddMutationProps;
}>;


export type OfficialAddressInfoAddMutation = { __typename?: 'Mutation', official?: { __typename?: 'OfficialMutation', address?: { __typename?: 'OfficialAddressInfoMutation', add?: { __typename?: 'MutationResponseType', status: { __typename?: 'MutationResponseStatusType', message: StatusEnum } } | null } | null } | null };

export type OfficialCardsAddMutationVariables = Exact<{
  props: OfficialCardsAddMutationProps;
}>;


export type OfficialCardsAddMutation = { __typename?: 'Mutation', official?: { __typename?: 'OfficialMutation', cards?: { __typename?: 'OfficialCardsMutation', add?: { __typename?: 'MutationResponseType', status: { __typename?: 'MutationResponseStatusType', message: StatusEnum } } | null } | null } | null };

export type OfficialUserContractsAddMutationVariables = Exact<{
  props: OfficialUserContractsAddMutationProps;
}>;


export type OfficialUserContractsAddMutation = { __typename?: 'Mutation', official?: { __typename?: 'OfficialMutation', userContracts?: { __typename?: 'OfficialUserContractsMutation', add?: { __typename?: 'MutationResponseType', status: { __typename?: 'MutationResponseStatusType', message: StatusEnum } } | null } | null } | null };

export type OfficialUsersDeleteMutationVariables = Exact<{
  props: OfficialDeleteUserMutationProps;
}>;


export type OfficialUsersDeleteMutation = { __typename?: 'Mutation', official?: { __typename?: 'OfficialMutation', users?: { __typename?: 'OfficialDeleteUserMutation', delete?: { __typename?: 'MutationResponseType', status: { __typename?: 'MutationResponseStatusType', message: StatusEnum } } | null } | null } | null };

export type OfficialAddressInfoDeleteMutationVariables = Exact<{
  props: OfficialAddressInfoDeleteMutationProps;
}>;


export type OfficialAddressInfoDeleteMutation = { __typename?: 'Mutation', official?: { __typename?: 'OfficialMutation', address?: { __typename?: 'OfficialAddressInfoMutation', delete?: { __typename?: 'MutationResponseType', status: { __typename?: 'MutationResponseStatusType', message: StatusEnum, description?: string | null } } | null } | null } | null };

export type OfficialAddressInfoEditMutationVariables = Exact<{
  props: OfficialAddressInfoEditMutationProps;
}>;


export type OfficialAddressInfoEditMutation = { __typename?: 'Mutation', official?: { __typename?: 'OfficialMutation', address?: { __typename?: 'OfficialAddressInfoMutation', edit?: { __typename?: 'MutationResponseType', status: { __typename?: 'MutationResponseStatusType', message: StatusEnum } } | null } | null } | null };

export type OfficialDumpstersAddMutationVariables = Exact<{
  props: OfficialDumpstersAddMutationProps;
}>;


export type OfficialDumpstersAddMutation = { __typename?: 'Mutation', official?: { __typename?: 'OfficialMutation', dumpsters?: { __typename?: 'OfficialDumpstersMutation', add?: { __typename?: 'MutationResponseType', status: { __typename?: 'MutationResponseStatusType', message: StatusEnum } } | null } | null } | null };

export type CommonDumpstersGet1QueryVariables = Exact<{
  props: CommonDumpstersGetQueryProps;
}>;


export type CommonDumpstersGet1Query = { __typename?: 'Query', common?: { __typename?: 'CommonQuery', dumpsters?: { __typename?: 'CommonDumpstersQuery', get?: Array<{ __typename?: 'CommonDumpstersInfoType', dumpster_ID: number, dumpster_name: string, dumpster_description?: string | null, dumpster_street: string, dumpster_city: string, dumpster_postCode: string, dumpster_communityID: number, dumpster_houseNumbers: string, dumpster_hasError: boolean }> | null } | null } | null };

export type OfficialDumpstersDeleteMutationVariables = Exact<{
  props: OfficialDumpstersDeleteMutationProps;
}>;


export type OfficialDumpstersDeleteMutation = { __typename?: 'Mutation', official?: { __typename?: 'OfficialMutation', dumpsters?: { __typename?: 'OfficialDumpstersMutation', delete?: { __typename?: 'MutationResponseType', status: { __typename?: 'MutationResponseStatusType', message: StatusEnum } } | null } | null } | null };

export type OfficialCardsEditMutationVariables = Exact<{
  props: OfficialCardsEditMutationProps;
}>;


export type OfficialCardsEditMutation = { __typename?: 'Mutation', official?: { __typename?: 'OfficialMutation', cards?: { __typename?: 'OfficialCardsMutation', edit?: { __typename?: 'MutationResponseType', status: { __typename?: 'MutationResponseStatusType', message: StatusEnum } } | null } | null } | null };

export type OfficialUserContractsArchivizeMutationVariables = Exact<{
  props: OfficialUserContractsArchivizeMutationProps;
}>;


export type OfficialUserContractsArchivizeMutation = { __typename?: 'Mutation', official?: { __typename?: 'OfficialMutation', userContracts?: { __typename?: 'OfficialUserContractsMutation', archivize?: { __typename?: 'MutationResponseType', status: { __typename?: 'MutationResponseStatusType', message: StatusEnum } } | null } | null } | null };

export type OfficialUserContractsEditMutationVariables = Exact<{
  props: OfficialUserContractsEditMutationProps;
}>;


export type OfficialUserContractsEditMutation = { __typename?: 'Mutation', official?: { __typename?: 'OfficialMutation', userContracts?: { __typename?: 'OfficialUserContractsMutation', edit?: { __typename?: 'MutationResponseType', status: { __typename?: 'MutationResponseStatusType', message: StatusEnum } } | null } | null } | null };

export type SuperOfficialOfficialAddMutationVariables = Exact<{
  props: SuperOfficialNewOfficialAddMutationProps;
}>;


export type SuperOfficialOfficialAddMutation = { __typename?: 'Mutation', official?: { __typename?: 'OfficialMutation', officials?: { __typename?: 'SuperOfficialOfficialsMutation', add?: { __typename?: 'MutationResponseType', status: { __typename?: 'MutationResponseStatusType', message: StatusEnum, description?: string | null } } | null } | null } | null };

export type SuperOfficialOfficialDeleteMutationVariables = Exact<{
  props: SuperOfficialOfficialDeleteMutationProps;
}>;


export type SuperOfficialOfficialDeleteMutation = { __typename?: 'Mutation', official?: { __typename?: 'OfficialMutation', officials?: { __typename?: 'SuperOfficialOfficialsMutation', delete?: { __typename?: 'MutationResponseType', status: { __typename?: 'MutationResponseStatusType', message: StatusEnum } } | null } | null } | null };

export type SuperOfficialOfficialEditMutationVariables = Exact<{
  props: SuperOfficialOfficialEditMutationProps;
}>;


export type SuperOfficialOfficialEditMutation = { __typename?: 'Mutation', official?: { __typename?: 'OfficialMutation', officials?: { __typename?: 'SuperOfficialOfficialsMutation', edit?: { __typename?: 'MutationResponseType', status: { __typename?: 'MutationResponseStatusType', message: StatusEnum } } | null } | null } | null };

export type SuperOfficialOfficialsGetQueryVariables = Exact<{ [key: string]: never; }>;


export type SuperOfficialOfficialsGetQuery = { __typename?: 'Query', official?: { __typename?: 'OfficialQuery', officials?: { __typename?: 'SuperOfficialOfficialsQuery', get?: Array<{ __typename?: 'UserInfoType', users_ID: number, users_login: string, users_name: string, users_identificationNumber: string, users_phoneNumber?: string | null, users_typeID: number, users_statusID: number, addresses: Array<{ __typename?: 'UsersAddressType', usersAddress_ID: number, usersAddress_userID: number, usersAddress_street: string, usersAddress_houseNumber: string, usersAddress_apartamentNumber?: string | null, usersAddress_postCode: string, usersAddress_city: string, usersAddress_typeID: number, usersAddress_communityID: number, usersAddress_statusID: number }> } | null> | null } | null } | null };

export type SuperOfficialOfficialRestoreMutationVariables = Exact<{
  props: SuperOfficialOfficialRestoreMutationProps;
}>;


export type SuperOfficialOfficialRestoreMutation = { __typename?: 'Mutation', official?: { __typename?: 'OfficialMutation', officials?: { __typename?: 'SuperOfficialOfficialsMutation', restore?: { __typename?: 'MutationResponseType', status: { __typename?: 'MutationResponseStatusType', message: StatusEnum } } | null } | null } | null };

export type OfficialApplicationsArchiveGetQueryVariables = Exact<{ [key: string]: never; }>;


export type OfficialApplicationsArchiveGetQuery = { __typename?: 'Query', official?: { __typename?: 'OfficialQuery', applications?: { __typename?: 'OfficialApplicationsQuery', archive?: { __typename?: 'OfficialApplicationsArchiveQuery', get: { __typename?: 'ApplicationArchiveType', addressApplications: Array<{ __typename?: 'AddressApplicationArchiveType', addressApplications_ID: number, addressApplications_typeID: number, addressApplications_addressTypeID: number, addressApplications_userName: string, addressApplications_statusID: number, addressApplications_dateAdded: string, addressApplications_userLogin: string, addressApplications_userIdentificationNumber: string, addressApplications_street: string, addressApplications_houseNumber: string, addressApplications_apartamentNumber?: string | null, addressApplications_postCode: string, addressApplications_city: string, addressApplications_dateReviewed?: string | null } | null>, dumpstersApplications: Array<{ __typename?: 'DumpsterApplicationArchiveType', dumpstersApplications_ID: number, dumpstersApplications_typeID: number, dumpstersApplications_userName: string, dumpstersApplications_statusID: number, dumpstersApplications_dateAdded: string, dumpstersApplications_userLogin: string, dumpstersApplications_userIdentificationNumber: string, dumpstersApplications_cardNumber: string, dumpstersApplications_dumpsterNumber: string, dumpstersApplications_dateReviewed?: string | null } | null>, cardsApplications: Array<{ __typename?: 'CardApplicationArchiveType', cardsApplications_ID: number, cardsApplications_typeID: number, cardsApplications_userName: string, cardsApplications_statusID: number, cardsApplications_dateAdded: string, cardsApplications_userLogin: string, cardsApplications_userIdentificationNumber: string, cardsApplications_dateReviewed?: string | null } | null>, personalDataApplications: Array<{ __typename?: 'PersonalDataApplicationArchiveType', personalDataApplications_ID: number, personalDataApplications_userName: string, personalDataApplications_statusID: number, personalDataApplications_dateAdded: string, personalDataApplications_userLogin: string, personalDataApplications_userIdentificationNumber: string, personalDataApplications_name: string, personalDataApplications_dateReviewed?: string | null } | null> } } | null } | null } | null };

export type OfficialUserGetQueryVariables = Exact<{
  props: OfficialSelectedUserDataGetQueryProps;
}>;


export type OfficialUserGetQuery = { __typename?: 'Query', official?: { __typename?: 'OfficialQuery', user?: { __typename?: 'OfficialSelectedUserDataQuery', get?: { __typename?: 'OfficialSelectedUserDataGetQueryResult', result: { __typename?: 'OfficialSelectedUserDataType', userType: number, basicInfo: { __typename?: 'OfficialUserSearchType', users_name: string, users_identificationNumber: string, users_login: string, users_phoneNumber?: string | null, users_ID: number, users_statusID: number }, cards: Array<{ __typename?: 'OfficialCardsTypeWDumpstersType', usersCards_statusID: number, usersCards_ID: number, usersCards_number: string, usersCards_numberPIN?: string | null, dumpsters: Array<{ __typename?: 'DumpsterInfoType', dumpster_name: string, dumpster_city: string, dumpster_street: string, dumpster_houseNumbers: string, dumpster_ID: number } | null> } | null>, addressInfo: Array<{ __typename?: 'UsersAddressType', usersAddress_typeID: number, usersAddress_ID: number, usersAddress_street: string, usersAddress_houseNumber: string, usersAddress_apartamentNumber?: string | null, usersAddress_postCode: string, usersAddress_city: string, usersAddress_communityID: number } | null>, contracts?: { __typename?: 'UserContractType', userContracts?: Array<{ __typename?: 'UserContractMainType', usersContract_ID: number, usersContract_userID: number, usersContract_number: string, usersContract_dateFrom: string, usersContract_dateTo: string, usersContract_statusID: number, usersContract_communityID: number, rates?: { __typename?: 'RateType', paper?: number | null, plastic?: number | null, glass?: number | null, bio?: number | null, mixed?: number | null } | null }> | null, housingAssociationContracts?: Array<{ __typename?: 'UserContractDumpsterType', dumpsterContract_ID: number, dumpsterContract_number: string, dumpsterContract_dumpsterID: number, dumpsterContract_dateFrom: string, dumpsterContract_dateTo: string, dumpsterContract_statusID: number, dumpsterContract_communityID: number, rates?: { __typename?: 'RateType', paper?: number | null, plastic?: number | null, glass?: number | null, bio?: number | null, mixed?: number | null } | null }> | null } | null } } | null } | null } | null };

export type OfficialNewUsersApplicationGetQueryVariables = Exact<{
  props: OfficialApplicationsNewUsersQueryProps;
}>;


export type OfficialNewUsersApplicationGetQuery = { __typename?: 'Query', official?: { __typename?: 'OfficialQuery', applications?: { __typename?: 'OfficialApplicationsQuery', newUser?: { __typename?: 'OfficialApplicationsNewUsersQuery', get?: Array<{ __typename?: 'UserInfoType', users_ID: number, users_login: string, users_name: string, users_identificationNumber: string, users_phoneNumber?: string | null, users_statusID: number, addresses: Array<{ __typename?: 'UsersAddressType', usersAddress_street: string, usersAddress_houseNumber: string, usersAddress_apartamentNumber?: string | null, usersAddress_postCode: string, usersAddress_city: string }> }> | null } | null } | null } | null };

export type OfficialUserInfoApplicationGetQueryVariables = Exact<{
  props: OfficialApplicationsUserInfoQueryProps;
}>;


export type OfficialUserInfoApplicationGetQuery = { __typename?: 'Query', official?: { __typename?: 'OfficialQuery', applications?: { __typename?: 'OfficialApplicationsQuery', userInfo?: { __typename?: 'OfficialApplicationsUserInfoQuery', get?: Array<{ __typename?: 'PersonalDataApplicationsType', personalDataApplications_ID: number, personalDataApplications_dateAdded: string, personalDataApplications_dateReviewed?: string | null, personalDataApplications_typeID: number, personalDataApplications_reviewedBy?: number | null, personalDataApplications_userID: number, personalDataApplications_statusID: number, personalDataApplications_name: string, personalDataApplications_oldName: string }> | null } | null } | null } | null };

export type OfficialCardsApplicationGetQueryVariables = Exact<{
  props: OfficialApplicationsCardsQueryProps;
}>;


export type OfficialCardsApplicationGetQuery = { __typename?: 'Query', official?: { __typename?: 'OfficialQuery', applications?: { __typename?: 'OfficialApplicationsQuery', cards?: { __typename?: 'OfficialApplicationsCardsQuery', get?: Array<{ __typename?: 'NewCardType', cardsApplications_ID: number, cardsApplications_dateAdded: string, cardsApplications_dateReviewed?: string | null, cardsApplications_typeID: number, cardsApplications_reviewedBy?: number | null, cardsApplications_userID: number, cardsApplications_statusID: number, user: { __typename?: 'UserInfoType', users_name: string, users_ID: number }, dumpsters: Array<{ __typename?: 'DumpsterDataType', dumpster_ID: number, dumpster_name: string } | null> }> | null } | null } | null } | null };

export type OfficialDumpstersApplicationGetQueryVariables = Exact<{
  props: OfficialApplicationsDumpstersQueryProps;
}>;


export type OfficialDumpstersApplicationGetQuery = { __typename?: 'Query', official?: { __typename?: 'OfficialQuery', applications?: { __typename?: 'OfficialApplicationsQuery', dumpsters?: { __typename?: 'OfficialApplicationsDumpstersQuery', get?: Array<{ __typename?: 'NewDumpsterApplicationType', dumpstersApplications_ID: number, dumpstersApplications_dateAdded: string, dumpstersApplications_dateReviewed?: string | null, dumpstersApplications_typeID: number, dumpstersApplications_reviewedBy?: number | null, dumpstersApplications_userID: number, dumpstersApplications_dumpsterID: number, dumpstersApplications_statusID: number, dumpstersApplications_cardID: number, dumpstersApplications_dumpsterName: string, dumpstersApplications_userName: string, dumpstersApplications_cardNumber: string }> | null } | null } | null } | null };

export type OfficialAddressInfoApplicationGetQueryVariables = Exact<{
  props: OfficialApplicationsAddressInfoQueryProps;
}>;


export type OfficialAddressInfoApplicationGetQuery = { __typename?: 'Query', official?: { __typename?: 'OfficialQuery', applications?: { __typename?: 'OfficialApplicationsQuery', addressInfo?: { __typename?: 'OfficialApplicationsAddressInfoQuery', get?: Array<{ __typename?: 'NewAddressType', addressApplications_ID: number, addressApplications_dateAdded: string, addressApplications_dateReviewed?: string | null, addressApplications_typeID: number, addressApplications_reviewedBy?: number | null, addressApplications_userID: number, addressApplications_statusID: number, addressApplications_street: string, addressApplications_houseNumber: string, addressApplications_apartamentNumber?: string | null, addressApplications_postCode: string, addressApplications_city: string, addressApplications_addressTypeID: number, addressApplications_communityID: number, addressApplications_addressID?: number | null, user: { __typename?: 'OfficialApplicationsUserInfoType', users_ID: number, users_name: string } }> | null } | null } | null } | null };

export type OfficialAddressInfoApplicationGet3QueryVariables = Exact<{
  props: OfficialApplicationsAddressInfoQueryProps;
}>;


export type OfficialAddressInfoApplicationGet3Query = { __typename?: 'Query', official?: { __typename?: 'OfficialQuery', applications?: { __typename?: 'OfficialApplicationsQuery', addressInfo?: { __typename?: 'OfficialApplicationsAddressInfoQuery', get?: Array<{ __typename?: 'NewAddressType', addressApplications_ID: number, addressApplications_dateAdded: string, addressApplications_dateReviewed?: string | null, addressApplications_typeID: number, addressApplications_reviewedBy?: number | null, addressApplications_userID: number, addressApplications_statusID: number, addressApplications_street: string, addressApplications_houseNumber: string, addressApplications_apartamentNumber?: string | null, addressApplications_postCode: string, addressApplications_city: string, addressApplications_addressTypeID: number, addressApplications_communityID: number, addressApplications_addressID?: number | null, user: { __typename?: 'OfficialApplicationsUserInfoType', users_ID: number, users_name: string } }> | null } | null } | null } | null };

export type OfficialAddressInfoApplicationGet2QueryVariables = Exact<{
  props: OfficialApplicationsAddressInfoQueryProps;
}>;


export type OfficialAddressInfoApplicationGet2Query = { __typename?: 'Query', official?: { __typename?: 'OfficialQuery', applications?: { __typename?: 'OfficialApplicationsQuery', addressInfo?: { __typename?: 'OfficialApplicationsAddressInfoQuery', get?: Array<{ __typename?: 'NewAddressType', addressApplications_ID: number, addressApplications_dateAdded: string, addressApplications_dateReviewed?: string | null, addressApplications_typeID: number, addressApplications_reviewedBy?: number | null, addressApplications_userID: number, addressApplications_statusID: number, addressApplications_street: string, addressApplications_houseNumber: string, addressApplications_apartamentNumber?: string | null, addressApplications_postCode: string, addressApplications_city: string, addressApplications_addressTypeID: number, addressApplications_communityID: number, addressApplications_addressID?: number | null, user: { __typename?: 'OfficialApplicationsUserInfoType', users_ID: number, users_name: string } }> | null } | null } | null } | null };

export type UserApplicationCancelMutationVariables = Exact<{
  props: UserApplicationCancelMutationProps;
}>;


export type UserApplicationCancelMutation = { __typename?: 'Mutation', user?: { __typename?: 'UserMutation', applications?: { __typename?: 'UserApplicationsMutation', cancel?: { __typename?: 'MutationResponseType', status: { __typename?: 'MutationResponseStatusType', message: StatusEnum } } | null } | null } | null };

export type UserApplicationsGetQueryVariables = Exact<{ [key: string]: never; }>;


export type UserApplicationsGetQuery = { __typename?: 'Query', user?: { __typename?: 'UserQuery', applications?: { __typename?: 'UserApplicationsQuery', get?: { __typename?: 'UserApplicationsType', cards: Array<{ __typename?: 'UserApplicationCardType', cardsApplications_ID: number, cardsApplications_userID: number, cardsApplications_statusID: number, cardsApplications_typeID: number, cardsApplications_dateAdded: string, cardsApplications_dateReviewed?: string | null }>, dumpsters: Array<{ __typename?: 'NewDumpsterApplicationType', dumpstersApplications_statusID: number, dumpstersApplications_typeID: number, dumpstersApplications_ID: number, dumpstersApplications_dateAdded: string, dumpstersApplications_cardID: number, dumpstersApplications_dumpsterID: number, dumpstersApplications_dateReviewed?: string | null }>, address: Array<{ __typename?: 'ApplicationAddressType', addressApplications_statusID: number, addressApplications_ID: number, addressApplications_typeID: number, addressApplications_addressTypeID: number, addressApplications_dateAdded: string, addressApplications_street: string, addressApplications_houseNumber: string, addressApplications_apartamentNumber?: string | null, addressApplications_postCode: string, addressApplications_city: string, addressApplications_dateReviewed?: string | null }>, personalData: Array<{ __typename?: 'NewUserInfoType', personalDataApplications_statusID: number, personalDataApplications_ID: number, personalDataApplications_dateAdded: string, personalDataApplications_name: string, personalDataApplications_dateReviewed?: string | null }> } | null } | null } | null };

export type CommonDumpstersGetQueryVariables = Exact<{
  props: CommonDumpstersGetQueryProps;
}>;


export type CommonDumpstersGetQuery = { __typename?: 'Query', common?: { __typename?: 'CommonQuery', dumpsters?: { __typename?: 'CommonDumpstersQuery', get?: Array<{ __typename?: 'CommonDumpstersInfoType', dumpster_ID: number, dumpster_name: string, dumpster_description?: string | null, dumpster_street: string, dumpster_city: string, dumpster_postCode: string, dumpster_communityID: number, dumpster_houseNumbers: string, dumpster_hasError: boolean }> | null } | null } | null };

export type UserDumpstersAddMutationVariables = Exact<{
  props: UserDumpstersAddMutationProps;
}>;


export type UserDumpstersAddMutation = { __typename?: 'Mutation', user?: { __typename?: 'UserMutation', dumpsters?: { __typename?: 'UserDumpstersMutation', add?: { __typename?: 'MutationResponseType', status: { __typename?: 'MutationResponseStatusType', message: StatusEnum, description?: string | null } } | null } | null } | null };

export type CompanyDumpstersAddMutationVariables = Exact<{
  props: CompanyDumpstersAddMutationProps;
}>;


export type CompanyDumpstersAddMutation = { __typename?: 'Mutation', company?: { __typename?: 'CompanyMutation', dumpsters?: { __typename?: 'CompanyDumpstersMutation', add?: { __typename?: 'MutationResponseType', status: { __typename?: 'MutationResponseStatusType', message: StatusEnum, description?: string | null } } | null } | null } | null };

export type CommonDumpstersGet5QueryVariables = Exact<{
  props: CommonDumpstersGetQueryProps;
}>;


export type CommonDumpstersGet5Query = { __typename?: 'Query', common?: { __typename?: 'CommonQuery', dumpsters?: { __typename?: 'CommonDumpstersQuery', get?: Array<{ __typename?: 'CommonDumpstersInfoType', dumpster_ID: number, dumpster_name: string, dumpster_description?: string | null, dumpster_street: string, dumpster_city: string, dumpster_postCode: string, dumpster_communityID: number, dumpster_houseNumbers: string, dumpster_hasError: boolean }> | null } | null } | null };

export type UserCardsAddMutationVariables = Exact<{
  props: UserCardsAddMutationProps;
}>;


export type UserCardsAddMutation = { __typename?: 'Mutation', user?: { __typename?: 'UserMutation', cards?: { __typename?: 'UserCardsMutation', add?: { __typename?: 'MutationResponseType', status: { __typename?: 'MutationResponseStatusType', message: StatusEnum } } | null } | null } | null };

export type UserCardsDeleteMutationVariables = Exact<{
  props: UserCardsDeleteMutationProps;
}>;


export type UserCardsDeleteMutation = { __typename?: 'Mutation', user?: { __typename?: 'UserMutation', cards?: { __typename?: 'UserCardsMutation', delete?: { __typename?: 'MutationResponseType', status: { __typename?: 'MutationResponseStatusType', message: StatusEnum } } | null } | null } | null };

export type UserDumpstersDeleteMutationVariables = Exact<{
  props: UserDumpstersDeleteMutationProps;
}>;


export type UserDumpstersDeleteMutation = { __typename?: 'Mutation', user?: { __typename?: 'UserMutation', dumpsters?: { __typename?: 'UserDumpstersMutation', delete?: { __typename?: 'MutationResponseType', status: { __typename?: 'MutationResponseStatusType', message: StatusEnum } } | null } | null } | null };

export type UserGarbagesQueryVariables = Exact<{
  props: UserGarbageGetQueryProps;
}>;


export type UserGarbagesQuery = { __typename?: 'Query', user?: { __typename?: 'UserQuery', garbage?: { __typename?: 'UserGarbageQuery', get?: { __typename?: 'UserGarbageGetQueryResult', result: { __typename?: 'UserGarbageSummaryQuery', pieChart: { __typename?: 'GarbagePieChartType', total: number, garbageTypes: Array<{ __typename?: 'GarbageSummaryByTypesType', color: string, mass: number, type: string, typeID?: number | null }> }, lineChart: Array<{ __typename?: 'GarbageLineChartType', garbage_sum: number, garbage_typeID: number, month: string, monthIndex: number, waste_name: string, garbage_fullDate: string }> } } | null } | null } | null };

export type BaseDataUpdateMutationVariables = Exact<{
  props: UserInfoProfileMutationProps;
}>;


export type BaseDataUpdateMutation = { __typename?: 'Mutation', user?: { __typename?: 'UserMutation', info?: { __typename?: 'UserInfoMutation', profile: { __typename?: 'MutationResponseType', status: { __typename?: 'MutationResponseStatusType', message: StatusEnum } } } | null } | null };

export type ContactUpdateMutationVariables = Exact<{
  props: UserInfoContactsMutationProps;
}>;


export type ContactUpdateMutation = { __typename?: 'Mutation', user?: { __typename?: 'UserMutation', info?: { __typename?: 'UserInfoMutation', contacts: { __typename?: 'MutationResponseType', status: { __typename?: 'MutationResponseStatusType', message: StatusEnum } } } | null } | null };

export type PinUpdateMutationVariables = Exact<{
  props: UserInfoPinMutationProps;
}>;


export type PinUpdateMutation = { __typename?: 'Mutation', user?: { __typename?: 'UserMutation', info?: { __typename?: 'UserInfoMutation', pin: { __typename?: 'MutationResponseType', status: { __typename?: 'MutationResponseStatusType', message: StatusEnum } } } | null } | null };

export type PasswordUpdateMutationVariables = Exact<{
  props: UserInfoPasswordMutationProps;
}>;


export type PasswordUpdateMutation = { __typename?: 'Mutation', user?: { __typename?: 'UserMutation', info?: { __typename?: 'UserInfoMutation', password: { __typename?: 'MutationResponseType', status: { __typename?: 'MutationResponseStatusType', message: StatusEnum } } } | null } | null };

export type UserAddressInfoAddMutationVariables = Exact<{
  props: UserAddressInfoAddMutationProps;
}>;


export type UserAddressInfoAddMutation = { __typename?: 'Mutation', user?: { __typename?: 'UserMutation', addressInfo?: { __typename?: 'UserAddressInfoMutation', add?: { __typename?: 'MutationResponseType', status: { __typename?: 'MutationResponseStatusType', message: StatusEnum, description?: string | null } } | null } | null } | null };

export type TerritorialDivisonFullData1QueryVariables = Exact<{
  props: TerritorialFullDataGetQueryProps;
}>;


export type TerritorialDivisonFullData1Query = { __typename?: 'Query', territorialDivision?: { __typename?: 'TerritorialDivisionQuery', fullData?: { __typename?: 'TerritorialFullDataQuery', get: { __typename?: 'TerritorialDivisionFullDataType', voivodeship: { __typename?: 'VoivodeshipInfoType', voivodeship_ID: number, voivodeship_name: string, voivodeship_description?: string | null }, municipality: { __typename?: 'MunicipalityInfoType', municipality_ID: number, municipality_name: string, municipality_description: string, municipality_voivodeshipID: number }, community: { __typename?: 'CommunityInfoType', community_ID: number, community_name: string, community_description: string, community_voivodeshipID: number, community_municipalityID: number } } } | null } | null };

export type UserAddressInfoDeleteMutationVariables = Exact<{
  props: UserAddressInfoDeleteMutationProps;
}>;


export type UserAddressInfoDeleteMutation = { __typename?: 'Mutation', user?: { __typename?: 'UserMutation', addressInfo?: { __typename?: 'UserAddressInfoMutation', delete?: { __typename?: 'MutationResponseType', status: { __typename?: 'MutationResponseStatusType', message: StatusEnum } } | null } | null } | null };

export type UserAddressInfoEditMutationVariables = Exact<{
  props: UserAddressInfoEditMutationProps;
}>;


export type UserAddressInfoEditMutation = { __typename?: 'Mutation', user?: { __typename?: 'UserMutation', addressInfo?: { __typename?: 'UserAddressInfoMutation', edit?: { __typename?: 'MutationResponseType', status: { __typename?: 'MutationResponseStatusType', message: StatusEnum } } | null } | null } | null };

export type CurrentUser1QueryVariables = Exact<{ [key: string]: never; }>;


export type CurrentUser1Query = { __typename?: 'Query', user?: { __typename?: 'UserQuery', info?: { __typename?: 'UserInfoQuery', get?: { __typename?: 'OfficialSelectedUserDataType', userType: number, basicInfo: { __typename?: 'OfficialUserSearchType', users_ID: number }, cards: Array<{ __typename?: 'OfficialCardsTypeWDumpstersType', usersCards_ID: number, usersCards_statusID: number, usersCards_number: string, usersCards_rentedToUserID?: number | null, dumpsters: Array<{ __typename?: 'DumpsterInfoType', dumpster_ID: number, dumpster_name: string, dumpster_city: string, dumpster_street: string, dumpster_houseNumbers: string } | null> } | null> } | null } | null } | null };

export type UserCardsInfoQueryVariables = Exact<{ [key: string]: never; }>;


export type UserCardsInfoQuery = { __typename?: 'Query', user?: { __typename?: 'UserQuery', card?: { __typename?: 'UserCardQuery', cardsAndDumpsters?: Array<{ __typename?: 'CardsWithMatchingDumpstersType', usersCards_ID: number, usersCards_number: string, dumpsters: Array<{ __typename?: 'DumpsterMathingCardInfoType', dumpster_city: string, dumpster_houseNumbers: string, dumpster_name: string, dumpster_street: string }> }> | null } | null } | null };

export type UserContractGetQueryVariables = Exact<{ [key: string]: never; }>;


export type UserContractGetQuery = { __typename?: 'Query', user?: { __typename?: 'UserQuery', contract?: { __typename?: 'UserContractQuery', get: { __typename?: 'UserContractType', userContracts?: Array<{ __typename?: 'UserContractMainType', usersContract_ID: number, usersContract_userID: number, usersContract_number: string, usersContract_dateFrom: string, usersContract_dateTo: string, usersContract_statusID: number, usersContract_communityID: number, rates?: { __typename?: 'RateType', paper?: number | null, plastic?: number | null, glass?: number | null, bio?: number | null, mixed?: number | null } | null }> | null, housingAssociationContracts?: Array<{ __typename?: 'UserContractDumpsterType', dumpsterContract_ID: number, dumpsterContract_number: string, dumpsterContract_dumpsterID: number, dumpsterContract_dateFrom: string, dumpsterContract_dateTo: string, dumpsterContract_statusID: number, dumpsterContract_communityID: number, rates?: { __typename?: 'RateType', paper?: number | null, plastic?: number | null, glass?: number | null, bio?: number | null, mixed?: number | null } | null }> | null } } | null } | null };


export const CurrentUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CurrentUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"info"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"get"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userType"}},{"kind":"Field","name":{"kind":"Name","value":"basicInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"users_ID"}},{"kind":"Field","name":{"kind":"Name","value":"users_statusID"}},{"kind":"Field","name":{"kind":"Name","value":"users_name"}},{"kind":"Field","name":{"kind":"Name","value":"users_identificationNumber"}},{"kind":"Field","name":{"kind":"Name","value":"users_login"}},{"kind":"Field","name":{"kind":"Name","value":"users_phoneNumber"}}]}},{"kind":"Field","name":{"kind":"Name","value":"addressInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"usersAddress_communityID"}},{"kind":"Field","name":{"kind":"Name","value":"usersAddress_typeID"}},{"kind":"Field","name":{"kind":"Name","value":"usersAddress_ID"}},{"kind":"Field","name":{"kind":"Name","value":"usersAddress_street"}},{"kind":"Field","name":{"kind":"Name","value":"usersAddress_houseNumber"}},{"kind":"Field","name":{"kind":"Name","value":"usersAddress_apartamentNumber"}},{"kind":"Field","name":{"kind":"Name","value":"usersAddress_postCode"}},{"kind":"Field","name":{"kind":"Name","value":"usersAddress_city"}}]}},{"kind":"Field","name":{"kind":"Name","value":"cards"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"usersCards_ID"}},{"kind":"Field","name":{"kind":"Name","value":"usersCards_number"}}]}},{"kind":"Field","name":{"kind":"Name","value":"dumpsters"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dumpster_ID"}},{"kind":"Field","name":{"kind":"Name","value":"dumpster_name"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<CurrentUserQuery, CurrentUserQueryVariables>;
export const AdminCardsOrdersGetDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AdminCardsOrdersGet"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"admin"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cardsOrders"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"get"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cardsBulkOrder_ID"}},{"kind":"Field","name":{"kind":"Name","value":"cardsBulkOrder_statusID"}},{"kind":"Field","name":{"kind":"Name","value":"cardsBulkOrder_orderDate"}},{"kind":"Field","name":{"kind":"Name","value":"cardsBulkOrder_numOfCards"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"users_name"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<AdminCardsOrdersGetQuery, AdminCardsOrdersGetQueryVariables>;
export const AdminCardsOrdersVerifyAddDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AdminCardsOrdersVerifyAdd"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"props"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AdminCardsOrdersVerifyAddMutationProps"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"admin"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cardsOrders"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"verifyAdd"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"props"},"value":{"kind":"Variable","name":{"kind":"Name","value":"props"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<AdminCardsOrdersVerifyAddMutation, AdminCardsOrdersVerifyAddMutationVariables>;
export const AdminDumpstersBinEditDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AdminDumpstersBinEdit"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"props"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AdminDumpstersBinEditMutationProps"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"admin"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dumpsters"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"bin"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"props"},"value":{"kind":"Variable","name":{"kind":"Name","value":"props"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<AdminDumpstersBinEditMutation, AdminDumpstersBinEditMutationVariables>;
export const AdminDumpstersAddDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AdminDumpstersAdd"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"props"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AdminDumpstersAddMutationProps"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"admin"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dumpsters"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"add"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"props"},"value":{"kind":"Variable","name":{"kind":"Name","value":"props"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<AdminDumpstersAddMutation, AdminDumpstersAddMutationVariables>;
export const AdminDumpstersDeleteDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AdminDumpstersDelete"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"props"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AdminDumpstersDeleteMutationProps"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"admin"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dumpsters"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"delete"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"props"},"value":{"kind":"Variable","name":{"kind":"Name","value":"props"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<AdminDumpstersDeleteMutation, AdminDumpstersDeleteMutationVariables>;
export const AdminDumpstersEditDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AdminDumpstersEdit"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"props"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AdminDumpstersEditMutationProps"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"admin"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dumpsters"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edit"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"props"},"value":{"kind":"Variable","name":{"kind":"Name","value":"props"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<AdminDumpstersEditMutation, AdminDumpstersEditMutationVariables>;
export const AdminDumpstersGet2Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AdminDumpstersGet2"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"admin"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dumpsters"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"get"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dumpster_ID"}},{"kind":"Field","name":{"kind":"Name","value":"dumpster_street"}},{"kind":"Field","name":{"kind":"Name","value":"dumpster_city"}},{"kind":"Field","name":{"kind":"Name","value":"dumpster_postCode"}},{"kind":"Field","name":{"kind":"Name","value":"dumpster_communityID"}},{"kind":"Field","name":{"kind":"Name","value":"dumpster_houseNumbers"}},{"kind":"Field","name":{"kind":"Name","value":"dumpster_hasError"}},{"kind":"Field","name":{"kind":"Name","value":"dumpster_name"}},{"kind":"Field","name":{"kind":"Name","value":"dumpster_description"}},{"kind":"Field","name":{"kind":"Name","value":"bins"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dumpsterBin_ID"}},{"kind":"Field","name":{"kind":"Name","value":"dumpsterBin_typeID"}}]}},{"kind":"Field","name":{"kind":"Name","value":"owners"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"users_name"}},{"kind":"Field","name":{"kind":"Name","value":"users_ID"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<AdminDumpstersGet2Query, AdminDumpstersGet2QueryVariables>;
export const AdminOwnersAddDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AdminOwnersAdd"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"props"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AdminOwnersAddMutationProps"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"admin"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"owners"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"add"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"props"},"value":{"kind":"Variable","name":{"kind":"Name","value":"props"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<AdminOwnersAddMutation, AdminOwnersAddMutationVariables>;
export const AdminOfficialsAddDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AdminOfficialsAdd"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"props"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AdminNewOfficialAddMutationProps"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"admin"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"officials"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"add"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"props"},"value":{"kind":"Variable","name":{"kind":"Name","value":"props"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<AdminOfficialsAddMutation, AdminOfficialsAddMutationVariables>;
export const AdminOwnersDeleteDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AdminOwnersDelete"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"props"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AdminOwnersDeleteMutationProps"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"admin"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"owners"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"delete"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"props"},"value":{"kind":"Variable","name":{"kind":"Name","value":"props"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<AdminOwnersDeleteMutation, AdminOwnersDeleteMutationVariables>;
export const AdminChangePasswordDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AdminChangePassword"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"props"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AdminChangeOfficialAndSuperOfficialChangePasswordProps"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"admin"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"officials"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"changePassword"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"props"},"value":{"kind":"Variable","name":{"kind":"Name","value":"props"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<AdminChangePasswordMutation, AdminChangePasswordMutationVariables>;
export const AdminOfficialsDeleteDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AdminOfficialsDelete"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"props"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AdminOfficialsDeleteMutationProps"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"admin"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"officials"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"delete"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"props"},"value":{"kind":"Variable","name":{"kind":"Name","value":"props"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<AdminOfficialsDeleteMutation, AdminOfficialsDeleteMutationVariables>;
export const AdminOfficialsGetDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AdminOfficialsGet"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"admin"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"officials"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"get"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"users_ID"}},{"kind":"Field","name":{"kind":"Name","value":"users_identificationNumber"}},{"kind":"Field","name":{"kind":"Name","value":"users_phoneNumber"}},{"kind":"Field","name":{"kind":"Name","value":"users_typeID"}},{"kind":"Field","name":{"kind":"Name","value":"users_statusID"}},{"kind":"Field","name":{"kind":"Name","value":"users_name"}},{"kind":"Field","name":{"kind":"Name","value":"users_login"}},{"kind":"Field","name":{"kind":"Name","value":"addresses"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"usersAddress_street"}},{"kind":"Field","name":{"kind":"Name","value":"usersAddress_houseNumber"}},{"kind":"Field","name":{"kind":"Name","value":"usersAddress_city"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<AdminOfficialsGetQuery, AdminOfficialsGetQueryVariables>;
export const UserGarbageGetDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"UserGarbageGet"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"props"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UserGarbageGetQueryProps"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"garbage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"get"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"result"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"props"},"value":{"kind":"Variable","name":{"kind":"Name","value":"props"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"pieChart"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total"}},{"kind":"Field","name":{"kind":"Name","value":"garbageTypes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"mass"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"typeID"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"lineChart"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"garbage_sum"}},{"kind":"Field","name":{"kind":"Name","value":"garbage_typeID"}},{"kind":"Field","name":{"kind":"Name","value":"month"}},{"kind":"Field","name":{"kind":"Name","value":"monthIndex"}},{"kind":"Field","name":{"kind":"Name","value":"waste_name"}},{"kind":"Field","name":{"kind":"Name","value":"garbage_fullDate"}}]}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<UserGarbageGetQuery, UserGarbageGetQueryVariables>;
export const TerritorialDivisonMunicipalitiesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"TerritorialDivisonMunicipalities"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"props"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"TerritorialMunicipalitiesGetQueryProps"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"territorialDivision"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"municipalities"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"get"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"props"},"value":{"kind":"Variable","name":{"kind":"Name","value":"props"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"municipality_ID"}},{"kind":"Field","name":{"kind":"Name","value":"municipality_name"}},{"kind":"Field","name":{"kind":"Name","value":"municipality_description"}},{"kind":"Field","name":{"kind":"Name","value":"municipality_voivodeshipID"}}]}}]}}]}}]}}]} as unknown as DocumentNode<TerritorialDivisonMunicipalitiesQuery, TerritorialDivisonMunicipalitiesQueryVariables>;
export const TerritorialDivisonCommunitiesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"TerritorialDivisonCommunities"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"props"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"TerritorialCommunitiesGetQueryProps"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"territorialDivision"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"communities"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"get"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"props"},"value":{"kind":"Variable","name":{"kind":"Name","value":"props"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"community_ID"}},{"kind":"Field","name":{"kind":"Name","value":"community_name"}},{"kind":"Field","name":{"kind":"Name","value":"community_description"}},{"kind":"Field","name":{"kind":"Name","value":"community_municipalityID"}},{"kind":"Field","name":{"kind":"Name","value":"community_voivodeshipID"}}]}}]}}]}}]}}]} as unknown as DocumentNode<TerritorialDivisonCommunitiesQuery, TerritorialDivisonCommunitiesQueryVariables>;
export const CompanyCardsAddDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CompanyCardsAdd"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"props"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CompanyCardsAddMutationProps"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"company"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cards"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"add"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"props"},"value":{"kind":"Variable","name":{"kind":"Name","value":"props"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<CompanyCardsAddMutation, CompanyCardsAddMutationVariables>;
export const CompanyCardsGetDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CompanyCardsGet"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"company"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cards"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"get"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cardsBulkOrder_ID"}},{"kind":"Field","name":{"kind":"Name","value":"cardsBulkOrder_userID"}},{"kind":"Field","name":{"kind":"Name","value":"cardsBulkOrder_numOfCards"}},{"kind":"Field","name":{"kind":"Name","value":"cardsBulkOrder_statusID"}},{"kind":"Field","name":{"kind":"Name","value":"cardsBulkOrder_orderDate"}}]}}]}}]}}]}}]} as unknown as DocumentNode<CompanyCardsGetQuery, CompanyCardsGetQueryVariables>;
export const CompanyOccupantsGetsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CompanyOccupantsGets"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"company"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"occupants"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"get"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"users_ID"}},{"kind":"Field","name":{"kind":"Name","value":"users_login"}},{"kind":"Field","name":{"kind":"Name","value":"users_name"}},{"kind":"Field","name":{"kind":"Name","value":"users_identificationNumber"}},{"kind":"Field","name":{"kind":"Name","value":"users_phoneNumber"}},{"kind":"Field","name":{"kind":"Name","value":"users_statusID"}},{"kind":"Field","name":{"kind":"Name","value":"connection_ID"}},{"kind":"Field","name":{"kind":"Name","value":"addresses"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"usersAddress_ID"}},{"kind":"Field","name":{"kind":"Name","value":"usersAddress_userID"}},{"kind":"Field","name":{"kind":"Name","value":"usersAddress_street"}},{"kind":"Field","name":{"kind":"Name","value":"usersAddress_houseNumber"}},{"kind":"Field","name":{"kind":"Name","value":"usersAddress_apartamentNumber"}},{"kind":"Field","name":{"kind":"Name","value":"usersAddress_postCode"}},{"kind":"Field","name":{"kind":"Name","value":"usersAddress_city"}},{"kind":"Field","name":{"kind":"Name","value":"usersAddress_typeID"}},{"kind":"Field","name":{"kind":"Name","value":"usersAddress_communityID"}},{"kind":"Field","name":{"kind":"Name","value":"usersAddress_statusID"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<CompanyOccupantsGetsQuery, CompanyOccupantsGetsQueryVariables>;
export const CompanyCardsRentAddDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CompanyCardsRentAdd"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"props"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CompanyCardsRentAddMutationProps"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"company"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cardsRent"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"add"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"props"},"value":{"kind":"Variable","name":{"kind":"Name","value":"props"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<CompanyCardsRentAddMutation, CompanyCardsRentAddMutationVariables>;
export const CompanyCardsRentDeleteDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CompanyCardsRentDelete"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"props"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CompanyCardsRentDeleteMutationProps"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"company"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cardsRent"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"delete"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"props"},"value":{"kind":"Variable","name":{"kind":"Name","value":"props"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<CompanyCardsRentDeleteMutation, CompanyCardsRentDeleteMutationVariables>;
export const CommonUserGetDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CommonUserGet"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"props"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CommonUserDataGetQueryProps"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"common"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"get"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"props"},"value":{"kind":"Variable","name":{"kind":"Name","value":"props"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"basicInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"users_ID"}},{"kind":"Field","name":{"kind":"Name","value":"users_login"}},{"kind":"Field","name":{"kind":"Name","value":"users_name"}},{"kind":"Field","name":{"kind":"Name","value":"users_identificationNumber"}},{"kind":"Field","name":{"kind":"Name","value":"users_phoneNumber"}},{"kind":"Field","name":{"kind":"Name","value":"users_statusID"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<CommonUserGetQuery, CommonUserGetQueryVariables>;
export const OfficialContractsAddDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"OfficialContractsAdd"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"props"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"OfficialContractsAddMutationProps"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"official"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"contracts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"add"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"props"},"value":{"kind":"Variable","name":{"kind":"Name","value":"props"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<OfficialContractsAddMutation, OfficialContractsAddMutationVariables>;
export const OfficialContractsArchivizeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"OfficialContractsArchivize"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"props"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"OfficialContractsArchivizeMutationProps"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"official"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"contracts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"archivize"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"props"},"value":{"kind":"Variable","name":{"kind":"Name","value":"props"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<OfficialContractsArchivizeMutation, OfficialContractsArchivizeMutationVariables>;
export const OfficialContractsEditDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"OfficialContractsEdit"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"props"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"OfficialContractsEditMutationProps"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"official"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"contracts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edit"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"props"},"value":{"kind":"Variable","name":{"kind":"Name","value":"props"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<OfficialContractsEditMutation, OfficialContractsEditMutationVariables>;
export const OfficialRatesAddDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"OfficialRatesAdd"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"props"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"OfficialRatesAddMutationProps"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"official"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"rates"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"add"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"props"},"value":{"kind":"Variable","name":{"kind":"Name","value":"props"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<OfficialRatesAddMutation, OfficialRatesAddMutationVariables>;
export const OfficialRatesDeleteDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"OfficialRatesDelete"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"props"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"OfficialRatesDeleteMutationProps"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"official"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"rates"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"delete"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"props"},"value":{"kind":"Variable","name":{"kind":"Name","value":"props"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<OfficialRatesDeleteMutation, OfficialRatesDeleteMutationVariables>;
export const OfficialRatesEditDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"OfficialRatesEdit"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"props"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"OfficialRatesEditMutationProps"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"official"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"rates"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edit"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"props"},"value":{"kind":"Variable","name":{"kind":"Name","value":"props"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<OfficialRatesEditMutation, OfficialRatesEditMutationVariables>;
export const CompanyOccupantsDeleteDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CompanyOccupantsDelete"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"props"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CompanyOccupantsDeleteMutationProps"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"company"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"occupants"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"delete"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"props"},"value":{"kind":"Variable","name":{"kind":"Name","value":"props"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<CompanyOccupantsDeleteMutation, CompanyOccupantsDeleteMutationVariables>;
export const OfficialUserGetsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"OfficialUserGets"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"props"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"OfficialUserInfoGetQueryProps"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"official"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"users"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"get"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"result"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"props"},"value":{"kind":"Variable","name":{"kind":"Name","value":"props"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"users_ID"}},{"kind":"Field","name":{"kind":"Name","value":"users_login"}},{"kind":"Field","name":{"kind":"Name","value":"users_name"}},{"kind":"Field","name":{"kind":"Name","value":"users_identificationNumber"}},{"kind":"Field","name":{"kind":"Name","value":"users_phoneNumber"}},{"kind":"Field","name":{"kind":"Name","value":"users_statusID"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<OfficialUserGetsQuery, OfficialUserGetsQueryVariables>;
export const CompanyOccupantsAddDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CompanyOccupantsAdd"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"props"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CompanyOccupantsAddMutationProps"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"company"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"occupants"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"add"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"props"},"value":{"kind":"Variable","name":{"kind":"Name","value":"props"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<CompanyOccupantsAddMutation, CompanyOccupantsAddMutationVariables>;
export const CompanyAddressAddDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CompanyAddressAdd"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"props"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CompanyAddressAddMutationProps"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"company"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addresses"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"add"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"props"},"value":{"kind":"Variable","name":{"kind":"Name","value":"props"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<CompanyAddressAddMutation, CompanyAddressAddMutationVariables>;
export const CompanyAddressDeleteDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CompanyAddressDelete"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"props"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CompanyAddressDeleteMutationProps"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"company"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addresses"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"delete"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"props"},"value":{"kind":"Variable","name":{"kind":"Name","value":"props"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<CompanyAddressDeleteMutation, CompanyAddressDeleteMutationVariables>;
export const CompanyAddressEditDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CompanyAddressEdit"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"props"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CompanyAddressEditMutationProps"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"company"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addresses"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edit"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"props"},"value":{"kind":"Variable","name":{"kind":"Name","value":"props"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<CompanyAddressEditMutation, CompanyAddressEditMutationVariables>;
export const TerritorialDivisonFullData2Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"TerritorialDivisonFullData2"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"props"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"TerritorialFullDataGetQueryProps"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"territorialDivision"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fullData"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"get"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"props"},"value":{"kind":"Variable","name":{"kind":"Name","value":"props"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"community"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"community_ID"}},{"kind":"Field","name":{"kind":"Name","value":"community_name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"voivodeship"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"voivodeship_ID"}},{"kind":"Field","name":{"kind":"Name","value":"voivodeship_name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"municipality"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"municipality_ID"}},{"kind":"Field","name":{"kind":"Name","value":"municipality_name"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<TerritorialDivisonFullData2Query, TerritorialDivisonFullData2QueryVariables>;
export const CompanyOccupantsGetDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CompanyOccupantsGet"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"company"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addresses"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"get"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"usersAddress_ID"}},{"kind":"Field","name":{"kind":"Name","value":"usersAddress_userID"}},{"kind":"Field","name":{"kind":"Name","value":"usersAddress_street"}},{"kind":"Field","name":{"kind":"Name","value":"usersAddress_houseNumber"}},{"kind":"Field","name":{"kind":"Name","value":"usersAddress_apartamentNumber"}},{"kind":"Field","name":{"kind":"Name","value":"usersAddress_postCode"}},{"kind":"Field","name":{"kind":"Name","value":"usersAddress_city"}},{"kind":"Field","name":{"kind":"Name","value":"usersAddress_typeID"}},{"kind":"Field","name":{"kind":"Name","value":"usersAddress_communityID"}},{"kind":"Field","name":{"kind":"Name","value":"usersAddress_statusID"}}]}}]}}]}}]}}]} as unknown as DocumentNode<CompanyOccupantsGetQuery, CompanyOccupantsGetQueryVariables>;
export const CompanyProfileUpdateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CompanyProfileUpdate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"props"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CompanyInfoProfileMutationProps"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"company"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"info"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"profile"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"props"},"value":{"kind":"Variable","name":{"kind":"Name","value":"props"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<CompanyProfileUpdateMutation, CompanyProfileUpdateMutationVariables>;
export const CompanyGarbageGetDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CompanyGarbageGet"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"props"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CompanyGarbageGetQueryProps"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"company"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"garbage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"get"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"props"},"value":{"kind":"Variable","name":{"kind":"Name","value":"props"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dumpsterID"}},{"kind":"Field","name":{"kind":"Name","value":"garbage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"paper"}},{"kind":"Field","name":{"kind":"Name","value":"glass"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"plastic"}},{"kind":"Field","name":{"kind":"Name","value":"mixed"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<CompanyGarbageGetQuery, CompanyGarbageGetQueryVariables>;
export const CompanyDumpstersGetDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CompanyDumpstersGet"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"company"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dumpsters"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"get"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dumpster_ID"}},{"kind":"Field","name":{"kind":"Name","value":"dumpster_name"}},{"kind":"Field","name":{"kind":"Name","value":"dumpster_description"}},{"kind":"Field","name":{"kind":"Name","value":"dumpster_street"}},{"kind":"Field","name":{"kind":"Name","value":"dumpster_city"}},{"kind":"Field","name":{"kind":"Name","value":"dumpster_postCode"}},{"kind":"Field","name":{"kind":"Name","value":"dumpster_communityID"}},{"kind":"Field","name":{"kind":"Name","value":"dumpster_houseNumbers"}},{"kind":"Field","name":{"kind":"Name","value":"dumpster_hasError"}},{"kind":"Field","name":{"kind":"Name","value":"contracts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dumpsterContract_ID"}},{"kind":"Field","name":{"kind":"Name","value":"dumpsterContract_number"}},{"kind":"Field","name":{"kind":"Name","value":"dumpsterContract_dumpsterID"}},{"kind":"Field","name":{"kind":"Name","value":"dumpsterContract_dateFrom"}},{"kind":"Field","name":{"kind":"Name","value":"dumpsterContract_dateTo"}},{"kind":"Field","name":{"kind":"Name","value":"dumpsterContract_statusID"}},{"kind":"Field","name":{"kind":"Name","value":"dumpsterContract_communityID"}},{"kind":"Field","name":{"kind":"Name","value":"rates"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"rate_ID"}},{"kind":"Field","name":{"kind":"Name","value":"rate_value"}},{"kind":"Field","name":{"kind":"Name","value":"rate_dumpsterContractID"}},{"kind":"Field","name":{"kind":"Name","value":"rate_typeID"}},{"kind":"Field","name":{"kind":"Name","value":"rate_statusID"}},{"kind":"Field","name":{"kind":"Name","value":"rate_userContractID"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"bins"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dumpsterBin_ID"}},{"kind":"Field","name":{"kind":"Name","value":"dumpsterBin_dumpsterID"}},{"kind":"Field","name":{"kind":"Name","value":"dumpsterBin_isFull"}},{"kind":"Field","name":{"kind":"Name","value":"dumpsterBin_typeID"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<CompanyDumpstersGetQuery, CompanyDumpstersGetQueryVariables>;
export const OfficialBinGetDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"OfficialBinGet"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"props"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"OfficialBinGetQueryProps"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"official"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"bins"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"get"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"props"},"value":{"kind":"Variable","name":{"kind":"Name","value":"props"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dumpsterBin_ID"}},{"kind":"Field","name":{"kind":"Name","value":"dumpsterBin_dumpsterID"}},{"kind":"Field","name":{"kind":"Name","value":"dumpsterBin_isFull"}},{"kind":"Field","name":{"kind":"Name","value":"dumpsterBin_typeID"}}]}}]}}]}}]}}]} as unknown as DocumentNode<OfficialBinGetQuery, OfficialBinGetQueryVariables>;
export const LoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Login"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"props"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AuthLoginMutationProps"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"auth"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"props"},"value":{"kind":"Variable","name":{"kind":"Name","value":"props"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]}}]} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const ChangePasswordMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ChangePasswordMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"props"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ChangePasswordMutationProps"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"passwordRecovery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"resetPassword"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"props"},"value":{"kind":"Variable","name":{"kind":"Name","value":"props"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<ChangePasswordMutationMutation, ChangePasswordMutationMutationVariables>;
export const UserRecoveryTokenQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"UserRecoveryTokenQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"props"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UserIDProps"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"passwordRecovery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"compare"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"props"},"value":{"kind":"Variable","name":{"kind":"Name","value":"props"}}}]}]}}]}}]}}]} as unknown as DocumentNode<UserRecoveryTokenQueryQuery, UserRecoveryTokenQueryQueryVariables>;
export const IsUserExistDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"IsUserExist"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"props"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"IsUserExistProps"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"passwordRecovery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"get"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"props"},"value":{"kind":"Variable","name":{"kind":"Name","value":"props"}}}]}]}}]}}]}}]} as unknown as DocumentNode<IsUserExistMutation, IsUserExistMutationVariables>;
export const CreateUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"props"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AuthRegisterMutationProps"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"auth"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"register"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"props"},"value":{"kind":"Variable","name":{"kind":"Name","value":"props"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]}}]} as unknown as DocumentNode<CreateUserMutation, CreateUserMutationVariables>;
export const OfficialCreateUserAddDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"OfficialCreateUserAdd"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"props"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"OfficialCreateUserAddMutationProps"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"official"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"add"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"props"},"value":{"kind":"Variable","name":{"kind":"Name","value":"props"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<OfficialCreateUserAddMutation, OfficialCreateUserAddMutationVariables>;
export const OfficialCardsApplicationsVerifyDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"OfficialCardsApplicationsVerify"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"props"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"OfficialCardsApplicationsVerifyMutationProps"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"official"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"applications"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cards"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"verify"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"props"},"value":{"kind":"Variable","name":{"kind":"Name","value":"props"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<OfficialCardsApplicationsVerifyMutation, OfficialCardsApplicationsVerifyMutationVariables>;
export const OfficialAddressInfoApplicationsVerifyDeleteDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"OfficialAddressInfoApplicationsVerifyDelete"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"props"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"OfficialDeleteAddressInfoApplicationsVerifyMutationProps"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"official"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"applications"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addressInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"verifyDelete"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"props"},"value":{"kind":"Variable","name":{"kind":"Name","value":"props"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<OfficialAddressInfoApplicationsVerifyDeleteMutation, OfficialAddressInfoApplicationsVerifyDeleteMutationVariables>;
export const OfficialDumpstersApplicationsVerifyAddDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"OfficialDumpstersApplicationsVerifyAdd"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"props"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"OfficialAddDumpstersApplicationsVerifyMutationProps"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"official"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"applications"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dumpsters"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"verifyAdd"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"props"},"value":{"kind":"Variable","name":{"kind":"Name","value":"props"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<OfficialDumpstersApplicationsVerifyAddMutation, OfficialDumpstersApplicationsVerifyAddMutationVariables>;
export const OfficialAddressInfoApplicationsVerifyEditDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"OfficialAddressInfoApplicationsVerifyEdit"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"props"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"OfficialEditAddressInfoApplicationsVerifyMutationProps"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"official"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"applications"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addressInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"verifyEdit"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"props"},"value":{"kind":"Variable","name":{"kind":"Name","value":"props"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<OfficialAddressInfoApplicationsVerifyEditMutation, OfficialAddressInfoApplicationsVerifyEditMutationVariables>;
export const OfficialUserInfoApplicationsVerifyEditDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"OfficialUserInfoApplicationsVerifyEdit"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"props"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"OfficialEditUserInfoApplicationsVerifyMutationProps"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"official"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"applications"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"verifyEdit"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"props"},"value":{"kind":"Variable","name":{"kind":"Name","value":"props"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<OfficialUserInfoApplicationsVerifyEditMutation, OfficialUserInfoApplicationsVerifyEditMutationVariables>;
export const OfficialAddressInfoApplicationsVerifyAddDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"OfficialAddressInfoApplicationsVerifyAdd"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"props"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"OfficialAddAddressInfoApplicationsVerifyMutationProps"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"official"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"applications"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addressInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"verifyAdd"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"props"},"value":{"kind":"Variable","name":{"kind":"Name","value":"props"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<OfficialAddressInfoApplicationsVerifyAddMutation, OfficialAddressInfoApplicationsVerifyAddMutationVariables>;
export const OfficialNewUserApplicationVerifyDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"OfficialNewUserApplicationVerify"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"props"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"OfficialNewUserApplicationVerifyMutationProps"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"official"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"applications"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"newUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"verify"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"props"},"value":{"kind":"Variable","name":{"kind":"Name","value":"props"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<OfficialNewUserApplicationVerifyMutation, OfficialNewUserApplicationVerifyMutationVariables>;
export const OfficialDumpstersGetDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"OfficialDumpstersGet"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"official"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dumpsters"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"get"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dumpster_ID"}},{"kind":"Field","name":{"kind":"Name","value":"dumpster_name"}},{"kind":"Field","name":{"kind":"Name","value":"dumpster_description"}},{"kind":"Field","name":{"kind":"Name","value":"dumpster_street"}},{"kind":"Field","name":{"kind":"Name","value":"dumpster_city"}},{"kind":"Field","name":{"kind":"Name","value":"dumpster_postCode"}},{"kind":"Field","name":{"kind":"Name","value":"dumpster_communityID"}},{"kind":"Field","name":{"kind":"Name","value":"dumpster_houseNumbers"}},{"kind":"Field","name":{"kind":"Name","value":"dumpster_hasError"}},{"kind":"Field","name":{"kind":"Name","value":"bins"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dumpsterBin_typeID"}},{"kind":"Field","name":{"kind":"Name","value":"dumpsterBin_isFull"}}]}},{"kind":"Field","name":{"kind":"Name","value":"contracts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dumpsterContract_dateTo"}},{"kind":"Field","name":{"kind":"Name","value":"dumpsterContract_ID"}},{"kind":"Field","name":{"kind":"Name","value":"dumpsterContract_number"}},{"kind":"Field","name":{"kind":"Name","value":"dumpsterContract_dateFrom"}},{"kind":"Field","name":{"kind":"Name","value":"dumpsterContract_statusID"}},{"kind":"Field","name":{"kind":"Name","value":"dumpsterContract_dumpsterID"}},{"kind":"Field","name":{"kind":"Name","value":"rates"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"rate_ID"}},{"kind":"Field","name":{"kind":"Name","value":"rate_typeID"}},{"kind":"Field","name":{"kind":"Name","value":"rate_value"}},{"kind":"Field","name":{"kind":"Name","value":"rate_statusID"}}]}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<OfficialDumpstersGetQuery, OfficialDumpstersGetQueryVariables>;
export const OfficialUserInfoEditDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"OfficialUserInfoEdit"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"props"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"OfficialUserInfoEditMutationProps"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"official"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"info"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edit"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"props"},"value":{"kind":"Variable","name":{"kind":"Name","value":"props"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<OfficialUserInfoEditMutation, OfficialUserInfoEditMutationVariables>;
export const OfficialAddressInfoAddDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"OfficialAddressInfoAdd"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"props"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"OfficialAddressInfoAddMutationProps"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"official"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"address"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"add"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"props"},"value":{"kind":"Variable","name":{"kind":"Name","value":"props"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<OfficialAddressInfoAddMutation, OfficialAddressInfoAddMutationVariables>;
export const OfficialCardsAddDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"OfficialCardsAdd"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"props"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"OfficialCardsAddMutationProps"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"official"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cards"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"add"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"props"},"value":{"kind":"Variable","name":{"kind":"Name","value":"props"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<OfficialCardsAddMutation, OfficialCardsAddMutationVariables>;
export const OfficialUserContractsAddDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"OfficialUserContractsAdd"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"props"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"OfficialUserContractsAddMutationProps"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"official"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userContracts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"add"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"props"},"value":{"kind":"Variable","name":{"kind":"Name","value":"props"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<OfficialUserContractsAddMutation, OfficialUserContractsAddMutationVariables>;
export const OfficialUsersDeleteDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"OfficialUsersDelete"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"props"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"OfficialDeleteUserMutationProps"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"official"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"users"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"delete"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"props"},"value":{"kind":"Variable","name":{"kind":"Name","value":"props"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<OfficialUsersDeleteMutation, OfficialUsersDeleteMutationVariables>;
export const OfficialAddressInfoDeleteDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"OfficialAddressInfoDelete"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"props"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"OfficialAddressInfoDeleteMutationProps"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"official"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"address"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"delete"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"props"},"value":{"kind":"Variable","name":{"kind":"Name","value":"props"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<OfficialAddressInfoDeleteMutation, OfficialAddressInfoDeleteMutationVariables>;
export const OfficialAddressInfoEditDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"OfficialAddressInfoEdit"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"props"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"OfficialAddressInfoEditMutationProps"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"official"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"address"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edit"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"props"},"value":{"kind":"Variable","name":{"kind":"Name","value":"props"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<OfficialAddressInfoEditMutation, OfficialAddressInfoEditMutationVariables>;
export const OfficialDumpstersAddDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"OfficialDumpstersAdd"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"props"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"OfficialDumpstersAddMutationProps"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"official"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dumpsters"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"add"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"props"},"value":{"kind":"Variable","name":{"kind":"Name","value":"props"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<OfficialDumpstersAddMutation, OfficialDumpstersAddMutationVariables>;
export const CommonDumpstersGet1Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CommonDumpstersGet1"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"props"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CommonDumpstersGetQueryProps"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"common"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dumpsters"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"get"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"props"},"value":{"kind":"Variable","name":{"kind":"Name","value":"props"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dumpster_ID"}},{"kind":"Field","name":{"kind":"Name","value":"dumpster_name"}},{"kind":"Field","name":{"kind":"Name","value":"dumpster_description"}},{"kind":"Field","name":{"kind":"Name","value":"dumpster_street"}},{"kind":"Field","name":{"kind":"Name","value":"dumpster_city"}},{"kind":"Field","name":{"kind":"Name","value":"dumpster_postCode"}},{"kind":"Field","name":{"kind":"Name","value":"dumpster_communityID"}},{"kind":"Field","name":{"kind":"Name","value":"dumpster_houseNumbers"}},{"kind":"Field","name":{"kind":"Name","value":"dumpster_hasError"}}]}}]}}]}}]}}]} as unknown as DocumentNode<CommonDumpstersGet1Query, CommonDumpstersGet1QueryVariables>;
export const OfficialDumpstersDeleteDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"OfficialDumpstersDelete"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"props"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"OfficialDumpstersDeleteMutationProps"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"official"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dumpsters"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"delete"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"props"},"value":{"kind":"Variable","name":{"kind":"Name","value":"props"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<OfficialDumpstersDeleteMutation, OfficialDumpstersDeleteMutationVariables>;
export const OfficialCardsEditDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"OfficialCardsEdit"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"props"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"OfficialCardsEditMutationProps"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"official"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cards"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edit"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"props"},"value":{"kind":"Variable","name":{"kind":"Name","value":"props"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<OfficialCardsEditMutation, OfficialCardsEditMutationVariables>;
export const OfficialUserContractsArchivizeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"OfficialUserContractsArchivize"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"props"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"OfficialUserContractsArchivizeMutationProps"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"official"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userContracts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"archivize"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"props"},"value":{"kind":"Variable","name":{"kind":"Name","value":"props"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<OfficialUserContractsArchivizeMutation, OfficialUserContractsArchivizeMutationVariables>;
export const OfficialUserContractsEditDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"OfficialUserContractsEdit"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"props"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"OfficialUserContractsEditMutationProps"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"official"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userContracts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edit"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"props"},"value":{"kind":"Variable","name":{"kind":"Name","value":"props"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<OfficialUserContractsEditMutation, OfficialUserContractsEditMutationVariables>;
export const SuperOfficialOfficialAddDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SuperOfficialOfficialAdd"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"props"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SuperOfficialNewOfficialAddMutationProps"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"official"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"officials"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"add"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"props"},"value":{"kind":"Variable","name":{"kind":"Name","value":"props"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<SuperOfficialOfficialAddMutation, SuperOfficialOfficialAddMutationVariables>;
export const SuperOfficialOfficialDeleteDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SuperOfficialOfficialDelete"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"props"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SuperOfficialOfficialDeleteMutationProps"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"official"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"officials"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"delete"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"props"},"value":{"kind":"Variable","name":{"kind":"Name","value":"props"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<SuperOfficialOfficialDeleteMutation, SuperOfficialOfficialDeleteMutationVariables>;
export const SuperOfficialOfficialEditDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SuperOfficialOfficialEdit"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"props"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SuperOfficialOfficialEditMutationProps"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"official"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"officials"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edit"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"props"},"value":{"kind":"Variable","name":{"kind":"Name","value":"props"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<SuperOfficialOfficialEditMutation, SuperOfficialOfficialEditMutationVariables>;
export const SuperOfficialOfficialsGetDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SuperOfficialOfficialsGet"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"official"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"officials"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"get"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"users_ID"}},{"kind":"Field","name":{"kind":"Name","value":"users_login"}},{"kind":"Field","name":{"kind":"Name","value":"users_name"}},{"kind":"Field","name":{"kind":"Name","value":"users_identificationNumber"}},{"kind":"Field","name":{"kind":"Name","value":"users_phoneNumber"}},{"kind":"Field","name":{"kind":"Name","value":"users_typeID"}},{"kind":"Field","name":{"kind":"Name","value":"users_statusID"}},{"kind":"Field","name":{"kind":"Name","value":"addresses"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"usersAddress_ID"}},{"kind":"Field","name":{"kind":"Name","value":"usersAddress_userID"}},{"kind":"Field","name":{"kind":"Name","value":"usersAddress_street"}},{"kind":"Field","name":{"kind":"Name","value":"usersAddress_houseNumber"}},{"kind":"Field","name":{"kind":"Name","value":"usersAddress_apartamentNumber"}},{"kind":"Field","name":{"kind":"Name","value":"usersAddress_postCode"}},{"kind":"Field","name":{"kind":"Name","value":"usersAddress_city"}},{"kind":"Field","name":{"kind":"Name","value":"usersAddress_typeID"}},{"kind":"Field","name":{"kind":"Name","value":"usersAddress_communityID"}},{"kind":"Field","name":{"kind":"Name","value":"usersAddress_statusID"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<SuperOfficialOfficialsGetQuery, SuperOfficialOfficialsGetQueryVariables>;
export const SuperOfficialOfficialRestoreDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SuperOfficialOfficialRestore"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"props"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SuperOfficialOfficialRestoreMutationProps"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"official"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"officials"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"restore"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"props"},"value":{"kind":"Variable","name":{"kind":"Name","value":"props"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<SuperOfficialOfficialRestoreMutation, SuperOfficialOfficialRestoreMutationVariables>;
export const OfficialApplicationsArchiveGetDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"OfficialApplicationsArchiveGet"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"official"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"applications"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"archive"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"get"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addressApplications"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addressApplications_ID"}},{"kind":"Field","name":{"kind":"Name","value":"addressApplications_typeID"}},{"kind":"Field","name":{"kind":"Name","value":"addressApplications_addressTypeID"}},{"kind":"Field","name":{"kind":"Name","value":"addressApplications_userName"}},{"kind":"Field","name":{"kind":"Name","value":"addressApplications_statusID"}},{"kind":"Field","name":{"kind":"Name","value":"addressApplications_dateAdded"}},{"kind":"Field","name":{"kind":"Name","value":"addressApplications_userLogin"}},{"kind":"Field","name":{"kind":"Name","value":"addressApplications_userIdentificationNumber"}},{"kind":"Field","name":{"kind":"Name","value":"addressApplications_street"}},{"kind":"Field","name":{"kind":"Name","value":"addressApplications_houseNumber"}},{"kind":"Field","name":{"kind":"Name","value":"addressApplications_apartamentNumber"}},{"kind":"Field","name":{"kind":"Name","value":"addressApplications_postCode"}},{"kind":"Field","name":{"kind":"Name","value":"addressApplications_city"}},{"kind":"Field","name":{"kind":"Name","value":"addressApplications_dateReviewed"}}]}},{"kind":"Field","name":{"kind":"Name","value":"dumpstersApplications"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dumpstersApplications_ID"}},{"kind":"Field","name":{"kind":"Name","value":"dumpstersApplications_typeID"}},{"kind":"Field","name":{"kind":"Name","value":"dumpstersApplications_userName"}},{"kind":"Field","name":{"kind":"Name","value":"dumpstersApplications_statusID"}},{"kind":"Field","name":{"kind":"Name","value":"dumpstersApplications_dateAdded"}},{"kind":"Field","name":{"kind":"Name","value":"dumpstersApplications_userLogin"}},{"kind":"Field","name":{"kind":"Name","value":"dumpstersApplications_userIdentificationNumber"}},{"kind":"Field","name":{"kind":"Name","value":"dumpstersApplications_cardNumber"}},{"kind":"Field","name":{"kind":"Name","value":"dumpstersApplications_dumpsterNumber"}},{"kind":"Field","name":{"kind":"Name","value":"dumpstersApplications_dateReviewed"}}]}},{"kind":"Field","name":{"kind":"Name","value":"cardsApplications"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cardsApplications_ID"}},{"kind":"Field","name":{"kind":"Name","value":"cardsApplications_typeID"}},{"kind":"Field","name":{"kind":"Name","value":"cardsApplications_userName"}},{"kind":"Field","name":{"kind":"Name","value":"cardsApplications_statusID"}},{"kind":"Field","name":{"kind":"Name","value":"cardsApplications_dateAdded"}},{"kind":"Field","name":{"kind":"Name","value":"cardsApplications_userName"}},{"kind":"Field","name":{"kind":"Name","value":"cardsApplications_userLogin"}},{"kind":"Field","name":{"kind":"Name","value":"cardsApplications_userIdentificationNumber"}},{"kind":"Field","name":{"kind":"Name","value":"cardsApplications_dateReviewed"}}]}},{"kind":"Field","name":{"kind":"Name","value":"personalDataApplications"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"personalDataApplications_ID"}},{"kind":"Field","name":{"kind":"Name","value":"personalDataApplications_userName"}},{"kind":"Field","name":{"kind":"Name","value":"personalDataApplications_statusID"}},{"kind":"Field","name":{"kind":"Name","value":"personalDataApplications_dateAdded"}},{"kind":"Field","name":{"kind":"Name","value":"personalDataApplications_userLogin"}},{"kind":"Field","name":{"kind":"Name","value":"personalDataApplications_userIdentificationNumber"}},{"kind":"Field","name":{"kind":"Name","value":"personalDataApplications_name"}},{"kind":"Field","name":{"kind":"Name","value":"personalDataApplications_dateReviewed"}}]}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<OfficialApplicationsArchiveGetQuery, OfficialApplicationsArchiveGetQueryVariables>;
export const OfficialUserGetDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"OfficialUserGet"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"props"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"OfficialSelectedUserDataGetQueryProps"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"official"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"get"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"result"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"props"},"value":{"kind":"Variable","name":{"kind":"Name","value":"props"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userType"}},{"kind":"Field","name":{"kind":"Name","value":"basicInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"users_name"}},{"kind":"Field","name":{"kind":"Name","value":"users_identificationNumber"}},{"kind":"Field","name":{"kind":"Name","value":"users_login"}},{"kind":"Field","name":{"kind":"Name","value":"users_phoneNumber"}},{"kind":"Field","name":{"kind":"Name","value":"users_ID"}},{"kind":"Field","name":{"kind":"Name","value":"users_statusID"}}]}},{"kind":"Field","name":{"kind":"Name","value":"cards"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"usersCards_statusID"}},{"kind":"Field","name":{"kind":"Name","value":"usersCards_ID"}},{"kind":"Field","name":{"kind":"Name","value":"usersCards_number"}},{"kind":"Field","name":{"kind":"Name","value":"usersCards_numberPIN"}},{"kind":"Field","name":{"kind":"Name","value":"dumpsters"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dumpster_name"}},{"kind":"Field","name":{"kind":"Name","value":"dumpster_city"}},{"kind":"Field","name":{"kind":"Name","value":"dumpster_street"}},{"kind":"Field","name":{"kind":"Name","value":"dumpster_houseNumbers"}},{"kind":"Field","name":{"kind":"Name","value":"dumpster_ID"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"addressInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"usersAddress_typeID"}},{"kind":"Field","name":{"kind":"Name","value":"usersAddress_ID"}},{"kind":"Field","name":{"kind":"Name","value":"usersAddress_street"}},{"kind":"Field","name":{"kind":"Name","value":"usersAddress_houseNumber"}},{"kind":"Field","name":{"kind":"Name","value":"usersAddress_apartamentNumber"}},{"kind":"Field","name":{"kind":"Name","value":"usersAddress_postCode"}},{"kind":"Field","name":{"kind":"Name","value":"usersAddress_city"}},{"kind":"Field","name":{"kind":"Name","value":"usersAddress_communityID"}}]}},{"kind":"Field","name":{"kind":"Name","value":"contracts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userContracts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"usersContract_ID"}},{"kind":"Field","name":{"kind":"Name","value":"usersContract_userID"}},{"kind":"Field","name":{"kind":"Name","value":"usersContract_number"}},{"kind":"Field","name":{"kind":"Name","value":"usersContract_dateFrom"}},{"kind":"Field","name":{"kind":"Name","value":"usersContract_dateTo"}},{"kind":"Field","name":{"kind":"Name","value":"usersContract_statusID"}},{"kind":"Field","name":{"kind":"Name","value":"usersContract_communityID"}},{"kind":"Field","name":{"kind":"Name","value":"rates"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"paper"}},{"kind":"Field","name":{"kind":"Name","value":"plastic"}},{"kind":"Field","name":{"kind":"Name","value":"glass"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"mixed"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"housingAssociationContracts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dumpsterContract_ID"}},{"kind":"Field","name":{"kind":"Name","value":"dumpsterContract_number"}},{"kind":"Field","name":{"kind":"Name","value":"dumpsterContract_dumpsterID"}},{"kind":"Field","name":{"kind":"Name","value":"dumpsterContract_dateFrom"}},{"kind":"Field","name":{"kind":"Name","value":"dumpsterContract_dateTo"}},{"kind":"Field","name":{"kind":"Name","value":"dumpsterContract_statusID"}},{"kind":"Field","name":{"kind":"Name","value":"dumpsterContract_communityID"}},{"kind":"Field","name":{"kind":"Name","value":"rates"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"paper"}},{"kind":"Field","name":{"kind":"Name","value":"plastic"}},{"kind":"Field","name":{"kind":"Name","value":"glass"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"mixed"}}]}}]}}]}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<OfficialUserGetQuery, OfficialUserGetQueryVariables>;
export const OfficialNewUsersApplicationGetDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"OfficialNewUsersApplicationGet"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"props"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"OfficialApplicationsNewUsersQueryProps"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"official"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"applications"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"newUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"get"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"props"},"value":{"kind":"Variable","name":{"kind":"Name","value":"props"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"users_ID"}},{"kind":"Field","name":{"kind":"Name","value":"users_login"}},{"kind":"Field","name":{"kind":"Name","value":"users_name"}},{"kind":"Field","name":{"kind":"Name","value":"users_identificationNumber"}},{"kind":"Field","name":{"kind":"Name","value":"users_phoneNumber"}},{"kind":"Field","name":{"kind":"Name","value":"users_statusID"}},{"kind":"Field","name":{"kind":"Name","value":"addresses"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"usersAddress_street"}},{"kind":"Field","name":{"kind":"Name","value":"usersAddress_houseNumber"}},{"kind":"Field","name":{"kind":"Name","value":"usersAddress_apartamentNumber"}},{"kind":"Field","name":{"kind":"Name","value":"usersAddress_postCode"}},{"kind":"Field","name":{"kind":"Name","value":"usersAddress_city"}}]}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<OfficialNewUsersApplicationGetQuery, OfficialNewUsersApplicationGetQueryVariables>;
export const OfficialUserInfoApplicationGetDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"OfficialUserInfoApplicationGet"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"props"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"OfficialApplicationsUserInfoQueryProps"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"official"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"applications"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"get"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"props"},"value":{"kind":"Variable","name":{"kind":"Name","value":"props"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"personalDataApplications_ID"}},{"kind":"Field","name":{"kind":"Name","value":"personalDataApplications_dateAdded"}},{"kind":"Field","name":{"kind":"Name","value":"personalDataApplications_dateReviewed"}},{"kind":"Field","name":{"kind":"Name","value":"personalDataApplications_typeID"}},{"kind":"Field","name":{"kind":"Name","value":"personalDataApplications_reviewedBy"}},{"kind":"Field","name":{"kind":"Name","value":"personalDataApplications_userID"}},{"kind":"Field","name":{"kind":"Name","value":"personalDataApplications_statusID"}},{"kind":"Field","name":{"kind":"Name","value":"personalDataApplications_name"}},{"kind":"Field","name":{"kind":"Name","value":"personalDataApplications_oldName"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<OfficialUserInfoApplicationGetQuery, OfficialUserInfoApplicationGetQueryVariables>;
export const OfficialCardsApplicationGetDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"OfficialCardsApplicationGet"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"props"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"OfficialApplicationsCardsQueryProps"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"official"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"applications"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cards"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"get"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"props"},"value":{"kind":"Variable","name":{"kind":"Name","value":"props"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cardsApplications_ID"}},{"kind":"Field","name":{"kind":"Name","value":"cardsApplications_dateAdded"}},{"kind":"Field","name":{"kind":"Name","value":"cardsApplications_dateReviewed"}},{"kind":"Field","name":{"kind":"Name","value":"cardsApplications_typeID"}},{"kind":"Field","name":{"kind":"Name","value":"cardsApplications_reviewedBy"}},{"kind":"Field","name":{"kind":"Name","value":"cardsApplications_userID"}},{"kind":"Field","name":{"kind":"Name","value":"cardsApplications_statusID"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"users_name"}},{"kind":"Field","name":{"kind":"Name","value":"users_ID"}}]}},{"kind":"Field","name":{"kind":"Name","value":"dumpsters"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dumpster_ID"}},{"kind":"Field","name":{"kind":"Name","value":"dumpster_name"}}]}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<OfficialCardsApplicationGetQuery, OfficialCardsApplicationGetQueryVariables>;
export const OfficialDumpstersApplicationGetDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"OfficialDumpstersApplicationGet"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"props"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"OfficialApplicationsDumpstersQueryProps"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"official"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"applications"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dumpsters"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"get"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"props"},"value":{"kind":"Variable","name":{"kind":"Name","value":"props"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dumpstersApplications_ID"}},{"kind":"Field","name":{"kind":"Name","value":"dumpstersApplications_dateAdded"}},{"kind":"Field","name":{"kind":"Name","value":"dumpstersApplications_dateReviewed"}},{"kind":"Field","name":{"kind":"Name","value":"dumpstersApplications_typeID"}},{"kind":"Field","name":{"kind":"Name","value":"dumpstersApplications_reviewedBy"}},{"kind":"Field","name":{"kind":"Name","value":"dumpstersApplications_userID"}},{"kind":"Field","name":{"kind":"Name","value":"dumpstersApplications_dumpsterID"}},{"kind":"Field","name":{"kind":"Name","value":"dumpstersApplications_statusID"}},{"kind":"Field","name":{"kind":"Name","value":"dumpstersApplications_cardID"}},{"kind":"Field","name":{"kind":"Name","value":"dumpstersApplications_dumpsterName"}},{"kind":"Field","name":{"kind":"Name","value":"dumpstersApplications_userName"}},{"kind":"Field","name":{"kind":"Name","value":"dumpstersApplications_cardNumber"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<OfficialDumpstersApplicationGetQuery, OfficialDumpstersApplicationGetQueryVariables>;
export const OfficialAddressInfoApplicationGetDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"OfficialAddressInfoApplicationGet"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"props"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"OfficialApplicationsAddressInfoQueryProps"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"official"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"applications"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addressInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"get"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"props"},"value":{"kind":"Variable","name":{"kind":"Name","value":"props"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addressApplications_ID"}},{"kind":"Field","name":{"kind":"Name","value":"addressApplications_dateAdded"}},{"kind":"Field","name":{"kind":"Name","value":"addressApplications_dateReviewed"}},{"kind":"Field","name":{"kind":"Name","value":"addressApplications_typeID"}},{"kind":"Field","name":{"kind":"Name","value":"addressApplications_reviewedBy"}},{"kind":"Field","name":{"kind":"Name","value":"addressApplications_userID"}},{"kind":"Field","name":{"kind":"Name","value":"addressApplications_statusID"}},{"kind":"Field","name":{"kind":"Name","value":"addressApplications_street"}},{"kind":"Field","name":{"kind":"Name","value":"addressApplications_houseNumber"}},{"kind":"Field","name":{"kind":"Name","value":"addressApplications_apartamentNumber"}},{"kind":"Field","name":{"kind":"Name","value":"addressApplications_postCode"}},{"kind":"Field","name":{"kind":"Name","value":"addressApplications_city"}},{"kind":"Field","name":{"kind":"Name","value":"addressApplications_addressTypeID"}},{"kind":"Field","name":{"kind":"Name","value":"addressApplications_communityID"}},{"kind":"Field","name":{"kind":"Name","value":"addressApplications_addressID"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"users_ID"}},{"kind":"Field","name":{"kind":"Name","value":"users_name"}}]}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<OfficialAddressInfoApplicationGetQuery, OfficialAddressInfoApplicationGetQueryVariables>;
export const OfficialAddressInfoApplicationGet3Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"OfficialAddressInfoApplicationGet3"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"props"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"OfficialApplicationsAddressInfoQueryProps"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"official"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"applications"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addressInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"get"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"props"},"value":{"kind":"Variable","name":{"kind":"Name","value":"props"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addressApplications_ID"}},{"kind":"Field","name":{"kind":"Name","value":"addressApplications_dateAdded"}},{"kind":"Field","name":{"kind":"Name","value":"addressApplications_dateReviewed"}},{"kind":"Field","name":{"kind":"Name","value":"addressApplications_typeID"}},{"kind":"Field","name":{"kind":"Name","value":"addressApplications_reviewedBy"}},{"kind":"Field","name":{"kind":"Name","value":"addressApplications_userID"}},{"kind":"Field","name":{"kind":"Name","value":"addressApplications_statusID"}},{"kind":"Field","name":{"kind":"Name","value":"addressApplications_street"}},{"kind":"Field","name":{"kind":"Name","value":"addressApplications_houseNumber"}},{"kind":"Field","name":{"kind":"Name","value":"addressApplications_apartamentNumber"}},{"kind":"Field","name":{"kind":"Name","value":"addressApplications_postCode"}},{"kind":"Field","name":{"kind":"Name","value":"addressApplications_city"}},{"kind":"Field","name":{"kind":"Name","value":"addressApplications_addressTypeID"}},{"kind":"Field","name":{"kind":"Name","value":"addressApplications_communityID"}},{"kind":"Field","name":{"kind":"Name","value":"addressApplications_addressID"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"users_ID"}},{"kind":"Field","name":{"kind":"Name","value":"users_name"}}]}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<OfficialAddressInfoApplicationGet3Query, OfficialAddressInfoApplicationGet3QueryVariables>;
export const OfficialAddressInfoApplicationGet2Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"OfficialAddressInfoApplicationGet2"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"props"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"OfficialApplicationsAddressInfoQueryProps"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"official"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"applications"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addressInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"get"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"props"},"value":{"kind":"Variable","name":{"kind":"Name","value":"props"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addressApplications_ID"}},{"kind":"Field","name":{"kind":"Name","value":"addressApplications_dateAdded"}},{"kind":"Field","name":{"kind":"Name","value":"addressApplications_dateReviewed"}},{"kind":"Field","name":{"kind":"Name","value":"addressApplications_typeID"}},{"kind":"Field","name":{"kind":"Name","value":"addressApplications_reviewedBy"}},{"kind":"Field","name":{"kind":"Name","value":"addressApplications_userID"}},{"kind":"Field","name":{"kind":"Name","value":"addressApplications_statusID"}},{"kind":"Field","name":{"kind":"Name","value":"addressApplications_street"}},{"kind":"Field","name":{"kind":"Name","value":"addressApplications_houseNumber"}},{"kind":"Field","name":{"kind":"Name","value":"addressApplications_apartamentNumber"}},{"kind":"Field","name":{"kind":"Name","value":"addressApplications_postCode"}},{"kind":"Field","name":{"kind":"Name","value":"addressApplications_city"}},{"kind":"Field","name":{"kind":"Name","value":"addressApplications_addressTypeID"}},{"kind":"Field","name":{"kind":"Name","value":"addressApplications_communityID"}},{"kind":"Field","name":{"kind":"Name","value":"addressApplications_addressID"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"users_ID"}},{"kind":"Field","name":{"kind":"Name","value":"users_name"}}]}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<OfficialAddressInfoApplicationGet2Query, OfficialAddressInfoApplicationGet2QueryVariables>;
export const UserApplicationCancelDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UserApplicationCancel"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"props"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UserApplicationCancelMutationProps"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"applications"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cancel"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"props"},"value":{"kind":"Variable","name":{"kind":"Name","value":"props"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<UserApplicationCancelMutation, UserApplicationCancelMutationVariables>;
export const UserApplicationsGetDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"UserApplicationsGet"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"applications"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"get"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cards"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cardsApplications_ID"}},{"kind":"Field","name":{"kind":"Name","value":"cardsApplications_userID"}},{"kind":"Field","name":{"kind":"Name","value":"cardsApplications_statusID"}},{"kind":"Field","name":{"kind":"Name","value":"cardsApplications_typeID"}},{"kind":"Field","name":{"kind":"Name","value":"cardsApplications_dateAdded"}},{"kind":"Field","name":{"kind":"Name","value":"cardsApplications_dateReviewed"}}]}},{"kind":"Field","name":{"kind":"Name","value":"dumpsters"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dumpstersApplications_statusID"}},{"kind":"Field","name":{"kind":"Name","value":"dumpstersApplications_typeID"}},{"kind":"Field","name":{"kind":"Name","value":"dumpstersApplications_ID"}},{"kind":"Field","name":{"kind":"Name","value":"dumpstersApplications_dateAdded"}},{"kind":"Field","name":{"kind":"Name","value":"dumpstersApplications_cardID"}},{"kind":"Field","name":{"kind":"Name","value":"dumpstersApplications_dumpsterID"}},{"kind":"Field","name":{"kind":"Name","value":"dumpstersApplications_dateReviewed"}},{"kind":"Field","name":{"kind":"Name","value":"dumpstersApplications_ID"}}]}},{"kind":"Field","name":{"kind":"Name","value":"address"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addressApplications_statusID"}},{"kind":"Field","name":{"kind":"Name","value":"addressApplications_ID"}},{"kind":"Field","name":{"kind":"Name","value":"addressApplications_typeID"}},{"kind":"Field","name":{"kind":"Name","value":"addressApplications_addressTypeID"}},{"kind":"Field","name":{"kind":"Name","value":"addressApplications_dateAdded"}},{"kind":"Field","name":{"kind":"Name","value":"addressApplications_street"}},{"kind":"Field","name":{"kind":"Name","value":"addressApplications_houseNumber"}},{"kind":"Field","name":{"kind":"Name","value":"addressApplications_apartamentNumber"}},{"kind":"Field","name":{"kind":"Name","value":"addressApplications_postCode"}},{"kind":"Field","name":{"kind":"Name","value":"addressApplications_city"}},{"kind":"Field","name":{"kind":"Name","value":"addressApplications_dateReviewed"}}]}},{"kind":"Field","name":{"kind":"Name","value":"personalData"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"personalDataApplications_statusID"}},{"kind":"Field","name":{"kind":"Name","value":"personalDataApplications_ID"}},{"kind":"Field","name":{"kind":"Name","value":"personalDataApplications_dateAdded"}},{"kind":"Field","name":{"kind":"Name","value":"personalDataApplications_name"}},{"kind":"Field","name":{"kind":"Name","value":"personalDataApplications_dateReviewed"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<UserApplicationsGetQuery, UserApplicationsGetQueryVariables>;
export const CommonDumpstersGetDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CommonDumpstersGet"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"props"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CommonDumpstersGetQueryProps"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"common"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dumpsters"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"get"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"props"},"value":{"kind":"Variable","name":{"kind":"Name","value":"props"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dumpster_ID"}},{"kind":"Field","name":{"kind":"Name","value":"dumpster_name"}},{"kind":"Field","name":{"kind":"Name","value":"dumpster_description"}},{"kind":"Field","name":{"kind":"Name","value":"dumpster_street"}},{"kind":"Field","name":{"kind":"Name","value":"dumpster_city"}},{"kind":"Field","name":{"kind":"Name","value":"dumpster_postCode"}},{"kind":"Field","name":{"kind":"Name","value":"dumpster_communityID"}},{"kind":"Field","name":{"kind":"Name","value":"dumpster_houseNumbers"}},{"kind":"Field","name":{"kind":"Name","value":"dumpster_hasError"}}]}}]}}]}}]}}]} as unknown as DocumentNode<CommonDumpstersGetQuery, CommonDumpstersGetQueryVariables>;
export const UserDumpstersAddDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UserDumpstersAdd"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"props"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UserDumpstersAddMutationProps"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dumpsters"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"add"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"props"},"value":{"kind":"Variable","name":{"kind":"Name","value":"props"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<UserDumpstersAddMutation, UserDumpstersAddMutationVariables>;
export const CompanyDumpstersAddDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CompanyDumpstersAdd"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"props"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CompanyDumpstersAddMutationProps"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"company"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dumpsters"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"add"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"props"},"value":{"kind":"Variable","name":{"kind":"Name","value":"props"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<CompanyDumpstersAddMutation, CompanyDumpstersAddMutationVariables>;
export const CommonDumpstersGet5Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CommonDumpstersGet5"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"props"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CommonDumpstersGetQueryProps"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"common"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dumpsters"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"get"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"props"},"value":{"kind":"Variable","name":{"kind":"Name","value":"props"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dumpster_ID"}},{"kind":"Field","name":{"kind":"Name","value":"dumpster_name"}},{"kind":"Field","name":{"kind":"Name","value":"dumpster_description"}},{"kind":"Field","name":{"kind":"Name","value":"dumpster_street"}},{"kind":"Field","name":{"kind":"Name","value":"dumpster_city"}},{"kind":"Field","name":{"kind":"Name","value":"dumpster_postCode"}},{"kind":"Field","name":{"kind":"Name","value":"dumpster_communityID"}},{"kind":"Field","name":{"kind":"Name","value":"dumpster_houseNumbers"}},{"kind":"Field","name":{"kind":"Name","value":"dumpster_hasError"}}]}}]}}]}}]}}]} as unknown as DocumentNode<CommonDumpstersGet5Query, CommonDumpstersGet5QueryVariables>;
export const UserCardsAddDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UserCardsAdd"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"props"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UserCardsAddMutationProps"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cards"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"add"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"props"},"value":{"kind":"Variable","name":{"kind":"Name","value":"props"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<UserCardsAddMutation, UserCardsAddMutationVariables>;
export const UserCardsDeleteDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UserCardsDelete"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"props"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UserCardsDeleteMutationProps"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cards"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"delete"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"props"},"value":{"kind":"Variable","name":{"kind":"Name","value":"props"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<UserCardsDeleteMutation, UserCardsDeleteMutationVariables>;
export const UserDumpstersDeleteDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UserDumpstersDelete"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"props"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UserDumpstersDeleteMutationProps"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dumpsters"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"delete"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"props"},"value":{"kind":"Variable","name":{"kind":"Name","value":"props"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<UserDumpstersDeleteMutation, UserDumpstersDeleteMutationVariables>;
export const UserGarbagesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"UserGarbages"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"props"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UserGarbageGetQueryProps"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"garbage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"get"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"result"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"props"},"value":{"kind":"Variable","name":{"kind":"Name","value":"props"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"pieChart"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total"}},{"kind":"Field","name":{"kind":"Name","value":"garbageTypes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"mass"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"typeID"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"lineChart"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"garbage_sum"}},{"kind":"Field","name":{"kind":"Name","value":"garbage_typeID"}},{"kind":"Field","name":{"kind":"Name","value":"month"}},{"kind":"Field","name":{"kind":"Name","value":"monthIndex"}},{"kind":"Field","name":{"kind":"Name","value":"waste_name"}},{"kind":"Field","name":{"kind":"Name","value":"garbage_fullDate"}}]}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<UserGarbagesQuery, UserGarbagesQueryVariables>;
export const BaseDataUpdateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"BaseDataUpdate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"props"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UserInfoProfileMutationProps"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"info"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"profile"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"props"},"value":{"kind":"Variable","name":{"kind":"Name","value":"props"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<BaseDataUpdateMutation, BaseDataUpdateMutationVariables>;
export const ContactUpdateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ContactUpdate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"props"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UserInfoContactsMutationProps"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"info"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"contacts"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"props"},"value":{"kind":"Variable","name":{"kind":"Name","value":"props"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<ContactUpdateMutation, ContactUpdateMutationVariables>;
export const PinUpdateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"PINUpdate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"props"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UserInfoPINMutationProps"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"info"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"pin"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"props"},"value":{"kind":"Variable","name":{"kind":"Name","value":"props"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<PinUpdateMutation, PinUpdateMutationVariables>;
export const PasswordUpdateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"PasswordUpdate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"props"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UserInfoPasswordMutationProps"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"info"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"password"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"props"},"value":{"kind":"Variable","name":{"kind":"Name","value":"props"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<PasswordUpdateMutation, PasswordUpdateMutationVariables>;
export const UserAddressInfoAddDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UserAddressInfoAdd"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"props"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UserAddressInfoAddMutationProps"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addressInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"add"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"props"},"value":{"kind":"Variable","name":{"kind":"Name","value":"props"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<UserAddressInfoAddMutation, UserAddressInfoAddMutationVariables>;
export const TerritorialDivisonFullData1Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"TerritorialDivisonFullData1"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"props"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"TerritorialFullDataGetQueryProps"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"territorialDivision"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fullData"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"get"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"props"},"value":{"kind":"Variable","name":{"kind":"Name","value":"props"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"voivodeship"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"voivodeship_ID"}},{"kind":"Field","name":{"kind":"Name","value":"voivodeship_name"}},{"kind":"Field","name":{"kind":"Name","value":"voivodeship_description"}}]}},{"kind":"Field","name":{"kind":"Name","value":"municipality"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"municipality_ID"}},{"kind":"Field","name":{"kind":"Name","value":"municipality_name"}},{"kind":"Field","name":{"kind":"Name","value":"municipality_description"}},{"kind":"Field","name":{"kind":"Name","value":"municipality_voivodeshipID"}}]}},{"kind":"Field","name":{"kind":"Name","value":"community"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"community_ID"}},{"kind":"Field","name":{"kind":"Name","value":"community_name"}},{"kind":"Field","name":{"kind":"Name","value":"community_description"}},{"kind":"Field","name":{"kind":"Name","value":"community_voivodeshipID"}},{"kind":"Field","name":{"kind":"Name","value":"community_municipalityID"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<TerritorialDivisonFullData1Query, TerritorialDivisonFullData1QueryVariables>;
export const UserAddressInfoDeleteDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UserAddressInfoDelete"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"props"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UserAddressInfoDeleteMutationProps"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addressInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"delete"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"props"},"value":{"kind":"Variable","name":{"kind":"Name","value":"props"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<UserAddressInfoDeleteMutation, UserAddressInfoDeleteMutationVariables>;
export const UserAddressInfoEditDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UserAddressInfoEdit"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"props"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UserAddressInfoEditMutationProps"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addressInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edit"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"props"},"value":{"kind":"Variable","name":{"kind":"Name","value":"props"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<UserAddressInfoEditMutation, UserAddressInfoEditMutationVariables>;
export const CurrentUser1Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CurrentUser1"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"info"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"get"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userType"}},{"kind":"Field","name":{"kind":"Name","value":"basicInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"users_ID"}}]}},{"kind":"Field","name":{"kind":"Name","value":"cards"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"usersCards_ID"}},{"kind":"Field","name":{"kind":"Name","value":"usersCards_statusID"}},{"kind":"Field","name":{"kind":"Name","value":"usersCards_number"}},{"kind":"Field","name":{"kind":"Name","value":"usersCards_rentedToUserID"}},{"kind":"Field","name":{"kind":"Name","value":"dumpsters"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dumpster_ID"}},{"kind":"Field","name":{"kind":"Name","value":"dumpster_name"}},{"kind":"Field","name":{"kind":"Name","value":"dumpster_city"}},{"kind":"Field","name":{"kind":"Name","value":"dumpster_street"}},{"kind":"Field","name":{"kind":"Name","value":"dumpster_houseNumbers"}}]}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<CurrentUser1Query, CurrentUser1QueryVariables>;
export const UserCardsInfoDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"UserCardsInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"card"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cardsAndDumpsters"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dumpsters"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dumpster_city"}},{"kind":"Field","name":{"kind":"Name","value":"dumpster_houseNumbers"}},{"kind":"Field","name":{"kind":"Name","value":"dumpster_name"}},{"kind":"Field","name":{"kind":"Name","value":"dumpster_street"}}]}},{"kind":"Field","name":{"kind":"Name","value":"usersCards_ID"}},{"kind":"Field","name":{"kind":"Name","value":"usersCards_number"}}]}}]}}]}}]}}]} as unknown as DocumentNode<UserCardsInfoQuery, UserCardsInfoQueryVariables>;
export const UserContractGetDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"UserContractGet"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"contract"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"get"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userContracts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"usersContract_ID"}},{"kind":"Field","name":{"kind":"Name","value":"usersContract_userID"}},{"kind":"Field","name":{"kind":"Name","value":"usersContract_number"}},{"kind":"Field","name":{"kind":"Name","value":"usersContract_dateFrom"}},{"kind":"Field","name":{"kind":"Name","value":"usersContract_dateTo"}},{"kind":"Field","name":{"kind":"Name","value":"usersContract_statusID"}},{"kind":"Field","name":{"kind":"Name","value":"usersContract_communityID"}},{"kind":"Field","name":{"kind":"Name","value":"rates"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"paper"}},{"kind":"Field","name":{"kind":"Name","value":"plastic"}},{"kind":"Field","name":{"kind":"Name","value":"glass"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"mixed"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"housingAssociationContracts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dumpsterContract_ID"}},{"kind":"Field","name":{"kind":"Name","value":"dumpsterContract_number"}},{"kind":"Field","name":{"kind":"Name","value":"dumpsterContract_dumpsterID"}},{"kind":"Field","name":{"kind":"Name","value":"dumpsterContract_dateFrom"}},{"kind":"Field","name":{"kind":"Name","value":"dumpsterContract_dateTo"}},{"kind":"Field","name":{"kind":"Name","value":"dumpsterContract_statusID"}},{"kind":"Field","name":{"kind":"Name","value":"dumpsterContract_communityID"}},{"kind":"Field","name":{"kind":"Name","value":"rates"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"paper"}},{"kind":"Field","name":{"kind":"Name","value":"plastic"}},{"kind":"Field","name":{"kind":"Name","value":"glass"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"mixed"}}]}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<UserContractGetQuery, UserContractGetQueryVariables>;