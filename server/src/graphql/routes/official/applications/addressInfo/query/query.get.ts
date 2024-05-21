import { extendType, inputObjectType, nullable } from 'nexus'
import { loggedIn } from '@/utils/routeAuth'

export const OfficialApplicationsAddressInfoQueryProps = inputObjectType({
  name: 'OfficialApplicationsAddressInfoQueryProps',
  definition(t) {
    t.string('users_data')
  },
})

export const OfficialApplicationAddressInfoGetQuery = extendType({
  type: 'OfficialApplicationsAddressInfoQuery',
  definition(t) {
    t.list.nonNull.field('get', {
      type: 'NewAddressType',
      authorize: loggedIn(),
      args: {
        props: nullable('OfficialApplicationsAddressInfoQueryProps'),
      },
      async resolve(_parent, { props }, { user, prisma }) {
        if (!user) {
          throw new TypeError('Unauthorized')
        }

        if (user.users_typeID === 5 || user.users_typeID === 6) {
          // nowe adresy do zaakceptowania
          const addressApplications =
            await prisma.address_Applications.findMany({
              where: {
                addressApplications_statusID: 9,
              },
            })

          const addressesUsersID = addressApplications.map(
            (a) => a.addressApplications_userID
          )

          // uzytkownicy
          const users = await prisma.users.findMany({
            where: {
              AND: [
                {
                  OR: [
                    {
                      users_login: { contains: props?.users_data ?? undefined },
                    },
                    {
                      users_name: {
                        contains: props?.users_data ?? undefined,
                      },
                    },
                    {
                      users_identificationNumber: {
                        contains: props?.users_data ?? undefined,
                      },
                    },
                  ],
                },
                {
                  users_ID: {
                    in: addressesUsersID,
                  },
                },
                { OR: [{ users_statusID: 1 }, { users_statusID: 3 }] },
              ],
            },
          })

          // uzytkownicy wraz z gminami
          const usersIDs = users.map((u) => u.users_ID)
          const addresses = await prisma.users_Address.findMany({
            where: {
              usersAddress_userID: { in: usersIDs },
            },
          })

          const usersWCommunities = users.map((u) => {
            return {
              ...u,
              communities: [
                ...addresses.map((a) => {
                  return a.usersAddress_userID === u.users_ID ? a : undefined
                }),
                ...addressApplications.map((a) => {
                  return a.addressApplications_userID === u.users_ID
                    ? a
                    : undefined
                }),
              ],
            }
          })

          // GMINY URZĘDNIKA
          const officialAddresses = await prisma.users_Address.findMany({
            where: {
              usersAddress_userID: user.users_ID,
            },
          })

          officialAddresses.map((address) => address.usersAddress_communityID)
          // JEŚLI ŻADEN Z ADRESÓW ORAZ WNIOSKÓW UŻYTKOWNIKA NIE JEST TOŻSAMY Z GMINĄ URZĘDNIKA, NIE POKAZUJ GO W WYNIKACH WYSZUKIWANIA
          const usersToShow = usersWCommunities
            .map((user) => {
              return {
                ...user,
                addresses: user.communities.filter(
                  (community) => community !== undefined
                ),
                /*     .filter((c) =>
                    officialCommunities.includes(
                      c?.usersAddress_communityID ||
                        c?.addressApplications_communityID
                    )
                  ), */
              }
            })
            .filter((array) => array.addresses.length > 0)

          //   dodaj adresy wymagające zaakceptowania do uzytkowników podlegających pod gminę
          const filteredAddressApplications = addressApplications
            .map((a) => {
              return {
                ...a,
                user: usersToShow.find(
                  (u) => u.users_ID === a.addressApplications_userID
                ),
              }
            })
            .filter((a) => a.user !== undefined)

          const result = filteredAddressApplications.map((address) => ({
            addressApplications_ID: address.addressApplications_ID,
            addressApplications_dateAdded:
              address.addressApplications_dateAdded.toISOString(),
            addressApplications_dateReviewed:
              address.addressApplications_dateReviewed?.toISOString(),
            addressApplications_typeID: address.addressApplications_typeID,
            addressApplications_reviewedBy:
              address.addressApplications_reviewedBy,
            addressApplications_userID: address.addressApplications_userID,
            addressApplications_statusID: address.addressApplications_statusID,
            addressApplications_street: address.addressApplications_street,
            addressApplications_houseNumber:
              address.addressApplications_houseNumber,
            addressApplications_apartamentNumber:
              address.addressApplications_apartamentNumber ?? null,
            addressApplications_postCode: address.addressApplications_postCode,
            addressApplications_city: address.addressApplications_city,
            addressApplications_addressTypeID:
              address.addressApplications_addressTypeID,
            addressApplications_communityID:
              address.addressApplications_communityID,
            addressApplications_addressID:
              address.addressApplications_addressID,
            user: address.user,
          }))

          return result as Array<{
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
            addressApplications_addressID: number
            user: {
              users_ID: number
              users_login: string
              users_name: string
              users_identificationNumber: string
              users_phoneNumber?: string
              users_statusID: number
              addresses: Array<{
                usersAddress_ID: number
                usersAddress_userID: number
                usersAddress_street: string
                usersAddress_houseNumber: string
                usersAddress_apartamentNumber: string
                usersAddress_postCode: string
                usersAddress_city: string
                usersAddress_typeID: number
                usersAddress_communityID: number
                usersAddress_statusID: number
              }>
            }
          }>
        }

        throw new TypeError('Unauthorized')
      },
    })
  },
})
