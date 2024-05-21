import { objectType } from 'nexus'

export const CardsBulkOrderType = objectType({
  name: 'CardsBulkOrderType',
  definition(t) {
    t.nonNull.int('cardsBulkOrder_ID')
    t.nonNull.int('cardsBulkOrder_userID')
    t.nonNull.int('cardsBulkOrder_numOfCards')
    t.nonNull.int('cardsBulkOrder_statusID')
    t.nonNull.string('cardsBulkOrder_orderDate')
  },
})
