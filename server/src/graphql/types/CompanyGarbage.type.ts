import { objectType } from 'nexus'
import { RateType } from './UserContract.type'

export const CompanyGarbageType = objectType({
  name: 'CompanyGarbageType',
  definition(t) {
    t.nonNull.int('dumpsterID')
    t.nonNull.field('garbage', { type: RateType })
  },
})
