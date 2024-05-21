import { extendType, inputObjectType, nonNull } from 'nexus'

export const OfficialAddDumpstersApplicationsVerifyMutationProps =
  inputObjectType({
    name: 'OfficialAddDumpstersApplicationsVerifyMutationProps',
    definition(t) {
      t.nonNull.boolean('isVerified')
      t.nonNull.int('dumpstersApplications_ID')
      t.nonNull.int('reviewer')
      t.nonNull.int('card_ID')
      t.nonNull.int('dumpster_ID')
    },
  })

export const OfficialAddDumpstersApplicationsVerifyMutation = extendType({
  type: 'OfficialDumpstersApplicationsMutation',
  definition(t) {
    t.field('verifyAdd', {
      type: 'MutationResponseType',
      args: {
        props: nonNull('OfficialAddDumpstersApplicationsVerifyMutationProps'),
      },
      async resolve(_parent, { props }, { prisma }) {
        const {
          isVerified,
          dumpstersApplications_ID,
          reviewer,
          card_ID,
          dumpster_ID,
        } = props
        try {
          // JEŚLI WNIOSEK ZOSTAŁ ZWERYFIKOWANY, ZMIEN JEGO STATUS ORAZ DODAJ ŚMIETNIK DO BAZY, W PRZECIWNYM RAZIE EDYTUJ JEGO STATUS
          if (isVerified) {
            // SPRAWDŹ CZY DANY UŻYTKOWNIK PRZYPISAŁ JUŻ TEN ŚMIETNIK DO DANEJ KARTY, JEŚLI TAK, NIE POZWÓL NA EDYCJĘ BAZY
            const card = await prisma.users_Cards.findUnique({
              where: {
                usersCards_ID: card_ID,
              },
            })

            const dumpstersIDs: string = card?.usersCards_dumpstersIDs as string
            const dumpstersArray: string[] = dumpstersIDs.split(';')
            const connectedDumpsters = dumpstersArray
              .map(Number)
              .filter((id) => id !== 0)

            if (connectedDumpsters.includes(dumpster_ID)) {
              return {
                status: {
                  message: 'Error',
                  description:
                    'Wybrany śmietnik jest już przypisany do danej karty',
                },
              }
            }
            // zaktualizuj wniosek na zaakceptowany

            await prisma.dumpsters_Applications.update({
              where: {
                dumpstersApplications_ID,
              },
              data: {
                dumpstersApplications_dateReviewed: new Date(),
                dumpstersApplications_reviewedBy: reviewer,
                dumpstersApplications_statusID: 10,
              },
            })

            // dodaj śmeitnik do karty
            connectedDumpsters.push(dumpster_ID)

            const newDumpstersIDs = connectedDumpsters
              .toString()
              .replace(/,/g, ';')

            await prisma.users_Cards.update({
              where: {
                usersCards_ID: card_ID,
              },
              data: {
                usersCards_dumpstersIDs: newDumpstersIDs,
              },
            })
          } else {
            // zmien status wniosku na niezaakceptowany
            await prisma.dumpsters_Applications.update({
              where: {
                dumpstersApplications_ID,
              },
              data: {
                dumpstersApplications_dateReviewed: new Date(),
                dumpstersApplications_reviewedBy: reviewer,
                dumpstersApplications_statusID: 11,
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
