import { extendType, objectType } from 'nexus'

/**
 * Route definition
 */

export const CommonDumpstersQuery = objectType({
  name: 'CommonDumpstersQuery',
  definition() {},
})

export const CommonDumpstersQueryExtension = extendType({
  type: 'CommonQuery',
  definition(t) {
    t.field('dumpsters', {
      type: 'CommonDumpstersQuery',
      resolve() {
        return true
      },
    })
  },
})

/**
 * Exports
 */
export * from './query.get'
