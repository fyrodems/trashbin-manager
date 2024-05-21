import { extendType, objectType } from 'nexus'

/**
 * Route definition
 */

export const AdminOfficialsQuery = objectType({
  name: 'AdminOfficialsQuery',
  definition() {},
})

export const AdminOfficialsQueryExtension = extendType({
  type: 'AdminQuery',
  definition(t) {
    t.field('officials', {
      type: 'AdminOfficialsQuery',
      resolve() {
        return true
      },
    })
  },
})

export * from './query.get'
