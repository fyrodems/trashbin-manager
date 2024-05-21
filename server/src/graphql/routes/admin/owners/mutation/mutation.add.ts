import { extendType, inputObjectType, nonNull } from 'nexus'
import { loggedIn } from '@/utils/routeAuth'

export const AdminOwnersAddMutationProps = inputObjectType({
  name: 'AdminOwnersAddMutationProps',
  definition(t) {
    t.nonNull.int('user_ID')
    t.nonNull.int('dumpster_ID')
  },
})

export const AdminOwnersAddMutation = extendType({
  type: 'AdminOwnersMutation',
  definition(t) {
    t.field('add', {
      type: 'MutationResponseType',
      args: {
        props: nonNull('AdminOwnersAddMutationProps'),
      },
      authorize: loggedIn(),
      async resolve(_parent, { props }, { prisma }) {
        const { dumpster_ID, user_ID } = props
        try {
          // jesli to polaczenie juz istnieje, nic nie rob
          const isConnectionAlreadyExist =
            await prisma.dumpster_Owners.findMany({
              where: {
                AND: [
                  { dumpsterOwners_ownerID: user_ID },
                  { dumpsterOwners_dumpsterID: dumpster_ID },
                  { dumpsterOwners_statusID: 17 },
                ],
              },
            })
          if (isConnectionAlreadyExist.length > 0) {
            return {
              status: {
                message: 'Error',
              },
            }
          }

          const lastConnectionID = await prisma.dumpster_Owners.findMany({
            orderBy: {
              dumpsterOwners_ID: 'desc',
            },
            take: 1,
          })

          await prisma.dumpster_Owners.create({
            data: {
              dumpsterOwners_ID: lastConnectionID[0]?.dumpsterOwners_ID
                ? lastConnectionID[0].dumpsterOwners_ID + 1
                : 1,
              dumpsterOwners_ownerID: user_ID,
              dumpsterOwners_dumpsterID: dumpster_ID,
              dumpsterOwners_statusID: 17,
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
