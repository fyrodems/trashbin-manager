import { objectType } from 'nexus'
import { UserInfoType } from '@/graphql/types'

const DumpsterDataType = objectType({
  name: 'DumpsterDataType',
  definition(t) {
    t.nonNull.int('dumpster_ID')
    t.nonNull.string('dumpster_name')
    t.nullable.string('dumpster_description')
    t.nonNull.string('dumpster_street')
    t.nonNull.string('dumpster_city')
    t.nonNull.string('dumpster_postCode')
    t.nonNull.int('dumpster_communityID')
    t.nonNull.string('dumpster_houseNumbers')
    t.nonNull.boolean('dumpster_hasError')
  },
})

export const NewCardType = objectType({
  name: 'NewCardType',
  definition(t) {
    t.nonNull.int('cardsApplications_ID')
    t.nonNull.string('cardsApplications_dateAdded')
    t.nullable.string('cardsApplications_dateReviewed')
    t.nonNull.int('cardsApplications_typeID')
    t.nullable.int('cardsApplications_reviewedBy')
    t.nonNull.int('cardsApplications_userID')
    t.nonNull.int('cardsApplications_statusID')
    t.nonNull.field('user', { type: UserInfoType })
    t.nonNull.list.field('dumpsters', { type: DumpsterDataType })
  },
})
