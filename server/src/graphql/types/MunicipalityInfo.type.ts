import { objectType } from 'nexus'
import { CommunityInfoType } from './CommunityInfo.type'

export const MunicipalityInfoType = objectType({
  name: 'MunicipalityInfoType',
  definition(t) {
    t.nonNull.int('municipality_ID')
    t.nonNull.string('municipality_name')
    t.nonNull.string('municipality_description')
    t.nonNull.int('municipality_voivodeshipID')
    /*   t.nonNull.list.nonNull.field('Community', { type: CommunityInfoType }) */
  },
})
