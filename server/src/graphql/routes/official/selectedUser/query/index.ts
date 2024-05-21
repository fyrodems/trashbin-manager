import { extendType, objectType } from 'nexus'

/**
 * Route definition
 */

export const OfficialSelectedUserDataQuery = objectType({
  name: 'OfficialSelectedUserDataQuery',
  definition() {},
})

export const OfficialSelectedUserDataQueryExtension = extendType({
  type: 'OfficialQuery',
  definition(t) {
    t.field('user', {
      type: 'OfficialSelectedUserDataQuery',
      resolve() {
        return true
      },
    })
  },
})

export * from './query.get'
