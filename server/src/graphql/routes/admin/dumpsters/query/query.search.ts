import { extendType } from 'nexus'
import { loggedIn } from '@/utils/routeAuth'

export const AdminDumpstersSearchQuery = extendType({
  type: 'AdminDumpstersQuery',
  definition(t) {
    t.list.nonNull.field('get', {
      type: 'AdminDumpstersSearchQueryResult',
      authorize: loggedIn(),
      async resolve(_parent, _, { prisma }) {
        const dumpsters = await prisma.dumpster.findMany()

        // wyszukujemy aktualnych właścicieli śmietników
        const owners = await prisma.dumpster_Owners.findMany({
          where: { dumpsterOwners_statusID: 17 },
        })
        const ownersIDs = owners.map((o) => o.dumpsterOwners_ownerID)
        const ownersData = await prisma.users.findMany({
          where: {
            users_ID: { in: ownersIDs },
          },
        })

        // wyszukujemy jaki układ kubłów ma dana altana
        const binsInDumpsters = await prisma.dumpster_Bin.findMany({
          where: {
            dumpsterBin_dumpsterID: {
              in: dumpsters.map((d) => d.dumpster_ID),
            },
          },
        })

        const dumpstersFullData = dumpsters.map((d) => {
          return {
            ...d,
            owners: owners
              .filter((o) => o.dumpsterOwners_dumpsterID === d.dumpster_ID)
              .map((o) => o.dumpsterOwners_ownerID)
              // eslint-disable-next-line unicorn/prefer-array-find
              .map((o) => ownersData.filter((d) => d.users_ID === o)[0])
              .map((o) => ({
                users_name: o?.users_name,
                users_identificationNumber: o?.users_identificationNumber,
                users_phoneNumber: o?.users_phoneNumber,
                users_login: o?.users_login,
                users_statusID: o?.users_statusID,
                users_ID: o?.users_ID,
              })),
            bins: binsInDumpsters.filter(
              (b) => b.dumpsterBin_dumpsterID === d.dumpster_ID
            ),
          }
        })

        return dumpstersFullData
      },
    })
  },
})
