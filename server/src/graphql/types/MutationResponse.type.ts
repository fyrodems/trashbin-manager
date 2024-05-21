import { objectType } from 'nexus'
import { MutationResponseStatusType } from './MutationResponseStatus.type'

export const MutationResponseType = objectType({
  name: 'MutationResponseType',
  definition(t) {
    t.nonNull.field('status', {
      type: MutationResponseStatusType,
    })
    t.nullable.string('description')
  },
})
