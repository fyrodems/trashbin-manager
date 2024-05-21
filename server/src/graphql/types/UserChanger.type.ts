import { objectType } from 'nexus'
import { UsersLogsType } from './UsersLogs.type';

export const UserChangerType = objectType({
  name: 'UserChangerType',
  definition(t) {
    t.nonNull.int('userChanger_ID');
    t.nonNull.int('userChanger_userID', { description: "ID usera dokonujuącego zmiany" });
    t.list.nonNull.field('usersLogs', { type: UsersLogsType });

  },
});
