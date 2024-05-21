import { extendType, inputObjectType, nonNull } from 'nexus'

export const OfficialAddressInfoAddMutationProps = inputObjectType({
  name: 'OfficialAddressInfoAddMutationProps',
  definition(t) {
    t.nonNull.int('usersAddress_userID')
    t.nonNull.string('usersAddress_street')
    t.nonNull.string('usersAddress_houseNumber')
    t.nullable.string('usersAddress_apartamentNumber')
    t.nonNull.string('usersAddress_postCode')
    t.nonNull.string('usersAddress_city')
    t.nonNull.int('usersAddress_typeID')
    t.nonNull.int('usersAddress_communityID')
  },
})

export const OfficialAddressInfoAddMutation = extendType({
  type: 'OfficialAddressInfoMutation',
  definition(t) {
    t.field('add', {
      type: 'MutationResponseType',
      args: {
        props: nonNull('OfficialAddressInfoAddMutationProps'),
      },
      async resolve(_parent, { props }, { prisma }) {
        const {
          usersAddress_userID,
          usersAddress_street,
          usersAddress_houseNumber,
          usersAddress_apartamentNumber,
          usersAddress_postCode,
          usersAddress_city,
          usersAddress_typeID,
          usersAddress_communityID,
        } = props
        try {
          const lastAddressID = await prisma.users_Address.findMany({
            orderBy: {
              usersAddress_ID: 'desc',
            },
            take: 1,
          })

          await prisma.users_Address.create({
            data: {
              usersAddress_ID: lastAddressID[0]?.usersAddress_ID
                ? lastAddressID[0].usersAddress_ID + 1
                : 1,
              usersAddress_userID,
              usersAddress_street,
              usersAddress_houseNumber,
              usersAddress_apartamentNumber,
              usersAddress_postCode,
              usersAddress_city,
              usersAddress_typeID,
              usersAddress_communityID,
              usersAddress_statusID: 24,
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
              description: 'Error while creating address',
            },
          }
        }
      },
    })
  },
})
