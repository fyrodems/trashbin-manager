import { objectType } from 'nexus'

export const UsersLogsType = objectType({
  name: 'UsersLogsType',
  definition(t) {
    t.nonNull.int('usersLogs_ID');
    t.nonNull.int('usersLogs_userChangeID', { description: "ID usera dokonujuącego zmiany" });
    t.nonNull.int('usersLogs_userReceiverID', { description: "ID usera, który jest zmieniany" });
    t.nonNull.string('usersLogs_changeDate')
    t.nonNull.string('usersLogs_changeSQL')
  },
});
