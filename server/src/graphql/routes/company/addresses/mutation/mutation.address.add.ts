import { extendType, inputObjectType, nonNull } from 'nexus'

export const CompanyAddressAddMutationProps = inputObjectType({
  name: 'CompanyAddressAddMutationProps',
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

export const CompanyAddressAddMutation = extendType({
  type: 'CompanyAddressMutation',
  definition(t) {
    t.field('add', {
      type: 'MutationResponseType',
      args: {
        props: nonNull('CompanyAddressAddMutationProps'),
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
          // sprawdzamy, czy uzytkownik nie probuje dodac drugiego adresu do doreczen, jesli tak, nie pozwalamy na to
          const connection = await prisma.users_Address.findMany({
            where: {
              AND: [
                { usersAddress_userID },
                { usersAddress_statusID: 24 },
                { usersAddress_typeID: 24 },
              ],
            },
          })
          if (connection.length === 0 || usersAddress_typeID !== 24) {
            const lastAddress = await prisma.users_Address.findMany({
              orderBy: {
                usersAddress_ID: 'desc',
              },
              take: 1,
            })

            // Dodajemy nowy wniosek, ktory od razu jest zaakceptowany
            const lastAddressApplicationID =
              await prisma.address_Applications.findMany({
                orderBy: {
                  addressApplications_ID: 'desc',
                },
                take: 1,
              })

            const address = await prisma.users_Address.create({
              data: {
                usersAddress_ID: lastAddress[0]?.usersAddress_ID
                  ? lastAddress[0].usersAddress_ID + 1
                  : 1,
                usersAddress_userID,
                usersAddress_street,
                usersAddress_houseNumber,
                usersAddress_apartamentNumber,
                usersAddress_postCode,
                usersAddress_city,
                usersAddress_typeID,
                usersAddress_communityID,
                usersAddress_statusID: 24,
              },
            })

            await prisma.address_Applications.create({
              data: {
                addressApplications_ID: lastAddressApplicationID[0]
                  ?.addressApplications_ID
                  ? lastAddressApplicationID[0].addressApplications_ID + 1
                  : 1,
                addressApplications_dateAdded: new Date(),
                addressApplications_dateReviewed: new Date(),
                addressApplications_typeID: 17,
                addressApplications_reviewedBy: null,
                addressApplications_userID: usersAddress_userID,
                addressApplications_statusID: 10,
                addressApplications_street: usersAddress_street,
                addressApplications_houseNumber: usersAddress_houseNumber,
                addressApplications_apartamentNumber:
                  usersAddress_apartamentNumber ?? null,
                addressApplications_postCode: usersAddress_postCode,
                addressApplications_city: usersAddress_city,
                addressApplications_addressTypeID: usersAddress_typeID,
                addressApplications_communityID: usersAddress_communityID,
                addressApplications_addressID: address.usersAddress_ID,
              },
            })

            return {
              status: {
                message: 'Success',
              },
            }
          }

          return {
            status: {
              message: 'Error',
              description: 'Nie mozna miec dwóch adresów do doręczeń',
            },
          }
        } catch {
          return {
            status: {
              message: 'Error',
              description: 'Error while adding address',
            },
          }
        }
      },
    })
  },
})
