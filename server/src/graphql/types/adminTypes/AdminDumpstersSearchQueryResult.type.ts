import { objectType } from 'nexus'
import { DumpsterBinType } from '../DumpsterBin.type'
import { AdminDumpsterOwnerType } from './AdminDumpsterOwner.type'

export const AdminDumpstersSearchQueryResult = objectType({
  name: 'AdminDumpstersSearchQueryResult',
  definition(t) {
    t.nonNull.int('dumpster_ID')
    t.nonNull.string('dumpster_name')
    t.nullable.string('dumpster_description')
    t.nonNull.string('dumpster_street')
    t.nonNull.string('dumpster_city')
    t.nonNull.string('dumpster_postCode')
    t.nonNull.int('dumpster_communityID')
    t.nonNull.string('dumpster_houseNumbers')
    t.nonNull.boolean('dumpster_hasError')
    t.nonNull.int('dumpster_statusID')
    t.nonNull.list.nullable.field('bins', { type: DumpsterBinType })
    t.nonNull.list.nullable.field('owners', { type: AdminDumpsterOwnerType })
  },
})
