import { extendType, objectType } from 'nexus'

/**
 * Route definition
 */

export const CompanyDumpstersQuery = objectType({
  name: 'CompanyDumpstersQuery',
  definition() {},
})

export const CompanyDumpstersQueryExtension = extendType({
  type: 'CompanyQuery',
  definition(t) {
    t.field('dumpsters', {
      type: 'CompanyDumpstersQuery',
      resolve() {
        return true
      },
    })
  },
})

export * from './query.get'
