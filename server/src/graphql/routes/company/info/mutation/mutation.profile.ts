import { extendType, inputObjectType, nonNull } from 'nexus'

export const CompanyInfoProfileMutationProps = inputObjectType({
  name: 'CompanyInfoProfileMutationProps',
  definition(t) {
    t.nullable.string('name')
    t.nullable.string('email')
    t.nullable.string('phoneNumber')
  },
})

export const CompanyInfoProfileMutation = extendType({
  type: 'CompanyInfoMutation',
  definition(t) {
    t.nonNull.field('profile', {
      type: 'MutationResponseType',
      args: {
        props: nonNull('CompanyInfoProfileMutationProps'),
      },
      async resolve(_parent, { props }, { user, prisma }) {
        const { name, email, phoneNumber } = props

        if (!user) {
          throw new TypeError('Unauthorized')
        }

        if (!name && !email) {
          throw new TypeError('Brak danych do zmiany')
        }

        try {
          // DODAJ ZMIANĘ DO HISTORII WNIOSKÓW
          const lastPersonalDataApplicationID =
            await prisma.personalData_Applications.findMany({
              orderBy: {
                personalDataApplications_ID: 'desc',
              },
              take: 1,
            })

          const applicationID =
            lastPersonalDataApplicationID[0]?.personalDataApplications_ID

          if (name) {
            await prisma.personalData_Applications.create({
              data: {
                personalDataApplications_ID: applicationID + 1 || 1,
                personalDataApplications_dateAdded: new Date(),
                personalDataApplications_dateReviewed: new Date(),
                personalDataApplications_typeID: 21,
                personalDataApplications_reviewedBy: null,
                personalDataApplications_userID: user.users_ID,
                personalDataApplications_statusID: 10,
                personalDataApplications_name: name,
              },
            })

            await prisma.users.update({
              where: {
                users_ID: user.users_ID,
              },
              data: {
                users_name: name,
              },
            })
          }

          if (email) {
            await prisma.users.update({
              where: {
                users_ID: user.users_ID,
              },
              data: {
                users_login: email,
              },
            })
          }

          if (phoneNumber) {
            await prisma.users.update({
              where: {
                users_ID: user.users_ID,
              },
              data: {
                users_phoneNumber: phoneNumber as string,
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
              description: 'Error while editing personal data',
            },
          }
        }
      },
    })
  },
})
