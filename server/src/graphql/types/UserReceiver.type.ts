import { objectType } from 'nexus'
import { UsersLogsType } from './UsersLogs.type'

export const UserReceiverType = objectType({
  name: 'UserReceiverType',
  definition(t) {
    t.nonNull.int('userReceiver_ID')
    t.nonNull.int('userReceiver_userID', {
      description: 'ID usera, którego dotyczą zmiany',
    })
    t.list.nonNull.field('usersLogs', { type: UsersLogsType })
  },
})
