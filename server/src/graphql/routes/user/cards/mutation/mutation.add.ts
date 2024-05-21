import { extendType, inputObjectType, nonNull } from 'nexus'

export const UserCardsAddMutationProps = inputObjectType({
  name: 'UserCardsAddMutationProps',
  definition(t) {
    t.nonNull.int('usersCards_userID')
    t.nullable.int('usersCards_numberPIN')
    t.nonNull.list.nonNull.int('dumpstersIDs')
  },
})

export const UserCardsAddMutation = extendType({
  type: 'UserCardsMutation',
  definition(t) {
    t.field('add', {
      type: 'MutationResponseType',
      args: {
        props: nonNull('UserCardsAddMutationProps'),
      },
      /* authorize: hasRole(['admin']), */
      async resolve(_parent, { props }, { prisma }) {
        const { usersCards_userID, dumpstersIDs } = props
        try {
          // SPRAWDŹ, CZY UŻYTKOWNIK WYSŁAŁ JUŻ ZGŁOSZENIE O DODANIE KARTY, JEŚLI TAK, NIE POZWÓL NA PONOWNE WYSŁANIE
          const userCardsApplications =
            await prisma.cards_Applications.findMany({
              where: {
                cardsApplications_userID: usersCards_userID,
              },
            })

          if (
            userCardsApplications
              .filter((a) => a.cardsApplications_statusID === 9)
              .map((a) => a.cardsApplications_typeID)
              .includes(16)
          ) {
            return {
              status: {
                message: 'Error',
                description:
                  'Użytkownik posiada już aktywny wniosek o nową kartę',
              },
            }
          }

          const lastCardApplicationID =
            await prisma.cards_Applications.findMany({
              orderBy: {
                cardsApplications_ID: 'desc',
              },
              take: 1,
            })

          const applicationID = lastCardApplicationID[0]?.cardsApplications_ID

          await prisma.cards_Applications.create({
            data: {
              cardsApplications_ID: applicationID + 1 || 1,
              cardsApplications_dateAdded: new Date(),
              cardsApplications_dateReviewed: null,
              cardsApplications_typeID: 16,
              cardsApplications_reviewedBy: null,
              cardsApplications_userID: usersCards_userID,
              cardsApplications_statusID: 9,
              cardsApplications_dumpstersIDs: dumpstersIDs.join(';'),
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
              description: 'Error while creating card',
            },
          }
        }
      },
    })
  },
})
