import { inputObjectType } from 'nexus'

export const UserGarbageGetQueryProps = inputObjectType({
  name: 'UserGarbageGetQueryProps',
  definition(t) {
    t.nonNull.string('garbage_startDate')
    t.nonNull.string('garbage_endDate')
  },
})
