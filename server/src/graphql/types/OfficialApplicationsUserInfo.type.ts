import { objectType } from 'nexus'
import { UsersAddressType } from '@/graphql/types'

export const OfficialApplicationsUserInfoType = objectType({
  name: 'OfficialApplicationsUserInfoType',
  definition(t) {
    t.nonNull.int('users_ID')
    t.nonNull.string('users_login', { description: 'login/email' })
    t.nonNull.string('users_name')
    t.nonNull.string('users_identificationNumber', { description: 'PESEL/NIP' })
    t.nullable.string('users_phoneNumber')
    t.nonNull.int('users_statusID', { description: 'ID statusu usera' })
    t.list.field('addresses', { type: UsersAddressType })
  },
})
