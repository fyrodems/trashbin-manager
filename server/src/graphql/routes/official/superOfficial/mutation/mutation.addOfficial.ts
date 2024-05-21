import { extendType, inputObjectType, nonNull } from 'nexus'
import { hash } from 'bcrypt'
import { loggedIn } from '@/utils/routeAuth'

export const SuperOfficialNewOfficialAddMutationProps = inputObjectType({
  name: 'SuperOfficialNewOfficialAddMutationProps',
  definition(t) {
    t.nonNull.string('users_login')
    t.nonNull.string('users_password')
    t.nonNull.string('users_name')
    t.nonNull.string('users_identificationNumber')
    t.nullable.string('users_phoneNumber')
  },
})

export const SuperOfficialAddOfficialsMutationExtension = extendType({
  type: 'SuperOfficialOfficialsMutation',
  definition(t) {
    t.field('add', {
      type: 'MutationResponseType',
      args: {
        props: nonNull('SuperOfficialNewOfficialAddMutationProps'),
      },
      authorize: loggedIn(),
      async resolve(_parent, { props }, { prisma, user }) {
        if (!user || user.users_typeID !== 6) {
          throw new TypeError('Unauthorized')
        }

        const {
          users_login,
          users_password,
          users_name,
          users_identificationNumber,
          users_phoneNumber,
        } = props

        try {
          const lastUserID = await prisma.users.findMany({
            orderBy: {
              users_ID: 'desc',
            },
            take: 1,
          })

          const hashedPassword = await hash(users_password, 10)
          const newOfficial = await prisma.users.create({
            data: {
              users_ID: lastUserID[0]?.users_ID
                ? lastUserID[0].users_ID + 1
                : 1,
              users_login,
              users_password: hashedPassword,
              users_name,
              users_typeID: 5,
              users_statusID: 1,
              users_identificationNumber,
              users_phoneNumber,
            },
          })

          const lastAddressID = await prisma.users_Address.findMany({
            orderBy: {
              usersAddress_ID: 'desc',
            },
            take: 1,
          })

          const superOfficialAddress = await prisma.users_Address.findFirst({
            where: {
              AND: [
                { usersAddress_userID: user.users_ID },
                { usersAddress_typeID: 3 },
              ],
            },
          })

          if (superOfficialAddress) {
            await prisma.users_Address.create({
              data: {
                usersAddress_ID: lastAddressID[0]?.usersAddress_ID
                  ? lastAddressID[0].usersAddress_ID + 1
                  : 1,
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
            })

            return {
              status: {
                message: 'Success',
              },
            }
          }

          return {
            status: {
              message: 'Error',
              description: 'Brak danych adresowych',
            },
          }
        } catch {
          return {
            status: {
              message: 'Error',
              description: 'Istnieje już konto z podanymi danymi',
            },
          }
        }
      },
    })
  },
})
