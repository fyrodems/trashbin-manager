import { objectType } from 'nexus'

export const CommunityInfoType = objectType({
  name: 'CommunityInfoType',
  definition(t) {
    t.nonNull.int('community_ID')
    t.nonNull.string('community_name')
    t.nonNull.string('community_description')
    t.nonNull.int('community_municipalityID')
    t.nonNull.int('community_voivodeshipID')
  },
})
