import { extendType, objectType } from 'nexus'

/**
 * Route definition
 */

export const OfficialDumpstersQuery = objectType({
  name: 'OfficialDumpstersQuery',
  definition() {},
})

export const OfficialDumpstersQueryExtension = extendType({
  type: 'OfficialQuery',
  definition(t) {
    t.field('dumpsters', {
      type: 'OfficialDumpstersQuery',
      resolve() {
        return true
      },
    })
  },
})

export * from './query.get'
