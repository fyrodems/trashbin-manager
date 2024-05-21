import { extendType, nonNull, nullable } from 'nexus'
import { polishMonths, totalWeight } from './utils'

interface QueryResultType {
  garbage_sum: number
  garbage_typeID: number
  waste_name: string
  year: number
  month: number
  day: number
}

export const UserGarbageGetQueryExtension = extendType({
  type: 'UserGarbageQuery',
  definition(t) {
    t.field('get', {
      type: 'UserGarbageGetQueryResult',
      args: {
        props: nullable('UserGarbageGetQueryProps'),
      },
      resolve() {
        return true
      },
    })
  },
})

export const UserGarbageGetQueryResultUsage = extendType({
  type: 'UserGarbageGetQueryResult',
  definition(t) {
    t.nonNull.field('result', {
      type: 'UserGarbageSummaryQuery',
      args: {
        props: nonNull('UserGarbageGetQueryProps'),
      },
      async resolve(_parent, { props }, { user, prisma }) {
        if (!user) {
          throw new TypeError('Unauthorized')
        }

        const startDate = new Date(props.garbage_startDate ?? null)
        const endDate = new Date(props.garbage_endDate ?? null)

        const queryResult: QueryResultType[] = await prisma.$queryRaw`
        SELECT
          YEAR(garbage_date) AS year,
          MONTH(garbage_date) AS month,
          DAY(garbage_date) AS day,
          SUM (garbage_weight) AS garbage_sum, 
	            garbage_typeID, 
        (SELECT type_name FROM Type where type_ID = garbage_typeID) as waste_name
        FROM 
          Garbage
        WHERE
          garbage_usersID =  ${user.users_ID} and 
          garbage_date BETWEEN ${startDate} AND ${endDate}
        GROUP BY 
          YEAR(garbage_date), MONTH(garbage_date), DAY(garbage_date), garbage_typeID
        ORDER BY 
          YEAR(garbage_date), MONTH(garbage_date), DAY(garbage_date), garbage_typeID;`

        const wasteData = queryResult.map(
          ({ year, month, day, garbage_sum, waste_name, garbage_typeID }) => {
            return {
              monthIndex: month,
              month: polishMonths[month - 1],
              garbage_sum,
              waste_name,
              garbage_typeID,
              garbage_fullDate: new Date(
                new Date().setFullYear(year, month - 1, day)
              ).toISOString(),
            }
          }
        )

        const garbageSumTypes = [
          {
            type: 'Metale i tworzywa',
            typeID: 13,
            mass: totalWeight(wasteData, 'metale i tworzywa sztuczne'),
            color: '#FFE352',
          },
          {
            type: 'Papier',
            typeID: 11,
            mass: totalWeight(wasteData, 'papier'),
            color: '#5278FF',
          },
          {
            type: 'Szkło',
            typeID: 14,
            mass: totalWeight(wasteData, 'szkło'),
            color: '#5F8D4E',
          },
          {
            type: 'Bioodpady',
            typeID: 12,
            mass: totalWeight(wasteData, 'bioodpady'),
            color: '#4e2129',
          },
          {
            type: 'Odpady zmieszane',
            typeID: 15,
            mass: totalWeight(wasteData, 'odpady zmieszane'),
            color: '#2f2f2f',
          },
        ]

        const totalWasteMass = garbageSumTypes.reduce(
          (acc, { mass }) => acc + mass,
          0
        )

        return {
          pieChart: {
            garbageTypes: garbageSumTypes,
            total: totalWasteMass,
          },
          lineChart: wasteData,
        }
      },
    })
  },
})
