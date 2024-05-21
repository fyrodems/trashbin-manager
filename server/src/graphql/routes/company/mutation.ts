import { extendType, objectType } from 'nexus'

export const CompanyMutation = objectType({
  name: 'CompanyMutation',
  definition() {},
})

export const CompanyMutationExtension = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('company', {
      type: 'CompanyMutation',
      resolve() {
        return true
      },
    })
  },
})
