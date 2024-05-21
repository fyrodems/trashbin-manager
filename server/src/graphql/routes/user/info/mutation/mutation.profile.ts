import { extendType, inputObjectType, nonNull } from 'nexus'

export const UserInfoProfileMutationProps = inputObjectType({
  name: 'UserInfoProfileMutationProps',
  definition(t) {
    t.nonNull.string('name')
    t.nonNull.int('user_ID')
  },
})

export const UserInfoProfileMutation = extendType({
  type: 'UserInfoMutation',
  definition(t) {
    t.nonNull.field('profile', {
      type: 'MutationResponseType',
      args: {
        props: nonNull('UserInfoProfileMutationProps'),
      },
      async resolve(_parent, { props }, { user, prisma }) {
        const { name, user_ID } = props
        if (!user) {
          throw new TypeError('Unauthorized')
        }

        try {
          // SPRAWDŹ, CZY UŻYTKOWNIK WYSŁAŁ JUŻ ZGŁOSZENIE O ZMIANĘ DANYCH, JEŚLI TAK, NIE POZWÓL NA PONOWNE WYSŁANIE
          const userDataApplications =
            await prisma.personalData_Applications.findMany({
              where: {
                personalDataApplications_userID: user_ID,
              },
            })
          if (
            userDataApplications
              .filter((a) => a.personalDataApplications_statusID === 9)
              .map((a) => a.personalDataApplications_typeID)
              .includes(21)
          ) {
            return {
              status: {
                message: 'Error',
                description:
                  'Użytkownik posiada już aktywny wniosek o zmianę danych',
              },
            }
          }

          const lastPersonalDataApplicationID =
            await prisma.personalData_Applications.findMany({
              orderBy: {
                personalDataApplications_ID: 'desc',
              },
              take: 1,
            })

          const applicationID =
            lastPersonalDataApplicationID[0]?.personalDataApplications_ID

          await prisma.personalData_Applications.create({
            data: {
              personalDataApplications_ID: applicationID + 1 || 1,
              personalDataApplications_dateAdded: new Date(),
              personalDataApplications_dateReviewed: null,
              personalDataApplications_typeID: 21,
              personalDataApplications_reviewedBy: null,
              personalDataApplications_userID: user_ID,
              personalDataApplications_statusID: 9,
              personalDataApplications_name: name,
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
              description: 'Error while editing personal data',
            },
          }
        }
      },
    })
  },
})
