import { extendType, inputObjectType, nonNull } from 'nexus'
import { loggedIn } from '@/utils/routeAuth'

export const AdminDumpstersEditMutationProps = inputObjectType({
  name: 'AdminDumpstersEditMutationProps',
  definition(t) {
    t.nonNull.int('dumpster_ID')
    t.nonNull.string('dumpster_name')
    t.nullable.string('dumpster_description')
    t.nonNull.string('dumpster_street')
    t.nonNull.string('dumpster_city')
    t.nonNull.string('dumpster_postCode')
    t.nonNull.int('dumpster_communityID')
    t.nonNull.string('dumpster_houseNumbers')
    t.nonNull.boolean('dumpster_hasError')
  },
})

export const AdminDumpstersEditMutation = extendType({
  type: 'AdminDumpstersMutation',
  definition(t) {
    t.field('edit', {
      type: 'MutationResponseType',
      args: {
        props: nonNull('AdminDumpstersEditMutationProps'),
      },
      authorize: loggedIn(),
      async resolve(_parent, { props }, { prisma }) {
        const {
          dumpster_ID,
          dumpster_name,
          dumpster_description,
          dumpster_street,
          dumpster_city,
          dumpster_postCode,
          dumpster_communityID,
          dumpster_houseNumbers,
          dumpster_hasError,
        } = props
        try {
          await prisma.dumpster.update({
            where: { dumpster_ID },
            data: {
              dumpster_name,
              dumpster_description,
              dumpster_street,
              dumpster_city,
              dumpster_postCode,
              dumpster_communityID,
              dumpster_houseNumbers,
              dumpster_hasError,
            },
          })

          await prisma.dumpster_Bin.findMany({
            where: { dumpsterBin_dumpsterID: dumpster_ID },
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
            },
          }
        }
      },
    })
  },
})
