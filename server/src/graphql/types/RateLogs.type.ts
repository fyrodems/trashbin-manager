import { objectType } from 'nexus'

export const RateLogsType = objectType({
  name: 'RateLogsType',
  definition(t) {
    t.nonNull.int('rateLogs_ID');
    t.nonNull.int('rateLogs_rateID', {description: 'Identyfikator stawki, której dane są zmieniane'});
    t.nonNull.int('rateLogs_changeIDUser', {description: 'Identyfikator użytkownika, który zmienia'});
    t.nonNull.string('rateLogs_changeDate')
    t.nonNull.string('rateLogs_changeSQL')
  },
});
