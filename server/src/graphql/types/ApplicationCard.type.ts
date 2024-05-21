import { objectType } from 'nexus'

export const ApplicationCardType = objectType({
  name: 'ApplicationCardType',
  definition(t) {
    t.nonNull.int('cardsApplications_ID')
    t.nonNull.string('cardsApplications_dateAdded')
    t.nullable.string('cardsApplications_dateReviewed')
    t.nonNull.int('cardsApplications_typeID')
    t.nullable.int('cardsApplications_reviewedBy')
    t.nonNull.int('cardsApplications_userID')
    t.nonNull.int('cardsApplications_statusID')
  },
})
