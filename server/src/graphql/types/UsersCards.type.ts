import { objectType } from 'nexus'

export const UsersCardsType = objectType({
  name: 'UsersCardsType',
  definition(t) {
    t.nonNull.int('usersCards_ID')
    t.nonNull.int('usersCards_userID')
    t.nonNull.int('usersCards_statusID', { description: 'id statusu karty' })
    t.nonNull.string('usersCards_number')
    t.nullable.field('usersCards_numberPIN', { type: 'String' })
    t.nullable.int('usersCards_rentedToUserID')
  },
})
