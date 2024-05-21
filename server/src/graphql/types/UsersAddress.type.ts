import { objectType } from 'nexus'

export const UsersAddressType = objectType({
  name: 'UsersAddressType',
  definition(t) {
    t.nonNull.int('usersAddress_ID')
    t.nonNull.int('usersAddress_userID', { description: 'id usera' })
    t.nonNull.string('usersAddress_street')
    t.nonNull.string('usersAddress_houseNumber')
    t.nullable.string('usersAddress_apartamentNumber')
    t.nonNull.string('usersAddress_postCode')
    t.nonNull.string('usersAddress_city')
    t.nonNull.int('usersAddress_typeID', {
      description:
        'id typu adesu (korespondecyjny, zamieszkania, zameldowania)',
    })
    t.nonNull.int('usersAddress_communityID', { description: 'id gminy' })
    t.nonNull.int('usersAddress_statusID')
  },
})
