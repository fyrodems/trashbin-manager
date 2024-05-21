import { extendType, inputObjectType, nonNull } from 'nexus'

export const OfficialAddAddressInfoApplicationsVerifyMutationProps =
  inputObjectType({
    name: 'OfficialAddAddressInfoApplicationsVerifyMutationProps',
    definition(t) {
      t.nonNull.boolean('isVerified')
      t.nonNull.int('reviewer')
      t.nonNull.int('addressApplications_ID')
      t.nonNull.int('user_ID')
    },
  })

export const OfficialAddAddressInfoApplicationsVerifyMutation = extendType({
  type: 'OfficialAddressInfoApplicationsMutation',
  definition(t) {
    t.field('verifyAdd', {
      type: 'MutationResponseType',
      args: {
        props: nonNull('OfficialAddAddressInfoApplicationsVerifyMutationProps'),
      },
      async resolve(_parent, { props }, { user, prisma }) {
        const { isVerified, addressApplications_ID, reviewer, user_ID } = props
        try {
          // JEŚLI WNIOSEK ZOSTAŁ ZWERYFIKOWANY, ZMIEN JEGO STATUS ORAZ DODAJ ADRES DO BAZY, W PRZECIWNYM RAZIE EDYTUJ JEGO STATUS
          if (isVerified) {
            const application = await prisma.address_Applications.findUnique({
              where: {
                addressApplications_ID,
              },
            })

            if (!application) {
              return {
                status: {
                  message: 'Error',
                  description: 'Nie znaleziono wniosku',
                },
              }
            }

            const lastAddressID = await prisma.users_Address.findMany({
              orderBy: {
                usersAddress_ID: 'desc',
              },
              take: 1,
            })

            if (!user) {
              throw new Error('Brak danych urzędnika!')
            }

            // SPRAWDŹ CZY DANY UŻYTKOWNIK POSIADA JUŻ ADRES TEGO TYPU W GMINIE, JEŚLI TAK, NIE POZWÓL NA EDYCJĘ BAZY
            const userAddresses = await prisma.users_Address.findMany({
              where: {
                AND: [
                  { usersAddress_userID: user_ID },
                  {
                    usersAddress_typeID:
                      application.addressApplications_addressTypeID,
                  },
                  { usersAddress_statusID: { not: 26 } },
                ],
              },
            })

            if (userAddresses.length > 0) {
              await prisma.address_Applications.update({
                where: {
                  addressApplications_ID,
                },
                data: {
                  addressApplications_dateReviewed: new Date(),
                  addressApplications_reviewedBy: reviewer,
                  addressApplications_statusID: 11,
                },
              })
              return {
                status: {
                  message: 'Error',
                  description: 'Użytkownik posiada już adres tego typu',
                },
              }
            }

            await prisma.address_Applications.update({
              where: {
                addressApplications_ID,
              },
              data: {
                addressApplications_dateReviewed: new Date(),
                addressApplications_reviewedBy: reviewer,
                addressApplications_statusID: 10,
              },
            })

            await prisma.users_Address.create({
              data: {
                usersAddress_ID: lastAddressID[0]?.usersAddress_ID
                  ? lastAddressID[0].usersAddress_ID + 1
                  : 1,
                usersAddress_userID: user_ID,
                usersAddress_street: application.addressApplications_street,
                usersAddress_houseNumber:
                  application.addressApplications_houseNumber,
                usersAddress_apartamentNumber:
                  application.addressApplications_apartamentNumber ?? null,
                usersAddress_postCode: application.addressApplications_postCode,
                usersAddress_city: application.addressApplications_city,
                usersAddress_typeID:
                  application.addressApplications_addressTypeID,
                usersAddress_communityID:
                  application.addressApplications_communityID,
                usersAddress_statusID: 24,
              },
            })
          } else {
            // zmien status wniosku na niezaakceptowany
            await prisma.address_Applications.update({
              where: {
                addressApplications_ID,
              },
              data: {
                addressApplications_dateReviewed: new Date(),
                addressApplications_reviewedBy: reviewer,
                addressApplications_statusID: 11,
              },
            })
          }

          return {
            status: {
              message: 'Success',
            },
          }
        } catch {
          return {
            status: {
              message: 'Error',
              description: 'Error while veryfing',
            },
          }
        }
      },
    })
  },
})
