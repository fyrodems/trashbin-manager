import { objectType } from 'nexus'

export const CommonUserDataGetQueryType = objectType({
  name: 'CommonUserDataGetQueryType',
  definition(t) {
    t.nonNull.field('basicInfo', {
      type: BasicInfoType,
    })
  },
})

const BasicInfoType = objectType({
  name: 'BasicInfoType',
  definition(t) {
    t.nonNull.int('users_ID')
    t.nonNull.string('users_login', { description: 'login/email' })
    t.nonNull.string('users_name')
    t.nonNull.string('users_identificationNumber', { description: 'PESEL/NIP' })
    t.nullable.string('users_phoneNumber')
    t.nonNull.int('users_statusID', { description: 'ID statusu usera' })
  },
})
