import { objectType } from 'nexus'
import { ApplicationAddressType } from './ApplicationAddress.type'
import { NewUserInfoType } from './NewUserInfo.type'
import { NewDumpsterApplicationType } from './NewDumpsterApplication.type'

export const UserApplicationCardType = objectType({
  name: 'UserApplicationCardType',
  definition(t) {
    t.nonNull.int('cardsApplications_ID')
    t.nonNull.int('cardsApplications_userID')
    t.nonNull.int('cardsApplications_statusID')
    t.nonNull.int('cardsApplications_typeID')
    t.nonNull.string('cardsApplications_dateAdded')
    t.nullable.string('cardsApplications_dateReviewed')
  },
})

export const UserApplicationsType = objectType({
  name: 'UserApplicationsType',
  definition(t) {
    t.nonNull.list.nonNull.field('cards', { type: UserApplicationCardType })
    t.nonNull.list.nonNull.field('address', { type: ApplicationAddressType })
    t.nonNull.list.nonNull.field('dumpsters', {
      type: NewDumpsterApplicationType,
    })
    t.nonNull.list.nonNull.field('personalData', { type: NewUserInfoType })
  },
})
