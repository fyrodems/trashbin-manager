import { objectType } from 'nexus'

export const CommonDumpstersInfoType = objectType({
  name: 'CommonDumpstersInfoType',
  definition(t) {
    t.nonNull.int('dumpster_ID')
    t.nonNull.string('dumpster_name')
    t.nullable.string('dumpster_description')
    t.nonNull.string('dumpster_street')
    t.nonNull.string('dumpster_city')
    t.nonNull.string('dumpster_postCode')
    t.nonNull.int('dumpster_communityID')
    t.nonNull.string('dumpster_houseNumbers', {
      description: 'numery domów do których należy',
    })
    t.nonNull.boolean('dumpster_hasError')
  },
})
