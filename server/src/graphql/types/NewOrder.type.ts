import { objectType } from 'nexus'
import { UserInfoType } from '@/graphql/types'

export const NewOrderType = objectType({
  name: 'NewOrderType',
  definition(t) {
    t.nonNull.int('cardsBulkOrder_ID')
    t.nonNull.int('cardsBulkOrder_userID')
    t.nonNull.int('cardsBulkOrder_numOfCards')
    t.nonNull.int('cardsBulkOrder_statusID')
    t.nonNull.string('cardsBulkOrder_orderDate')
    t.nonNull.field('user', { type: UserInfoType })
  },
})
