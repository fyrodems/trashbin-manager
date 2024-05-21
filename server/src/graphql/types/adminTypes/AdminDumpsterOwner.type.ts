import { objectType } from 'nexus'

export const AdminDumpsterOwnerType = objectType({
  name: 'AdminDumpstersOwnerType',
  definition(t) {
    t.nonNull.string('users_name')
    t.nonNull.string('users_identificationNumber')
    t.nullable.string('users_phoneNumber')
    t.nonNull.string('users_login')
    t.nonNull.int('users_statusID')
    t.nonNull.int('users_ID')
  },
})
