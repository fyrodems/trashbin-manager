import { objectType } from 'nexus'

export const DumpsterBinType = objectType({
  name: 'DumpsterBinType',
  definition(t) {
    t.nonNull.int('dumpsterBin_ID')
    t.nonNull.int('dumpsterBin_dumpsterID')
    t.nonNull.boolean('dumpsterBin_isFull')
    t.nonNull.int('dumpsterBin_typeID')
  },
})
