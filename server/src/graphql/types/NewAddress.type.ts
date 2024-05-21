import { objectType } from 'nexus'
import { OfficialApplicationsUserInfoType } from './OfficialApplicationsUserInfo.type'

export const NewAddressType = objectType({
  name: 'NewAddressType',
  definition(t) {
    t.nonNull.int('addressApplications_ID')
    t.nonNull.string('addressApplications_dateAdded')
    t.nullable.string('addressApplications_dateReviewed')
    t.nonNull.int('addressApplications_typeID')
    t.nullable.int('addressApplications_reviewedBy')
    t.nonNull.int('addressApplications_userID')
    t.nonNull.int('addressApplications_statusID')
    t.nonNull.string('addressApplications_street')
    t.nonNull.string('addressApplications_houseNumber')
    t.nullable.string('addressApplications_apartamentNumber')
    t.nonNull.string('addressApplications_postCode')
    t.nonNull.string('addressApplications_city')
    t.nonNull.int('addressApplications_addressTypeID')
    t.nonNull.int('addressApplications_communityID')
    t.nullable.int('addressApplications_addressID')
    t.nonNull.field('user', { type: OfficialApplicationsUserInfoType })
  },
})
