import { objectType } from 'nexus'

export const VerificationInfoType = objectType({
  name: 'VerificationInfoType',
  definition(t) {
    t.nonNull.string('date')
    t.nonNull.string('by')
  },
})
