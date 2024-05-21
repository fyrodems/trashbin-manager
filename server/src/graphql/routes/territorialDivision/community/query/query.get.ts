import { extendType, inputObjectType, nullable } from 'nexus'

export const TerritorialCommunitiesGetQueryProps = inputObjectType({
  name: 'TerritorialCommunitiesGetQueryProps',
  definition(t) {
    t.nonNull.int('municipality_ID')
  },
})

export const TerritorialCommunitiesGetQuery = extendType({
  type: 'TerritorialCommunitiesQuery',
  definition(t) {
    t.list.nonNull.field('get', {
      type: 'CommunityInfoType',
      args: {
        props: nullable('TerritorialCommunitiesGetQueryProps'),
      },
      async resolve(_parent, { props }, { prisma }) {
        const communities = await prisma.community.findMany({
          where: { community_municipalityID: props?.municipality_ID },
        })
        return communities
      },
    })
  },
})
