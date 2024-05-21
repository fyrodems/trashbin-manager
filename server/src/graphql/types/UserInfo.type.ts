import { objectType } from 'nexus'
import { UsersAddressType } from './UsersAddress.type'

export const UserInfoType = objectType({
  name: 'UserInfoType',
  definition(t) {
    t.nonNull.int('users_ID')
    t.nonNull.string('users_login', { description: 'login/email' })
    t.nonNull.string('users_name')
    t.nonNull.string('users_password')
    t.nonNull.string('users_identificationNumber', { description: 'PESEL/NIP' })
    t.nullable.string('users_phoneNumber')
    t.nonNull.int('users_typeID', { description: 'typ (np. urzędnik)' })
    t.nonNull.int('users_statusID', { description: 'ID statusu usera' })
    t.nonNull.list.nonNull.field('addresses', { type: UsersAddressType })
  },
})
