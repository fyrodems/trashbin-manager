import { extendType } from 'nexus'
import { loggedIn } from '@/utils/routeAuth'

interface queryResultType {
  usersCards_ID: number
  usersCards_number: string
  usersCards_dumpstersIDs: string
}

interface DumpasterQueryResultType {
  dumpster_city: string
  dumpster_houseNumbers: string
  dumpster_name: string
  dumpster_street: string
}

export const GetUserCardsInfoWithDumpsterQuery = extendType({
  type: 'UserCardQuery',
  definition(t) {
    t.list.nonNull.field('cardsAndDumpsters', {
      type: 'CardsWithMatchingDumpstersType',
      authorize: loggedIn(),
      async resolve(_parent, _args, { user, prisma }) {
        if (!user) {
          throw new TypeError('Unauthorized')
        }

        const queryResult: queryResultType[] = await prisma.$queryRaw`
        SELECT usersCards_ID, usersCards_number, usersCards_dumpstersIDs
          FROM Users_Cards
          WHERE usersCards_userID = ${user.users_ID}
          AND usersCards_statusID = 5
        `

        const getDumpsterData = async () => {
          const dumpstersData: DumpasterQueryResultType[] =
            await prisma.$queryRaw`
          SELECT * 
          FROM dumpster 
          where dumpster_ID 
          IN(
              SELECT value  
              FROM STRING_SPLIT((SELECT  REPLACE(usersCards_dumpstersIDs, ';', ','
            )
            FROM Users_Cards
            WHERE usersCards_id=146), ','))
          `

          return [...dumpstersData]
        }

        const queryResultWithDumpstersData = await Promise.all(
          queryResult.map(async ({ usersCards_dumpstersIDs, ...card }) => {
            if (!usersCards_dumpstersIDs) return { ...card, dumpsters: [] }

            const res = await getDumpsterData()
            return { ...card, dumpsters: [...res] }
          })
        )

        return queryResultWithDumpstersData
      },
    })
  },
})
