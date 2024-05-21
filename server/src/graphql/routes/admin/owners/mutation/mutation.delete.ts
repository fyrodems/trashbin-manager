import { extendType, inputObjectType, nonNull } from 'nexus'
import { loggedIn } from '@/utils/routeAuth'

export const AdminOwnersDeleteMutationProps = inputObjectType({
  name: 'AdminOwnersDeleteMutationProps',
  definition(t) {
    t.nonNull.int('user_ID')
    t.nonNull.int('dumpster_ID')
  },
})

export const AdminOwnersDeleteMutation = extendType({
  type: 'AdminOwnersMutation',
  definition(t) {
    t.field('delete', {
      type: 'MutationResponseType',
      args: {
        props: nonNull('AdminOwnersDeleteMutationProps'),
      },
      authorize: loggedIn(),
      async resolve(_parent, { props }, { prisma }) {
        const { dumpster_ID, user_ID } = props
        try {
          const connection = await prisma.dumpster_Owners.findMany({
            where: {
              AND: [
                { dumpsterOwners_ownerID: user_ID },
                { dumpsterOwners_dumpsterID: dumpster_ID },
              ],
            },
          })

          await prisma.dumpster_Owners.update({
            where: { dumpsterOwners_ID: connection[0].dumpsterOwners_ID },
            data: {
              dumpsterOwners_statusID: 18,
            },
          })
          /* 
          await prisma.dumpster_Owners.delete({
            where: { dumpsterOwners_ID: connection[0].dumpsterOwners_ID },
          }) */

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
