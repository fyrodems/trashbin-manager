import { extendType, inputObjectType, nonNull } from 'nexus'
import { hash } from 'bcrypt'

export const CompanyPINnumberMutationProps = inputObjectType({
  name: 'CompanyPINnumberMutationProps',
  definition(t) {
    t.nonNull.string('newPIN')
  },
})

export const CompanyPINnumberMutation = extendType({
  type: 'CompanyInfoMutation',
  definition(t) {
    t.nonNull.field('pin', {
      type: 'MutationResponseType',
      args: {
        props: nonNull('CompanyPINnumberMutationProps'),
      },
      async resolve(_parent, { props }, { user, prisma }) {
        const { newPIN } = props
        if (!user) {
          throw new TypeError('Unauthorized')
        }

        if (!newPIN) {
          throw new TypeError('Brak danych do zmiany')
        }

        try {
          const hashedPIN = await hash(props.newPIN, 10)
          await prisma.users.update({
            where: {
              users_ID: user.users_ID,
            },
            data: {
              users_PINnumber: hashedPIN,
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
