import { objectType } from 'nexus'

export const RateInfoType = objectType({
  name: 'RateInfoType',
  definition(t) {
    t.nonNull.int('rate_ID')
    t.nonNull.int('rate_typeID')
    t.nullable.int('rate_dumpsterContractID')
    t.nullable.int('rate_userContractID')
    t.nonNull.float('rate_value')
    t.nonNull.int('rate_statusID')
  },
})
