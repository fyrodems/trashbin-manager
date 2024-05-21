import { extendType, inputObjectType, nonNull } from 'nexus'

export const UserIDProps = inputObjectType({
  name: 'UserIDProps',
  definition(t) {
    t.nonNull.int('user_ID')
    t.nonNull.string('user_inputToken')
  },
})

export const UserRecoveryTokenQuery = extendType({
  type: 'UserRecoveryQuery',
  definition(t) {
    t.nullable.boolean('compare', {
      args: {
        props: nonNull('UserIDProps'),
      },
      async resolve(_parent, { props }, { prisma }) {
        if (!props?.user_ID || !props?.user_inputToken) return null

        const user = await prisma.users.findUnique({
          where: {
            users_ID: props.user_ID,
          },
        })

        return Boolean(user?.users_recoveryToken === props.user_inputToken)
      },
    })
  },
})
