import { extendType, inputObjectType, nonNull } from 'nexus'

export const OfficialEditAddressInfoApplicationsVerifyMutationProps =
  inputObjectType({
    name: 'OfficialEditAddressInfoApplicationsVerifyMutationProps',
    definition(t) {
      t.nonNull.boolean('isVerified')
      t.nonNull.int('reviewer')
      t.nonNull.int('addressApplications_ID')
      t.nonNull.int('userAddress_ID')
    },
  })

export const OfficialEditAddressInfoApplicationsVerifyMutation = extendType({
  type: 'OfficialAddressInfoApplicationsMutation',
  definition(t) {
    t.field('verifyEdit', {
      type: 'MutationResponseType',
      args: {
        props: nonNull(
          'OfficialEditAddressInfoApplicationsVerifyMutationProps'
        ),
      },
      async resolve(_parent, { props }, { prisma }) {
        const { isVerified, addressApplications_ID, reviewer, userAddress_ID } =
          props
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
