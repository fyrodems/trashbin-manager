import { extendType, inputObjectType, nonNull } from 'nexus'

export const UserAddressInfoDeleteMutationProps = inputObjectType({
  name: 'UserAddressInfoDeleteMutationProps',
  definition(t) {
    t.nonNull.int('usersAddress_userID')
    t.nonNull.int('usersAddress_addressID')
  },
})

export const UserAddressInfoDeleteMutation = extendType({
  type: 'UserAddressInfoMutation',
  definition(t) {
    t.field('delete', {
      type: 'MutationResponseType',
      args: {
        props: nonNull('UserAddressInfoDeleteMutationProps'),
      },
      async resolve(_parent, { props }, { prisma }) {
        const { usersAddress_userID, usersAddress_addressID } = props
        try {
          // SPRAWDŹ CZY ISTNIEJE TAKI ADRES W BAZIE
          const addressToDelete = await prisma.users_Address.findFirst({
            where: {
              usersAddress_ID: usersAddress_addressID,
            },
          })

          if (addressToDelete === null) {
            return {
              status: {
                message: 'Error',
                description: 'Nie znaleziono adresu',
              },
            }
          }
          // SPRAWDŹ, CZY UŻYTKOWNIK WYSŁAŁ JUŻ ZGŁOSZENIE O USUNIĘCIE TEGO ADRESU, JEŚLI TAK, NIE POZWÓL NA PONOWNE WYSŁANIE

          const userAddressesApplicationDuplicate =
            await prisma.address_Applications.findMany({
              where: {
                AND: [
                  { addressApplications_userID: usersAddress_userID },
                  { addressApplications_typeID: 18 },
                  {
                    addressApplications_postCode:
                      addressToDelete.usersAddress_postCode,
                  },
                  {
                    addressApplications_city: addressToDelete.usersAddress_city,
                  },
                  {
                    addressApplications_street:
                      addressToDelete.usersAddress_street,
                  },
                  {
                    addressApplications_houseNumber:
                      addressToDelete.usersAddress_houseNumber,
                  },
                  {
                    addressApplications_apartamentNumber:
                      addressToDelete.usersAddress_apartamentNumber,
                  },
                  {
                    addressApplications_addressTypeID:
                      addressToDelete.usersAddress_typeID,
                  },
                  {
                    addressApplications_communityID:
                      addressToDelete.usersAddress_communityID,
                  },
                  { addressApplications_statusID: 9 },
                ],
              },
            })

          if (userAddressesApplicationDuplicate.length > 0) {
            return {
              status: {
                message: 'Error',
                description:
                  'Użytkownik posiada już aktywny wniosek o adres tego typu',
              },
            }
          }

          //    SPRAWDŹ, CZY JEST TO OSTATNI ADRES UŻYTKOWNIKA, JEŚLI TAK, NIE ZEZWÓL NA USUNIĘCIE
          const allAddresses = await prisma.users_Address.findMany({
            where: {
              AND: [{ usersAddress_userID }, { usersAddress_statusID: 24 }],
            },
          })

          if (allAddresses.length < 2) {
            return {
              status: {
                message: 'Error',
                description: 'Nie można usunąć jedynego aktywnego adresu',
              },
            }
          }

          //   SPRAWDŹ, CZY JEST TO JEDYNY ADRES ZAMELDOWANIA UŻYTKOWNIKA, JEŚLI TAK, NIE ZEZWÓL NA USUNIĘCIE
          const userRegisteredAddress = await prisma.users_Address.findMany({
            where: {
              AND: [
                { usersAddress_userID },
                { usersAddress_statusID: 24 },
                { usersAddress_typeID: 3 },
              ],
            },
          })

          if (
            userRegisteredAddress.length < 2 &&
            userRegisteredAddress[0].usersAddress_ID ===
              addressToDelete.usersAddress_ID
          ) {
            return {
              status: {
                message: 'Error',
                description:
                  'Nie można usunąć jedynego aktywnego adresu zameldowania',
              },
            }
          }

          // WYŚLIJ WNIOSEK O USUNIĘCIE ADRESU ORAZ ANULUJ WNIOSEK O EDYCJĘ TEGO ADRESU (JEŚLI ISTNIEJE)
          const lastAddressApplicationID =
            await prisma.address_Applications.findMany({
              orderBy: {
                addressApplications_ID: 'desc',
              },
              take: 1,
            })

          const applicationID =
            lastAddressApplicationID[0]?.addressApplications_ID

          await prisma.address_Applications.create({
            data: {
              addressApplications_ID: applicationID + 1 || 1,
              addressApplications_dateAdded: new Date(),
              addressApplications_dateReviewed: null,
              addressApplications_typeID: 18,
              addressApplications_reviewedBy: null,
              addressApplications_userID: usersAddress_userID,
              addressApplications_statusID: 9,
              addressApplications_street: addressToDelete.usersAddress_street,
              addressApplications_houseNumber:
                addressToDelete.usersAddress_houseNumber,
              addressApplications_apartamentNumber:
                addressToDelete.usersAddress_apartamentNumber ?? null,
              addressApplications_postCode:
                addressToDelete.usersAddress_postCode,
              addressApplications_city: addressToDelete.usersAddress_city,
              addressApplications_addressTypeID:
                addressToDelete.usersAddress_typeID,
              addressApplications_communityID:
                addressToDelete.usersAddress_communityID,
              addressApplications_addressID: usersAddress_addressID,
            },
          })

          await prisma.address_Applications.updateMany({
            where: {
              AND: [
                { addressApplications_typeID: 19 },
                { addressApplications_statusID: 9 },
                { addressApplications_userID: usersAddress_userID },
              ],
            },
            data: {
              addressApplications_statusID: 12,
            },
          })

          return {
            status: {
              message: 'Success',
            },
          }
        } catch {
          return {
            status: {
              message: 'Error',
              description: 'Error while deleting address',
            },
          }
        }
      },
    })
  },
})
