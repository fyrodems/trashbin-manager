import { objectType } from 'nexus'
import { RateInfoType } from './RateInfo.type'

export const ContractType = objectType({
  name: 'ContractType',
  definition(t) {
    t.nonNull.int('dumpsterContract_ID', { description: 'ID of the contract' })
    t.nonNull.string('dumpsterContract_number', {
      description: 'Contract number',
    })
    t.nonNull.int('dumpsterContract_dumpsterID')
    t.nonNull.string('dumpsterContract_dateFrom')
    t.nonNull.string('dumpsterContract_dateTo')
    t.nonNull.int('dumpsterContract_statusID')
    t.nonNull.int('dumpsterContract_communityID')
    t.list.nullable.field('rates', { type: RateInfoType })
  },
})
