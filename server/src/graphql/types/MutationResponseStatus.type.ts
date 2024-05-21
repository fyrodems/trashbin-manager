import { enumType, objectType } from 'nexus'

export const StatusEnum = enumType({
  name: 'StatusEnum',
  members: ['Error', 'Success', 'Blocked', 'WaitingForApproval'],
})

export const MutationResponseStatusType = objectType({
  name: 'MutationResponseStatusType',
  definition(t) {
    t.nonNull.field('message', {
      type: StatusEnum,
    })
    t.nullable.string('description')
  },
})
