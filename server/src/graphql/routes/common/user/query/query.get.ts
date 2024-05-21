import { extendType, inputObjectType, nullable } from 'nexus'

export const CommonUserDataGetQueryProps = inputObjectType({
  name: 'CommonUserDataGetQueryProps',
  definition(t) {
    t.nonNull.int('users_ID')
  },
})

export const CommonUserDataGetQuery = extendType({
  type: 'CommonUserQuery',
  definition(t) {
    t.nonNull.field('get', {
      type: 'CommonUserDataGetQueryType',
      args: {
        props: nullable('CommonUserDataGetQueryProps'),
      },
      async resolve(_parent, { props }, { user, prisma }) {
        if (!user) {
          throw new TypeError('Unauthorized')
        }

        if (
          user.users_typeID === 5 ||
          user.users_typeID === 6 ||
          user.users_typeID === 7 ||
          user.users_typeID === 9 ||
          user.users_typeID === 10
        ) {
          // WYBRANY UZYTKOWNIK
          const selectedUser = await prisma.users.findUnique({
            where: {
              users_ID: props?.users_ID,
            },
          })
          // JEŚLI NIE MA UZYTKOWNIKA, LUB JEST TO FIRMA, WYRZUĆ BŁĄD
          if (!selectedUser || selectedUser.users_typeID !== 4) {
            throw new TypeError('Unauthorized')
          }

          const selectedUserData = {
            basicInfo: selectedUser,
          }

          return selectedUserData
        }

        throw new TypeError('Unauthorized')
      },
    })
  },
})
