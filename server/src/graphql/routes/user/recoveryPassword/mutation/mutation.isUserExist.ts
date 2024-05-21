import { extendType, inputObjectType } from 'nexus'
import * as postmark from 'postmark'

export const IsUserExistProps = inputObjectType({
  name: 'IsUserExistProps',
  definition(t) {
    t.nonNull.string('users_login')
  },
})

const getRandomValue = () => Math.floor(Math.random() * 10)

export const IsUserExist = extendType({
  type: 'UserRecoveryMutation',
  definition(t) {
    t.int('get', {
      args: {
        props: 'IsUserExistProps',
      },
      async resolve(_parent, { props }, { prisma }) {
        if (!props?.users_login) {
          throw new TypeError('Login can not be empty')
        }

        const foundUser = await prisma.users.findUnique({
          where: {
            users_login: props.users_login,
          },
        })

        // generate recovery recToken
        if (foundUser) {
          const recToken = Array.from({ length: 4 }).map(() => getRandomValue())

          await prisma.users.update({
            where: {
              users_ID: foundUser.users_ID,
            },
            data: {
              users_recoveryToken: recToken.join(''),
            },
          })

          // send email
          try {
            const client = new postmark.ServerClient(
              '36790901-6852-44ae-9f89-49b8a5dcb804'
            )
            await client.sendEmail({
              From: 's.wierzbicki@kratki.com',
              To: foundUser.users_login,
              Subject: 'Twój token do zmiany hasła',
              HtmlBody: `Wprowadz kod na stronie: <b>${recToken.join('')}</b>`,
              TextBody: `Wprowadz kod na stronie: ${recToken.join('')}`,
              MessageStream: 'outbound',
            })
          } catch (error) {
            console.log(error)
          }
        }

        return foundUser?.users_ID ?? null
      },
    })
  },
})
