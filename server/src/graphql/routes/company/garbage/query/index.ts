import { extendType, objectType } from 'nexus'

/**
 * Route definition
 */

export const CompanyGarbageQuery = objectType({
  name: 'CompanyGarbageQuery',
  definition() {},
})

export const CompanyGarbageQueryExtension = extendType({
  type: 'CompanyQuery',
  definition(t) {
    t.field('garbage', {
      type: 'CompanyGarbageQuery',
      resolve() {
        return true
      },
    })
  },
})

export * from './query.get'
