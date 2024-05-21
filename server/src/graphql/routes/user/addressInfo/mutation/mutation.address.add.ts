import { extendType, inputObjectType, nonNull } from 'nexus'

export const UserAddressInfoAddMutationProps = inputObjectType({
  name: 'UserAddressInfoAddMutationProps',
  definition(t) {
    t.nonNull.int('usersAddress_userID')
    t.nonNull.string('usersAddress_street')
    t.nonNull.string('usersAddress_houseNumber')
    t.nullable.string('usersAddress_apartamentNumber')
    t.nonNull.string('usersAddress_postCode')
    t.nonNull.string('usersAddress_city')
    t.nonNull.int('usersAddress_typeID')
    t.nonNull.int('usersAddress_communityID')
  },
})

export const UserAddressInfoAddMutation = extendType({
  type: 'UserAddressInfoMutation',
  definition(t) {
    t.field('add', {
      type: 'MutationResponseType',
      args: {
        props: nonNull('UserAddressInfoAddMutationProps'),
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
        } = props
        try {
          // SPRAWDŹ CZY DANY UŻYTKOWNIK POSIADA JUŻ ADRES TEGO TYPU, JEŚLI TAK, NIE POZWÓL NA WYSŁANIE ZGŁOSZENIA
          const userAddresses = await prisma.users_Address.findMany({
            where: {
              AND: [
                { usersAddress_userID },
                { usersAddress_statusID: 24 },
                { usersAddress_typeID },
              ],
            },
          })

          if (userAddresses.length > 0) {
            return {
              status: {
                message: 'Error',
                description: 'Użytkownik posiada już adres tego typu',
              },
            }
          }

          // SPRAWDŹ, CZY UŻYTKOWNIK WYSŁAŁ JUŻ ZGŁOSZENIE O NOWY ADRES TEGO TYPU, JEŚLI TAK, NIE POZWÓL NA PONOWNE WYSŁANIE
          const userAddressesApplications =
            await prisma.address_Applications.findMany({
              where: {
                AND: [
                  { addressApplications_userID: usersAddress_userID },
                  { addressApplications_statusID: 9 },
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

          // WYŚLIJ WNIOSEK O DODANIE NOWEGO ADRESU
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
              addressApplications_typeID: 17,
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
              addressApplications_addressID: null,
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
              description: 'Error while creating address',
            },
          }
        }
      },
    })
  },
})
