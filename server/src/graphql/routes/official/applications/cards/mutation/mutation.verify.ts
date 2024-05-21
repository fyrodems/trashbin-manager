import { extendType, inputObjectType, nonNull } from 'nexus'

export const OfficialCardsApplicationsVerifyMutationProps = inputObjectType({
  name: 'OfficialCardsApplicationsVerifyMutationProps',
  definition(t) {
    t.nonNull.boolean('isVerified')
    t.nullable.string('card_number')
    t.nonNull.int('reviewer')
    t.nonNull.int('cardsApplications_ID')
    t.nullable.int('user_ID')
  },
})

export const OfficialCardsApplicationsVerifyMutation = extendType({
  type: 'OfficialCardsApplicationsMutation',
  definition(t) {
    t.field('verify', {
      type: 'MutationResponseType',
      args: {
        props: nonNull('OfficialCardsApplicationsVerifyMutationProps'),
      },
      async resolve(_parent, { props }, { prisma }) {
        const {
          isVerified,
          card_number,
          cardsApplications_ID,
          reviewer,
          user_ID,
        } = props
        try {
          // WERYFIKACJA DOTYCZY JEDYNIE DODAWANIA KARTY, BLOKOWANIA NIE MOZNA ODWLEKAC W CZASIE, WIĘC NIE MA WERYFIKACJI, EDYCJA ZAŚ POLEGA
          // NA DODAWANIU I USUWANIU ŚMIETIKÓW I JEST WŚRÓD MUTACJI SMIETNIKÓW
          // JEŚLI WNIOSEK ZOSTAŁ ZWERYFIKOWANY, ZMIEN JEGO STATUS ORAZ DODAJ KARTĘ DO BAZY, W PRZECIWNYM RAZIE EDYTUJ JEGO STATUS
          if (isVerified) {
            const application = await prisma.cards_Applications.findUnique({
              where: {
                cardsApplications_ID,
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

            const lastCardID = await prisma.users_Cards.findMany({
              orderBy: {
                usersCards_ID: 'desc',
              },
              take: 1,
            })
            if (card_number && user_ID) {
              await prisma.cards_Applications.update({
                where: {
                  cardsApplications_ID,
                },
                data: {
                  cardsApplications_dateReviewed: new Date(),
                  cardsApplications_reviewedBy: reviewer,
                  cardsApplications_statusID: 10,
                },
              })

              await prisma.users_Cards.create({
                data: {
                  usersCards_ID: lastCardID[0]?.usersCards_ID
                    ? lastCardID[0].usersCards_ID + 1
                    : 1,
                  usersCards_userID: user_ID,
                  usersCards_number: card_number,
                  usersCards_numberPIN: null,
                  usersCards_statusID: 4,
                  usersCards_rentedToUserID: null,
                  usersCards_dumpstersIDs:
                    application.cardsApplications_dumpstersIDs,
                },
              })
            } else {
              return {
                status: {
                  message: 'Error',
                  description: 'Error while veryfing - no required data',
                },
              }
            }
          } else {
            // zmien status wniosku na niezaakceptowany
            await prisma.cards_Applications.update({
              where: {
                cardsApplications_ID,
              },
              data: {
                cardsApplications_dateReviewed: new Date(),
                cardsApplications_reviewedBy: reviewer,
                cardsApplications_statusID: 11,
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
