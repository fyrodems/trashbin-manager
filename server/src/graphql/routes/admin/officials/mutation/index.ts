import { extendType, objectType } from 'nexus'

/**
 * Route definition
 */

export const AdminOfficialsMutation = objectType({
  name: 'AdminOfficialsMutation',
  definition() {},
})

export const AdminOfficialsMutationExtension = extendType({
  type: 'AdminMutation',
  definition(t) {
    t.field('officials', {
      type: 'AdminOfficialsMutation',
      resolve() {
        return true
      },
    })
  },
})

export * from './mutation.delete'
export * from './mutation.add'
export * from './mutation.changeOfficialPassword'
