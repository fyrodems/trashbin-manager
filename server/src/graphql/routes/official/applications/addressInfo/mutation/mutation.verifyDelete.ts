import { extendType, inputObjectType, nonNull } from 'nexus'

export const OfficialDeleteAddressInfoApplicationsVerifyMutationProps =
  inputObjectType({
    name: 'OfficialDeleteAddressInfoApplicationsVerifyMutationProps',
    definition(t) {
      t.nonNull.boolean('isVerified')
      t.nonNull.int('reviewer')
      t.nonNull.int('addressApplications_ID')
      t.nonNull.int('userAddress_ID')
    },
  })

export const OfficialDeleteAddressInfoApplicationsVerifyMutation = extendType({
  type: 'OfficialAddressInfoApplicationsMutation',
  definition(t) {
    t.field('verifyDelete', {
      type: 'MutationResponseType',
      args: {
        props: nonNull(
          'OfficialDeleteAddressInfoApplicationsVerifyMutationProps'
        ),
      },
      async resolve(_parent, { props }, { prisma }) {
        const { isVerified, addressApplications_ID, reviewer, userAddress_ID } =
          props
        try {
          // JEŚLI WNIOSEK ZOSTAŁ ZWERYFIKOWANY, ZMIEN JEGO STATUS ORAZ DEZAKTYWUJ ADRES W BAZIE, W PRZECIWNYM RAZIE EDYTUJ JEGO STATUS
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

            await prisma.users_Address.update({
              where: {
                usersAddress_ID: userAddress_ID,
              },
              data: {
                usersAddress_statusID: 26,
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
