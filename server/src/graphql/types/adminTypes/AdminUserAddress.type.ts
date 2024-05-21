import { objectType } from 'nexus'

export const AdminUserAddressType = objectType({
  name: 'AdminUserAddressType',
  definition(t) {
    t.nonNull.int('usersAddress_ID')
    t.nonNull.int('usersAddress_userID')
    t.nonNull.string('usersAddress_street')
    t.nonNull.string('usersAddress_houseNumber')
    t.nullable.string('usersAddress_apartamentNumber')
    t.nonNull.string('usersAddress_postCode')
    t.nonNull.string('usersAddress_city')
    t.nonNull.int('usersAddress_typeID')
    t.nonNull.int('usersAddress_communityID')
    t.nonNull.int('usersAddress_statusID')
  },
})
