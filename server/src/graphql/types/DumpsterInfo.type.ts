import { objectType } from 'nexus'
import { ContractType } from './Contract.type'
import { DumpsterBinType } from './DumpsterBin.type'

export const DumpsterInfoType = objectType({
  name: 'DumpsterInfoType',
  definition(t) {
    t.nonNull.int('dumpster_ID')
    t.nonNull.string('dumpster_name')
    t.nullable.field('dumpster_description', { type: 'String' })
    t.nonNull.string('dumpster_street')
    t.nonNull.string('dumpster_city')
    t.nonNull.string('dumpster_postCode')
    t.nonNull.int('dumpster_communityID', { description: 'id gminy' })
    t.nonNull.string('dumpster_houseNumbers', {
      description: 'numery domów do których należy',
    })
    t.nonNull.boolean('dumpster_hasError')
    t.nonNull.int('dumpster_statusID')
    t.nonNull.list.nullable.field('contracts', { type: ContractType })
    t.nonNull.list.nullable.field('bins', { type: DumpsterBinType })
  },
})
