import { extendType } from 'nexus'
import { loggedIn } from '@/utils/routeAuth'

export const TerritorialVoivodeshipsGetQuery = extendType({
  type: 'TerritorialVoivodeshipsQuery',
  definition(t) {
    t.list.nonNull.field('get', {
      type: 'VoivodeshipInfoType',
      authorize: loggedIn(),
      async resolve(_parent, _args, { prisma }) {
        const voivodeships = await prisma.voivodeship.findMany()

        return voivodeships
      },
    })
  },
})
