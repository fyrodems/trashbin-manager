import { objectType } from 'nexus'
import { AdminUserInfoType } from './AdminUserInfo.type'

export const AdminNewOrderType = objectType({
  name: 'AdminNewOrderType',
  definition(t) {
    t.nonNull.int('cardsBulkOrder_ID')
    t.nonNull.int('cardsBulkOrder_userID')
    t.nonNull.int('cardsBulkOrder_numOfCards')
    t.nonNull.int('cardsBulkOrder_statusID')
    t.nonNull.string('cardsBulkOrder_orderDate')
    t.nonNull.field('user', { type: AdminUserInfoType })
  },
})
