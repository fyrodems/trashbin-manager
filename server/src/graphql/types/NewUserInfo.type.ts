import { objectType } from 'nexus'

export const NewUserInfoType = objectType({
  name: 'NewUserInfoType',
  definition(t) {
    t.nonNull.int('personalDataApplications_ID')
    t.nonNull.string('personalDataApplications_dateAdded')
    t.nullable.string('personalDataApplications_dateReviewed')
    t.nonNull.int('personalDataApplications_typeID')
    t.nullable.int('personalDataApplications_reviewedBy')
    t.nonNull.int('personalDataApplications_userID')
    t.nonNull.int('personalDataApplications_statusID')
    t.nonNull.string('personalDataApplications_name')
  },
})
