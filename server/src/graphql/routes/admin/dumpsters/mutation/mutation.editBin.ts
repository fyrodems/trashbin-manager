import { extendType, inputObjectType, nonNull } from 'nexus'
import { loggedIn } from '@/utils/routeAuth'

export const AdminDumpstersBinEditMutationProps = inputObjectType({
  name: 'AdminDumpstersBinEditMutationProps',
  definition(t) {
    t.nonNull.int('dumpsterBin_ID')
    t.nonNull.int('dumpsterBin_typeID')
  },
})

export const AdminDumpstersBinEditMutation = extendType({
  type: 'AdminDumpstersMutation',
  definition(t) {
    t.field('bin', {
      type: 'MutationResponseType',
      args: {
        props: nonNull('AdminDumpstersBinEditMutationProps'),
      },
      authorize: loggedIn(),
      async resolve(_parent, { props }, { prisma }) {
        const { dumpsterBin_ID, dumpsterBin_typeID } = props
        try {
          await prisma.dumpster_Bin.update({
            where: {
              dumpsterBin_ID,
            },
            data: {
              dumpsterBin_typeID,
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
            },
          }
        }
      },
    })
  },
})
