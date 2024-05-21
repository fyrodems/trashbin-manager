import { objectType } from 'nexus'

const GarbageSummaryByTypesType = objectType({
  name: 'GarbageSummaryByTypesType',
  definition(t) {
    t.nonNull.string('type')
    t.nullable.int('typeID')
    t.nonNull.int('mass')
    t.nonNull.string('color')
  },
})

const GarbagePieChartType = objectType({
  name: 'GarbagePieChartType',
  definition(t) {
    t.nonNull.list.nonNull.field('garbageTypes', {
      type: GarbageSummaryByTypesType,
    })
    t.nonNull.int('total')
  },
})

const GarbageLineChartType = objectType({
  name: 'GarbageLineChartType',
  definition(t) {
    t.nonNull.int('monthIndex')
    t.nonNull.string('month')
    t.nonNull.int('garbage_sum')
    t.nonNull.string('waste_name')
    t.nonNull.int('garbage_typeID')
    t.nonNull.string('garbage_fullDate')
  },
})

// const GarbageSortedByTypesType = objectType({
//   name: 'GarbageSortedByTypesType',
//   definition(t) {
//     t.nonNull.list.field('type', { type: GarbageLineChartType })
//   },
// })

export const GarbageEntryType = objectType({
  name: 'UserGarbageSummaryQuery',
  definition(t) {
    t.nonNull.field('pieChart', {
      type: GarbagePieChartType,
    })
    t.nonNull.list.nonNull.field('lineChart', {
      type: GarbageLineChartType,
    })
  },
})
