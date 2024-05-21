import { extendType, inputObjectType, nonNull } from 'nexus'

export const CommonDumpstersGetQueryProps = inputObjectType({
  name: 'CommonDumpstersGetQueryProps',
  definition(t) {
    t.nonNull.list.nonNull.int('communities')
    t.nullable.int('ownerID')
  },
})

export const CommonDumpstersGetQuery = extendType({
  type: 'CommonDumpstersQuery',
  definition(t) {
    t.list.nonNull.field('get', {
      type: 'CommonDumpstersInfoType',
      args: {
        props: nonNull('CommonDumpstersGetQueryProps'),
      },
      async resolve(_parent, { props }, { prisma }) {
        const { communities, ownerID } = props

        if (ownerID) {
          const usersDumpsters = await prisma.dumpster_Owners.findMany({
            where: {
              AND: [
                { dumpsterOwners_ownerID: ownerID },
                { dumpsterOwners_statusID: 17 },
              ],
            },
          })
          const usersDumpstersIDs = usersDumpsters.map(
            (d) => d.dumpsterOwners_dumpsterID
          )
          const dumpsters = await prisma.dumpster.findMany({
            where: {
              AND: [
                { dumpster_ID: { in: usersDumpstersIDs } },
                { dumpster_statusID: 27 },
              ],
            },
          })
          return dumpsters
        }

        const dumpsters = await prisma.dumpster.findMany({
          where: {
            dumpster_communityID: { in: communities },
          },
        })
        return dumpsters
      },
    })
  },
})
