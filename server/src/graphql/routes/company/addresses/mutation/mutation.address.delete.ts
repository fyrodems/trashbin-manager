import { extendType, inputObjectType, nonNull } from 'nexus'

export const CompanyAddressDeleteMutationProps = inputObjectType({
  name: 'CompanyAddressDeleteMutationProps',
  definition(t) {
    t.nonNull.int('usersAddress_ID')
    t.nonNull.int('usersAddress_userID')
  },
})

export const CompanyAddressDeleteMutation = extendType({
  type: 'CompanyAddressMutation',
  definition(t) {
    t.field('delete', {
      type: 'MutationResponseType',
      args: {
        props: nonNull('CompanyAddressDeleteMutationProps'),
      },

      async resolve(_parent, { props }, { prisma }) {
        const { usersAddress_ID, usersAddress_userID } = props
        try {
          // Jeśli uzytkownik ma tylko jeden adres, nie zezwól na usunięcie. Nie pozwól też na usunięcie jedynego adresu doręczenia
          const numOfAddress = await prisma.users_Address.findMany({
            where: {
              AND: [{ usersAddress_statusID: 24 }, { usersAddress_userID }],
            },
          })
          const doreczenia = numOfAddress.filter(
            (a) => a.usersAddress_typeID === 24
          )

          if (
            numOfAddress.length < 2 ||
            (doreczenia.length === 1 &&
              doreczenia[0].usersAddress_ID === usersAddress_ID)
          ) {
            return {
              status: {
                message: 'Error',
                description:
                  'Nie można usunąć jedynego adresu uzytkownika/jedynego adresu doreczenia',
              },
            }
          }
          // dodaj nowy, od razu zaakceptowany, wniosek

          const addressToDelete = await prisma.users_Address.findUnique({
            where: { usersAddress_ID },
          })

          const lastAddressApplicationID =
            await prisma.address_Applications.findMany({
              orderBy: {
                addressApplications_ID: 'desc',
              },
              take: 1,
            })
          if (addressToDelete) {
            await prisma.address_Applications.create({
              data: {
                addressApplications_ID: lastAddressApplicationID[0]
                  ?.addressApplications_ID
                  ? lastAddressApplicationID[0].addressApplications_ID + 1
                  : 1,
                addressApplications_dateAdded: new Date(),
                addressApplications_dateReviewed: new Date(),
                addressApplications_typeID: 18,
                addressApplications_reviewedBy: null,
                addressApplications_userID: usersAddress_userID,
                addressApplications_statusID: 10,
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
                addressApplications_addressID: addressToDelete.usersAddress_ID,
              },
            })
          }

          await prisma.users_Address.update({
            where: {
              usersAddress_ID,
            },
            data: {
              usersAddress_statusID: 26,
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
