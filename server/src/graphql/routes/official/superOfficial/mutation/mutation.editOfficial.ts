import { extendType, inputObjectType, nonNull } from 'nexus'
import { hash } from 'bcrypt'
import { loggedIn } from '@/utils/routeAuth'

export const SuperOfficialOfficialEditMutationProps = inputObjectType({
  name: 'SuperOfficialOfficialEditMutationProps',
  definition(t) {
    t.nonNull.int('users_ID')
    t.nonNull.string('users_login')
    t.nullable.string('users_password')
    t.nullable.string('users_confirmPassword')
    t.nonNull.string('users_name')
    t.nonNull.string('users_identificationNumber')
    t.nullable.string('users_phoneNumber')
  },
})

export const SuperOfficialEditOfficialsMutationExtension = extendType({
  type: 'SuperOfficialOfficialsMutation',
  definition(t) {
    t.field('edit', {
      type: 'MutationResponseType',
      args: {
        props: nonNull('SuperOfficialOfficialEditMutationProps'),
      },
      authorize: loggedIn(),
      async resolve(_parent, { props }, { prisma, user }) {
        if (!user || user.users_typeID !== 6) {
          throw new TypeError('Unauthorized')
        }

        const {
          users_ID,
          users_login,
          users_password,
          users_confirmPassword,
          users_name,
          users_identificationNumber,
          users_phoneNumber,
        } = props

        try {
          let data
          if (users_password && users_password === users_confirmPassword) {
            const hashedPassword = await hash(users_password, 10)

            data = {
              users_login,
              users_password: hashedPassword,
              users_name,
              users_typeID: 5,
              users_statusID: 1,
              users_identificationNumber,
              users_phoneNumber,
            }
          } else {
            data = {
              users_login,
              users_name,
              users_typeID: 5,
              users_statusID: 1,
              users_identificationNumber,
              users_phoneNumber,
            }
          }

          await prisma.users.update({
            where: {
              users_ID,
            },
            data,
          })

          // czy dodać tez edytowalnosc adresu?
          /* 
          await prisma.users_Address.create({
            data: {
              usersAddress_ID: lastAddressID[0]?.usersAddress_ID ?  lastAddressID[0].usersAddress_ID + 1 : 1,
              usersAddress_userID: newOfficial.users_ID,
              usersAddress_street: superOfficialAddress.usersAddress_street,
              usersAddress_houseNumber:
                superOfficialAddress?.usersAddress_houseNumber,
              usersAddress_apartamentNumber:
                superOfficialAddress?.usersAddress_apartamentNumber,
              usersAddress_postCode:
                superOfficialAddress?.usersAddress_postCode,
              usersAddress_city: superOfficialAddress?.usersAddress_city,
              usersAddress_typeID: 3,
              usersAddress_communityID:
                superOfficialAddress?.usersAddress_communityID,
              usersAddress_statusID: 24,
            },
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
              description: 'Error while editing official',
            },
          }
        }
      },
    })
  },
})
