import { extendType, inputObjectType, nonNull } from 'nexus'

export const UserAddressInfoEditMutationProps = inputObjectType({
  name: 'UserAddressInfoEditMutationProps',
  definition(t) {
    t.nonNull.int('usersAddress_userID')
    t.nonNull.string('usersAddress_street')
    t.nonNull.string('usersAddress_houseNumber')
    t.nullable.string('usersAddress_apartamentNumber')
    t.nonNull.string('usersAddress_postCode')
    t.nonNull.string('usersAddress_city')
    t.nonNull.int('usersAddress_typeID')
    t.nonNull.int('usersAddress_communityID')
    t.nullable.int('usersAddress_addressID')
  },
})

export const UserAddressInfoEditMutation = extendType({
  type: 'UserAddressInfoMutation',
  definition(t) {
    t.field('edit', {
      type: 'MutationResponseType',
      args: {
        props: nonNull('UserAddressInfoEditMutationProps'),
      },
      async resolve(_parent, { props }, { prisma }) {
        const {
          usersAddress_userID,
          usersAddress_street,
          usersAddress_houseNumber,
          usersAddress_apartamentNumber,
          usersAddress_postCode,
          usersAddress_city,
          usersAddress_typeID,
          usersAddress_communityID,
          usersAddress_addressID,
        } = props
        try {
          // SPRAWDŹ, CZY UŻYTKOWNIK WYSŁAŁ JUŻ ZGŁOSZENIE O TEGO ADRESU, JEŚLI TAK, NIE POZWÓL NA PONOWNE WYSŁANIE
          const userAddressesApplications =
            await prisma.address_Applications.findMany({
              where: {
                AND: [
                  { addressApplications_userID: usersAddress_userID },
                  { addressApplications_statusID: 9 },
                  { addressApplications_typeID: 19 },
                ],
              },
            })

          if (
            userAddressesApplications
              .map((a) => a.addressApplications_addressTypeID)
              .includes(usersAddress_typeID)
          ) {
            return {
              status: {
                message: 'Error',
                description:
                  'Użytkownik posiada już aktywny wniosek o adres tego typu',
              },
            }
          }

          // WYŚLIJ WNIOSEK O EDYCJĘ ADRESU ORAZ ANULUJ WNIOSEK O USUNIĘCIE TEGO ADRESU (JEŚLI ISTNIEJE)
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
              addressApplications_typeID: 19,
              addressApplications_reviewedBy: null,
              addressApplications_userID: usersAddress_userID,
              addressApplications_statusID: 9,
              addressApplications_street: usersAddress_street,
              addressApplications_houseNumber: usersAddress_houseNumber,
              addressApplications_apartamentNumber:
                usersAddress_apartamentNumber ?? null,
              addressApplications_postCode: usersAddress_postCode,
              addressApplications_city: usersAddress_city,
              addressApplications_addressTypeID: usersAddress_typeID,
              addressApplications_communityID: usersAddress_communityID,
              addressApplications_addressID: usersAddress_addressID,
            },
          })

          await prisma.address_Applications.updateMany({
            where: {
              AND: [
                { addressApplications_typeID: 18 },
                { addressApplications_statusID: 9 },
                { addressApplications_userID: usersAddress_userID },
                { addressApplications_addressTypeID: usersAddress_typeID },
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
              description: 'Error while editing address',
            },
          }
        }
      },
    })
  },
})
