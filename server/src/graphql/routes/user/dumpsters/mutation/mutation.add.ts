import { extendType, inputObjectType, nonNull } from 'nexus'

export const UserDumpstersAddMutationProps = inputObjectType({
  name: 'UserDumpstersAddMutationProps',
  definition(t) {
    t.nonNull.int('card_ID')
    t.nonNull.int('dumpster_ID')
    t.nonNull.int('user_ID')
  },
})

export const UserDumpstersAddMutation = extendType({
  type: 'UserDumpstersMutation',
  definition(t) {
    t.field('add', {
      type: 'MutationResponseType',
      args: {
        props: nonNull('UserDumpstersAddMutationProps'),
      },
      async resolve(_parent, { props }, { prisma }) {
        const { card_ID, dumpster_ID, user_ID } = props
        try {
          const lastDumpsterApplicationID =
            await prisma.dumpsters_Applications.findMany({
              orderBy: {
                dumpstersApplications_ID: 'desc',
              },
              take: 1,
            })

          // SPRAWDŹ, CZY UŻYTKOWNIK WYSŁAŁ JUŻ ZGŁOSZENIE O DODANIE TEGO altany śmietnikowej DO TEJ KARTY, JEŚLI TAK, NIE POZWÓL NA PONOWNE WYSŁANIE
          const userDumpstersApplications =
            await prisma.dumpsters_Applications.findMany({
              where: {
                AND: [
                  { dumpstersApplications_userID: user_ID },
                  { dumpstersApplications_statusID: 9 },
                  { dumpstersApplications_typeID: 20 },
                  { dumpstersApplications_cardID: card_ID },
                  { dumpstersApplications_dumpsterID: dumpster_ID },
                ],
              },
            })

          if (userDumpstersApplications.length > 0) {
            return {
              status: {
                message: 'Error',
                description:
                  'Użytkownik posiada już aktywny wniosek o dodanie altany śmietnikowej do tej karty',
              },
            }
          }

          // sprawdzamy, czy jest juz takie polaczenie, a jak nie, to dodajemy wniosek
          const card = await prisma.users_Cards.findUnique({
            where: {
              usersCards_ID: card_ID,
            },
          })

          const dumpstersIDs: string = card?.usersCards_dumpstersIDs ?? ''
          const dumpstersArray: string[] = dumpstersIDs.split(';')
          const connectedDumpsters = dumpstersArray
            .map(Number)
            .filter((id) => id !== 0)

          const applicationID =
            lastDumpsterApplicationID[0]?.dumpstersApplications_ID

          if (!connectedDumpsters.includes(dumpster_ID)) {
            await prisma.dumpsters_Applications.create({
              data: {
                dumpstersApplications_ID: applicationID + 1 || 1,
                dumpstersApplications_dateAdded: new Date(),
                dumpstersApplications_dateReviewed: null,
                dumpstersApplications_typeID: 20,
                dumpstersApplications_reviewedBy: null,
                dumpstersApplications_userID: user_ID,
                dumpstersApplications_statusID: 9,
                dumpstersApplications_dumpsterID: dumpster_ID,
                dumpstersApplications_cardID: card_ID,
              },
            })

            return {
              status: {
                message: 'Success',
              },
            }
          }

          return {
            status: {
              message: 'Error',
              description: 'Wybrana altana jest już przypisana do tej karty',
            },
          }
        } catch {
          return {
            status: {
              message: 'Error',
              description: 'Wystąpił błąd podczas dodawania altany',
            },
          }
        }
      },
    })
  },
})
