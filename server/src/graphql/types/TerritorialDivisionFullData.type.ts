import { objectType } from 'nexus'
import { VoivodeshipInfoType } from './VoivodeshipInfo.type'
import { CommunityInfoType } from './CommunityInfo.type'
import { MunicipalityInfoType } from './MunicipalityInfo.type'

export const TerritorialDivisionFullDataType = objectType({
  name: 'TerritorialDivisionFullDataType',
  definition(t) {
    t.nonNull.field('voivodeship', { type: VoivodeshipInfoType })
    t.nonNull.field('municipality', { type: MunicipalityInfoType })
    t.nonNull.field('community', { type: CommunityInfoType })
  },
})
