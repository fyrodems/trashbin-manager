import { extendType, inputObjectType, nonNull } from 'nexus'

export const OfficialEditUserInfoApplicationsVerifyMutationProps =
  inputObjectType({
    name: 'OfficialEditUserInfoApplicationsVerifyMutationProps',
    definition(t) {
      t.nonNull.boolean('isVerified')
      t.nonNull.int('reviewer')
      t.nonNull.int('personalDataApplications_ID')
      t.nonNull.int('user_ID')
    },
  })

export const OfficialEditUserInfoApplicationsVerifyMutation = extendType({
  type: 'OfficialUserInfoApplicationsMutation',
  definition(t) {
    t.field('verifyEdit', {
      type: 'MutationResponseType',
      args: {
        props: nonNull('OfficialEditUserInfoApplicationsVerifyMutationProps'),
      },
      async resolve(_parent, { props }, { prisma }) {
        const { isVerified, personalDataApplications_ID, reviewer, user_ID } =
          props
        try {
          // JEŚLI WNIOSEK ZOSTAŁ ZWERYFIKOWANY, ZMIEN JEGO STATUS ORAZ DODAJ ADRES DO BAZY, W PRZECIWNYM RAZIE EDYTUJ JEGO STATUS
          if (isVerified) {
            const application =
              await prisma.personalData_Applications.findUnique({
                where: {
                  personalDataApplications_ID,
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

            await prisma.personalData_Applications.update({
              where: {
                personalDataApplications_ID,
              },
              data: {
                personalDataApplications_dateReviewed: new Date(),
                personalDataApplications_reviewedBy: reviewer,
                personalDataApplications_statusID: 10,
              },
            })

            await prisma.users.update({
              where: {
                users_ID: user_ID,
              },
              data: {
                users_name: application.personalDataApplications_name,
                users_statusID: 1,
              },
            })
          } else {
            // zmien status wniosku na niezaakceptowany
            await prisma.personalData_Applications.update({
              where: {
                personalDataApplications_ID,
              },
              data: {
                personalDataApplications_dateReviewed: new Date(),
                personalDataApplications_reviewedBy: reviewer,
                personalDataApplications_statusID: 11,
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
