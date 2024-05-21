import { extendType, inputObjectType, nonNull } from 'nexus'

export const OfficialNewUserApplicationVerifyMutationProps = inputObjectType({
  name: 'OfficialNewUserApplicationVerifyMutationProps',
  definition(t) {
    t.nonNull.boolean('isVerified')
    t.nonNull.int('userID')
  },
})

export const OfficialNewUserApplicationVerifyMutation = extendType({
  type: 'OfficialNewUserApplicationMutation',
  definition(t) {
    t.field('verify', {
      type: 'MutationResponseType',
      args: {
        props: nonNull('OfficialNewUserApplicationVerifyMutationProps'),
      },
      async resolve(_parent, { props }, { prisma }) {
        const { isVerified, userID } = props
        try {
          // JEŚLI UZYTKOWNIK ZOSTAŁ ZWERYFIKOWANY, ZMIEN JEGO STATUS ORAZ ADRESU ZAMELDOWANIA, W PRZECIWNYM RAZIE USUŃ REKORDY Z BAZY
          if (isVerified) {
            await prisma.users.update({
              where: {
                users_ID: userID,
              },
              data: {
                users_statusID: 1,
              },
            })
            await prisma.users_Address.updateMany({
              where: {
                AND: [
                  {
                    usersAddress_userID: userID,
                  },
                  {
                    usersAddress_typeID: 3,
                  },
                ],
              },
              data: {
                usersAddress_statusID: 24,
              },
            })
          } else {
            // usuwamy rekordy z bazy, gdyz w przeciwnym wypadku uzytkownik nie mogłby sie ponownie rejestrowac uzywajac tego samego adresu email i peselu
            await prisma.users_Address.deleteMany({
              where: {
                AND: [
                  {
                    usersAddress_userID: userID,
                  },
                  {
                    usersAddress_typeID: 3,
                  },
                ],
              },
            })

            await prisma.users.delete({
              where: {
                users_ID: userID,
              },
            })
          }

          return {
            status: {
              message: 'Success',
            },
          }
        } catch {
          return {
            status: {
              message: 'Error',
              description: 'Error while veryfing',
            },
          }
        }
      },
    })
  },
})
