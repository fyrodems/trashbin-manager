import { extendType, inputObjectType, nullable } from 'nexus'

export const CompanyGarbageGetQueryProps = inputObjectType({
  name: 'CompanyGarbageGetQueryProps',
  definition(t) {
    t.nonNull.int('company_ID')
    t.nonNull.string('garbage_dateFrom')
    t.nonNull.string('garbage_dateTo')
  },
})

// interfejsy potrzebne do właściwego typowania obiektów

interface GarbageTypesByID {
  11: string
  12: string
  13: string
  14: string
  15: string
}

interface GarbageTypesByName {
  paper: number
  bio: number
  plastic: number
  glass: number
  mixed: number
}

export const CompanyGarbageGetQueryResult = extendType({
  type: 'CompanyGarbageQuery',
  definition(t) {
    t.list.nonNull.field('get', {
      type: 'CompanyGarbageType',
      args: {
        props: nullable('CompanyGarbageGetQueryProps'),
      },
      async resolve(_parent, { props }, { user, prisma }) {
        if (!user) {
          throw new TypeError('Unauthorized')
        }

        if (!props) {
          throw new TypeError('No props detected')
        }

        if (user.users_typeID === 10 || user.users_typeID === 9) {
          const companyDumpsters = await prisma.dumpster_Owners.findMany({
            where: {
              dumpsterOwners_ownerID: props.company_ID,
            },
          })

          const companyDumpstersIDs = companyDumpsters.map(
            (dumpster) => dumpster.dumpsterOwners_dumpsterID
          )

          const companyGarbageData = await prisma.garbage.findMany({
            where: {
              AND: [
                { garbage_dumpsterID: { in: companyDumpstersIDs } },
                {
                  garbage_date: {
                    lte: new Date(props.garbage_dateTo),
                    gte: new Date(props.garbage_dateFrom),
                  },
                },
              ],
            },
          })

          const garbageByDumpsterAndType = []

          for (const dumpster of companyDumpsters) {
            garbageByDumpsterAndType.push({
              dumpsterID: dumpster.dumpsterOwners_dumpsterID,
              garbage: { paper: 0, glass: 0, plastic: 0, bio: 0, mixed: 0 },
            })
          }

          const garbageTypes: GarbageTypesByID = {
            11: 'paper',
            12: 'bio',
            13: 'plastic',
            14: 'glass',
            15: 'mixed',
          }

          for (const garbage of companyGarbageData) {
            // eslint-disable-next-line unicorn/prefer-array-find
            const dumpster = garbageByDumpsterAndType.filter(
              (dumpster) => dumpster.dumpsterID === garbage.garbage_dumpsterID
            )[0]

            const garbageType =
              garbageTypes[garbage.garbage_typeID as keyof GarbageTypesByID]

            const garbageValue =
              dumpster?.garbage[garbageType as keyof GarbageTypesByName]

            const newGarbageValue = garbageValue + garbage.garbage_weight

            // eslint-disable-next-line unicorn/prefer-array-find
            garbageByDumpsterAndType.filter(
              (dumpster) => dumpster.dumpsterID === garbage.garbage_dumpsterID
            )[0].garbage[garbageType as keyof GarbageTypesByName] =
              newGarbageValue
          }

          return garbageByDumpsterAndType
        }

        throw new Error('Unauthorized')
      },
    })
  },
})
