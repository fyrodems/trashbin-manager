import { extendType, inputObjectType, nonNull } from 'nexus'

export const OfficialAddressInfoEditMutationProps = inputObjectType({
  name: 'OfficialAddressInfoEditMutationProps',
  definition(t) {
    t.nonNull.int('usersAddress_ID')
    t.nonNull.string('usersAddress_street')
    t.nonNull.string('usersAddress_houseNumber')
    t.nullable.string('usersAddress_apartamentNumber')
    t.nonNull.string('usersAddress_postCode')
    t.nonNull.string('usersAddress_city')
    t.nonNull.int('usersAddress_typeID')
    t.nonNull.int('usersAddress_communityID')
  },
})

export const OfficialAddressInfoEditMutation = extendType({
  type: 'OfficialAddressInfoMutation',
  definition(t) {
    t.field('edit', {
      type: 'MutationResponseType',
      args: {
        props: nonNull('OfficialAddressInfoEditMutationProps'),
      },
      async resolve(_parent, { props }, { prisma }) {
        const {
          usersAddress_ID,
          usersAddress_street,
          usersAddress_houseNumber,
          usersAddress_apartamentNumber,
          usersAddress_postCode,
          usersAddress_city,
          usersAddress_typeID,
          usersAddress_communityID,
        } = props
        try {
          await prisma.users_Address.update({
            where: {
              usersAddress_ID,
            },
            data: {
              usersAddress_street,
              usersAddress_houseNumber,
              usersAddress_apartamentNumber,
              usersAddress_postCode,
              usersAddress_city,
              usersAddress_typeID,
              usersAddress_communityID,
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
              description: 'Error while editing address',
            },
          }
        }
      },
    })
  },
})
