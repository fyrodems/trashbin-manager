import { extendType, inputObjectType, nonNull } from 'nexus'

export const UserApplicationCancelMutationProps = inputObjectType({
  name: 'UserApplicationCancelMutationProps',
  definition(t) {
    t.nonNull.int('application_ID')
    t.nonNull.string('applicationCategory')
  },
})

export const UserApplicationCancelMutation = extendType({
  type: 'UserApplicationsMutation',
  definition(t) {
    t.field('cancel', {
      type: 'MutationResponseType',
      args: {
        props: nonNull('UserApplicationCancelMutationProps'),
      },
      async resolve(_parent, { props }, { prisma }) {
        const { application_ID, applicationCategory } = props
        try {
          switch (applicationCategory) {
            case 'cards': {
              const application = await prisma.cards_Applications.findUnique({
                where: { cardsApplications_ID: application_ID },
              })

              if (application?.cardsApplications_statusID !== 9) {
                return {
                  status: {
                    message: 'Error',
                    description: 'Wniosek został już edytowany przez urzędnika',
                  },
                }
              }

              await prisma.cards_Applications.update({
                where: {
                  cardsApplications_ID: application_ID,
                },
                data: {
                  cardsApplications_statusID: 12,
                },
              })

              break
            }

            case 'dumpsters': {
              const application =
                await prisma.dumpsters_Applications.findUnique({
                  where: { dumpstersApplications_ID: application_ID },
                })

              if (application?.dumpstersApplications_statusID !== 9) {
                return {
                  status: {
                    message: 'Error',
                    description: 'Wniosek został już edytowany przez urzędnika',
                  },
                }
              }

              await prisma.dumpsters_Applications.update({
                where: {
                  dumpstersApplications_ID: application_ID,
                },
                data: {
                  dumpstersApplications_statusID: 12,
                },
              })

              break
            }

            case 'address': {
              const application = await prisma.address_Applications.findUnique({
                where: { addressApplications_ID: application_ID },
              })

              if (application?.addressApplications_statusID !== 9) {
                return {
                  status: {
                    message: 'Error',
                    description: 'Wniosek został już edytowany przez urzędnika',
                  },
                }
              }

              await prisma.address_Applications.update({
                where: {
                  addressApplications_ID: application_ID,
                },
                data: {
                  addressApplications_statusID: 12,
                },
              })

              break
            }

            case 'personalData': {
              const application =
                await prisma.personalData_Applications.findUnique({
                  where: { personalDataApplications_ID: application_ID },
                })

              if (application?.personalDataApplications_statusID !== 9) {
                return {
                  status: {
                    message: 'Error',
                    description: 'Wniosek został już edytowany przez urzędnika',
                  },
                }
              }

              await prisma.personalData_Applications.update({
                where: {
                  personalDataApplications_ID: application_ID,
                },
                data: {
                  personalDataApplications_statusID: 12,
                },
              })

              break
            }

            // No default
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
              description: 'Error while canceling card',
            },
          }
        }
      },
    })
  },
})
