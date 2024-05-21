import { objectType } from 'nexus'
import { DumpsterInfoType } from './DumpsterInfo.type'

export const OfficialCardsTypeWDumpstersType = objectType({
  name: 'OfficialCardsTypeWDumpstersType',
  definition(t) {
    t.nonNull.int('usersCards_ID')
    t.nonNull.int('usersCards_userID')
    t.nonNull.int('usersCards_statusID', { description: 'id statusu karty' })
    t.nonNull.string('usersCards_number')
    t.nullable.field('usersCards_numberPIN', { type: 'String' })
    t.nullable.int('usersCards_rentedToUserID')
    t.nonNull.list.field('dumpsters', { type: DumpsterInfoType })
  },
})
