import { extendType, objectType } from 'nexus'

/**
 * Route definition
 */

export const CompanyInfoMutation = objectType({
  name: 'CompanyInfoMutation',
  definition() {},
})

export const CompanyInfoMutationExtension = extendType({
  type: 'CompanyMutation',
  definition(t) {
    t.field('info', {
      type: 'CompanyInfoMutation',
      resolve() {
        return true
      },
    })
  },
})

/**
 * Exports
 */
export * from './mutation.profile'
export * from './mutation.PINnumber'
