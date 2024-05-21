import { extendType, objectType } from 'nexus'

export const TerritorialDivisionQuery = objectType({
  name: 'TerritorialDivisionQuery',
  definition() {},
})

export const TerritorialDivisionQueryExtension = extendType({
  type: 'Query',
  definition(t) {
    t.field('territorialDivision', {
      type: 'TerritorialDivisionQuery',
      resolve() {
        return true
      },
    })
  },
})
