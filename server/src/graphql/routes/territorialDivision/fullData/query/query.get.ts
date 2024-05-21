import { extendType, inputObjectType, nullable } from 'nexus'
import { loggedIn } from '@/utils/routeAuth'

export const TerritorialFullDataGetQueryProps = inputObjectType({
  name: 'TerritorialFullDataGetQueryProps',
  definition(t) {
    t.nonNull.int('community_ID')
  },
})

// query do wyszukiwania danych terytorialnych na podstawie id gminy
export const TerritorialFullDataGetQuery = extendType({
  type: 'TerritorialFullDataQuery',
  definition(t) {
    t.nonNull.field('get', {
      type: 'TerritorialDivisionFullDataType',
      args: {
        props: nullable('TerritorialFullDataGetQueryProps'),
      },
      authorize: loggedIn(),
      async resolve(_parent, { props }, { prisma }) {
        if (!props) {
          throw new TypeError('Unauthorized')
        }

        const { community_ID } = props
        try {
          const community = await prisma.community.findUnique({
            where: { community_ID },
          })
          if (community) {
            const municipalityID = community?.community_municipalityID
            const voivodeshipID = community?.community_voivodeshipID
            const municipality = await prisma.municipality.findUnique({
              where: { municipality_ID: municipalityID },
            })
            const voivodeship = await prisma.voivodeship.findUnique({
              where: { voivodeship_ID: voivodeshipID },
            })

            const result = {
              voivodeship: voivodeship!,
              municipality: municipality!,
              community,
            }
            return result
          }

          throw new TypeError('Error while loading community data')
        } catch {
          throw new TypeError('Error while loading data')
        }
      },
    })
  },
})
