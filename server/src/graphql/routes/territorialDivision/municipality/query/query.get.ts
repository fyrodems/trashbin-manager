import { extendType, inputObjectType, nullable } from 'nexus'

export const TerritorialMunicipalitiesGetQueryProps = inputObjectType({
  name: 'TerritorialMunicipalitiesGetQueryProps',
  definition(t) {
    t.nonNull.int('voivodeship_ID')
  },
})

export const TerritorialMunicipalitiesGetQuery = extendType({
  type: 'TerritorialMunicipalitiesQuery',
  definition(t) {
    t.list.nonNull.field('get', {
      type: 'MunicipalityInfoType',
      args: {
        props: nullable('TerritorialMunicipalitiesGetQueryProps'),
      },
      async resolve(_parent, { props }, { prisma }) {
        const municipalities = await prisma.municipality.findMany({
          where: { municipality_voivodeshipID: props?.voivodeship_ID },
        })

        return municipalities
      },
    })
  },
})
