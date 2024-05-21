import { objectType } from 'nexus'

export const NewDumpsterApplicationType = objectType({
  name: 'NewDumpsterApplicationType',
  definition(t) {
    t.nonNull.int('dumpstersApplications_ID')
    t.nonNull.string('dumpstersApplications_dateAdded')
    t.nullable.string('dumpstersApplications_dateReviewed')
    t.nonNull.int('dumpstersApplications_typeID')
    t.nullable.int('dumpstersApplications_reviewedBy')
    t.nonNull.int('dumpstersApplications_userID')
    t.nonNull.string('dumpstersApplications_userName')
    t.nonNull.int('dumpstersApplications_dumpsterID')
    t.nonNull.int('dumpstersApplications_statusID')
    t.nonNull.int('dumpstersApplications_cardID')
    t.nonNull.string('dumpstersApplications_cardNumber')
    t.nonNull.string('dumpstersApplications_dumpsterName')
  },
})
