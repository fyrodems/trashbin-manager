import { objectType } from 'nexus'

const DumpsterMathingCardInfoType = objectType({
  name: 'DumpsterMathingCardInfoType',
  definition(t) {
    t.nonNull.string('dumpster_name')
    t.nonNull.string('dumpster_street')
    t.nonNull.string('dumpster_city')
    t.nonNull.string('dumpster_houseNumbers', {
      description: 'numery domów do których należy',
    })
  },
})

export const CardsWithMatchingDumpstersType = objectType({
  name: 'CardsWithMatchingDumpstersType',
  definition(t) {
    t.nonNull.int('usersCards_ID')
    t.nonNull.string('usersCards_number')
    t.nonNull.list.nonNull.field('dumpsters', {
      type: DumpsterMathingCardInfoType,
    })
  },
})
