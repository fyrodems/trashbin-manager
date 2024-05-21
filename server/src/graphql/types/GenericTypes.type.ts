import { objectType } from 'nexus'
import { UserInfoType } from './UserInfo.type'
import { GarbageEntryType } from './GarbageEntry.type'
import { RateInfoType } from './RateInfo.type'
import { UsersAddressType } from './UsersAddress.type'

export const GenericTypesType = objectType({
  name: 'GenericTypesType',
  definition(t) {
    t.nonNull.int('type_ID')
    t.nonNull.string('type_name')
    t.nullable.field('type_description', { type: 'String' })
    t.nonNull.string('type_type')
    t.nonNull.list.nonNull.field('Garbage', { type: GarbageEntryType })
    t.nonNull.list.nonNull.field('Rate', { type: RateInfoType })
    t.nonNull.list.nonNull.field('Users', { type: UserInfoType })
    t.nonNull.list.nonNull.field('UsersAddress', { type: UsersAddressType })
  },
})
