import { extendType, objectType } from 'nexus'

/**
 * Route definition
 */

export const SuperOfficialOfficialsMutation = objectType({
  name: 'SuperOfficialOfficialsMutation',
  definition() {},
})

export const SuperOfficialOfficialsMutationExtension = extendType({
  type: 'OfficialMutation',
  definition(t) {
    t.field('officials', {
      type: 'SuperOfficialOfficialsMutation',
      resolve() {
        return true
      },
    })
  },
})

/**
 * Exports
 */
export * from './mutation.addOfficial'
export * from './mutation.deleteOfficial'
export * from './mutation.editOfficial'
export * from './mutation.restoreOfficial'
