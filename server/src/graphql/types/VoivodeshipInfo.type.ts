import { objectType } from 'nexus'
import { CommunityInfoType } from './CommunityInfo.type'
import { MunicipalityInfoType } from './MunicipalityInfo.type'

export const VoivodeshipInfoType = objectType({
  name: 'VoivodeshipInfoType',
  definition(t) {
    t.nonNull.int('voivodeship_ID')
    t.nonNull.string('voivodeship_name')
    t.nullable.field('voivodeship_description', { type: 'String' })
    /*   t.nonNull.list.nonNull.field('Community', { type: CommunityInfoType })
    t.nonNull.list.nonNull.field('Municipality', { type: MunicipalityInfoType }) */
  },
})
