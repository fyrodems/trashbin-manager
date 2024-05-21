import { extendType, objectType } from 'nexus'

/**
 * Route definition
 */

export const TerritorialVoivodeshipsQuery = objectType({
  name: 'TerritorialVoivodeshipsQuery',
  definition() {},
})

export const TerritorialVoivodeshipsQueryExtension = extendType({
  type: 'TerritorialDivisionQuery',
  definition(t) {
    t.field('voivodeships', {
      type: 'TerritorialVoivodeshipsQuery',
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
