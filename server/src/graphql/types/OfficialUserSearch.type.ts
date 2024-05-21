import { objectType } from 'nexus'

export const OfficialUserSearchType = objectType({
  name: 'OfficialUserSearchType',
  definition(t) {
    t.nonNull.string('users_name')
    t.nonNull.string('users_identificationNumber')
    t.nullable.string('users_phoneNumber')
    t.nonNull.string('users_login')
    t.nonNull.int('users_statusID')
    t.nonNull.int('users_ID')
    t.nullable.string('users_PINnumber')
  },
})
