import { extendType, objectType } from 'nexus'

/**
 * Route definition
 */

export const OfficialBinsQuery = objectType({
  name: 'OfficialBinsQuery',
  definition() {},
})

export const OfficialBinsQueryExtension = extendType({
  type: 'OfficialQuery',
  definition(t) {
    t.field('bins', {
      type: 'OfficialBinsQuery',
      resolve() {
        return true
      },
    })
  },
})

export * from './query.get'
