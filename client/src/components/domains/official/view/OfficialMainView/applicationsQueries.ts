import { graphql } from '@/gql'

export const officialApplicationNewUsersQuery = graphql(`
  query OfficialNewUsersApplicationGet(
    $props: OfficialApplicationsNewUsersQueryProps!
  ) {
    official {
      applications {
        newUser {
          get(props: $props) {
            users_ID
            users_login
            users_name
            users_identificationNumber
            users_phoneNumber
            users_statusID
            addresses {
              usersAddress_street
              usersAddress_houseNumber
              usersAddress_apartamentNumber
              usersAddress_postCode
              usersAddress_city
            }
          }
        }
      }
    }
  }
`)

export const officialApplicationEditUserInfoQuery = graphql(`
  query OfficialUserInfoApplicationGet(
    $props: OfficialApplicationsUserInfoQueryProps!
  ) {
    official {
      applications {
        userInfo {
          get(props: $props) {
            personalDataApplications_ID
            personalDataApplications_dateAdded
            personalDataApplications_dateReviewed
            personalDataApplications_typeID
            personalDataApplications_reviewedBy
            personalDataApplications_userID
            personalDataApplications_statusID
            personalDataApplications_name
            personalDataApplications_oldName
          }
        }
      }
    }
  }
`)

export const officialApplicationCardsQuery = graphql(`
  query OfficialCardsApplicationGet(
    $props: OfficialApplicationsCardsQueryProps!
  ) {
    official {
      applications {
        cards {
          get(props: $props) {
            cardsApplications_ID
            cardsApplications_dateAdded
            cardsApplications_dateReviewed
            cardsApplications_typeID
            cardsApplications_reviewedBy
            cardsApplications_userID
            cardsApplications_statusID
            user {
              users_name
              users_ID
            }
            dumpsters {
              dumpster_ID
              dumpster_name
            }
          }
        }
      }
    }
  }
`)

export const officialApplicationDumpsterAddQuery = graphql(`
  query OfficialDumpstersApplicationGet(
    $props: OfficialApplicationsDumpstersQueryProps!
  ) {
    official {
      applications {
        dumpsters {
          get(props: $props) {
            dumpstersApplications_ID
            dumpstersApplications_dateAdded
            dumpstersApplications_dateReviewed
            dumpstersApplications_typeID
            dumpstersApplications_reviewedBy
            dumpstersApplications_userID
            dumpstersApplications_dumpsterID
            dumpstersApplications_statusID
            dumpstersApplications_cardID
            dumpstersApplications_dumpsterName
            dumpstersApplications_userName
            dumpstersApplications_cardNumber
          }
        }
      }
    }
  }
`)

export const officialApplicationNewAddressQuery = graphql(`
  query OfficialAddressInfoApplicationGet(
    $props: OfficialApplicationsAddressInfoQueryProps!
  ) {
    official {
      applications {
        addressInfo {
          get(props: $props) {
            addressApplications_ID
            addressApplications_dateAdded
            addressApplications_dateReviewed
            addressApplications_typeID
            addressApplications_reviewedBy
            addressApplications_userID
            addressApplications_statusID
            addressApplications_street
            addressApplications_houseNumber
            addressApplications_apartamentNumber
            addressApplications_postCode
            addressApplications_city
            addressApplications_addressTypeID
            addressApplications_communityID
            addressApplications_addressID
            user {
              users_ID
              users_name
            }
          }
        }
      }
    }
  }
`)

export const officialApplicationEditAddressQuery = graphql(`
  query OfficialAddressInfoApplicationGet3(
    $props: OfficialApplicationsAddressInfoQueryProps!
  ) {
    official {
      applications {
        addressInfo {
          get(props: $props) {
            addressApplications_ID
            addressApplications_dateAdded
            addressApplications_dateReviewed
            addressApplications_typeID
            addressApplications_reviewedBy
            addressApplications_userID
            addressApplications_statusID
            addressApplications_street
            addressApplications_houseNumber
            addressApplications_apartamentNumber
            addressApplications_postCode
            addressApplications_city
            addressApplications_addressTypeID
            addressApplications_communityID
            addressApplications_addressID
            user {
              users_ID
              users_name
            }
          }
        }
      }
    }
  }
`)

export const officialApplicationDeleteAddressQuery = graphql(`
  query OfficialAddressInfoApplicationGet2(
    $props: OfficialApplicationsAddressInfoQueryProps!
  ) {
    official {
      applications {
        addressInfo {
          get(props: $props) {
            addressApplications_ID
            addressApplications_dateAdded
            addressApplications_dateReviewed
            addressApplications_typeID
            addressApplications_reviewedBy
            addressApplications_userID
            addressApplications_statusID
            addressApplications_street
            addressApplications_houseNumber
            addressApplications_apartamentNumber
            addressApplications_postCode
            addressApplications_city
            addressApplications_addressTypeID
            addressApplications_communityID
            addressApplications_addressID
            user {
              users_ID
              users_name
            }
          }
        }
      }
    }
  }
`)
