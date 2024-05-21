import { objectType } from 'nexus'
import { AdminUserAddressType } from './AdminUserAddress.type'

export const AdminUserInfoType = objectType({
  name: 'AdminUserInfoType',
  definition(t) {
    t.nonNull.int('users_ID')
    t.nonNull.string('users_login')
    t.nonNull.string('users_name')
    t.nonNull.string('users_identificationNumber')
    t.nullable.string('users_phoneNumber')
    t.nonNull.int('users_statusID')
    t.nonNull.int('users_typeID')
    t.nonNull.list.nonNull.field('addresses', { type: AdminUserAddressType })
  },
})
