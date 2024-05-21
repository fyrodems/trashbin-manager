import { objectType } from 'nexus'
import { UserInfoType } from './UserInfo.type'
import { UsersCardsType } from './UsersCards.type'
import { ContractType } from './Contract.type'

export const GenericStatusesType = objectType({
  name: 'GenericStatusesType',
  definition(t) {
    t.nonNull.int('status_ID')
    t.nonNull.string('status_name')
    t.nullable.field('status_description', { type: 'String' })
    t.nonNull.string('status_type')
    t.nonNull.list.nonNull.field('Users', { type: UserInfoType })
    t.nonNull.list.nonNull.field('UsersCards', { type: UsersCardsType })
    t.nonNull.list.nonNull.field('UsersContract', { type: ContractType })
  },
})
