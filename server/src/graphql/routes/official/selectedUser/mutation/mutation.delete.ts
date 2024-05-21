import { extendType, inputObjectType, nonNull } from 'nexus'

export const OfficialDeleteUserMutationProps = inputObjectType({
  name: 'OfficialDeleteUserMutationProps',
  definition(t) {
    t.nonNull.int('user_ID')
  },
})

export const OfficialDeleteUserExtensionMutation = extendType({
  type: 'OfficialDeleteUserMutation',
  definition(t) {
    t.field('delete', {
      type: 'MutationResponseType',
      args: {
        props: nonNull('OfficialDeleteUserMutationProps'),
      },
      async resolve(_parent, { props }, { user, prisma }) {
        const { user_ID } = props

        try {
          // zarchiwizuj adresy uzywanego uzytkownika
          /*    await prisma.users_Address.updateMany({
            where: {
              usersAddress_userID: user_ID,
            },
            data: {
              usersAddress_statusID: 26,
            },
          }) */

          /*        // usuń wszelkie dostępy do śmietników z kart
          await prisma.users_Cards.updateMany({
            where: {
              usersCards_userID: user_ID,
            },
            data: {
              usersCards_dumpstersIDs: '',
            },
          }) */

          // zablokuj jego karty
          await prisma.users_Cards.updateMany({
            where: {
              usersCards_userID: user_ID,
            },
            data: {
              usersCards_statusID: 5,
            },
          })

          // odrzuć wszystkie jego wnioski
          await prisma.cards_Applications.updateMany({
            where: {
              AND: [
                { cardsApplications_userID: user_ID },
                { cardsApplications_statusID: 9 },
              ],
            },
            data: {
              cardsApplications_statusID: 11,
              cardsApplications_dateReviewed: new Date(),
              cardsApplications_reviewedBy: user?.users_ID,
            },
          })

          await prisma.address_Applications.updateMany({
            where: {
              AND: [
                { addressApplications_userID: user_ID },
                { addressApplications_statusID: 9 },
              ],
            },
            data: {
              addressApplications_statusID: 11,
              addressApplications_dateReviewed: new Date(),
              addressApplications_reviewedBy: user?.users_ID,
            },
          })

          await prisma.dumpsters_Applications.updateMany({
            where: {
              AND: [
                { dumpstersApplications_userID: user_ID },
                { dumpstersApplications_statusID: 9 },
              ],
            },
            data: {
              dumpstersApplications_statusID: 11,
              dumpstersApplications_dateReviewed: new Date(),
              dumpstersApplications_reviewedBy: user?.users_ID,
            },
          })

          await prisma.personalData_Applications.updateMany({
            where: {
              AND: [
                { personalDataApplications_userID: user_ID },
                { personalDataApplications_statusID: 9 },
              ],
            },
            data: {
              personalDataApplications_statusID: 11,
              personalDataApplications_dateReviewed: new Date(),
              personalDataApplications_reviewedBy: user?.users_ID,
            },
          })

          // usun uzytkownika
          await prisma.users.update({
            where: {
              users_ID: user_ID,
            },
            data: {
              users_statusID: 2,
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
