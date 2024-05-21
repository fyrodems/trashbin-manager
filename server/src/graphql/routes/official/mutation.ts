import { extendType, objectType } from 'nexus'

export const OfficialMutation = objectType({
  name: 'OfficialMutation',
  definition() {},
})

export const OfficialMutationExtension = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('official', {
      type: 'OfficialMutation',
      resolve() {
        return true
      },
    })
  },
})
