import { extendType, inputObjectType, nonNull } from 'nexus'

export const OfficialBinGetQueryProps = inputObjectType({
  name: 'OfficialBinGetQueryProps',
  definition(t) {
    t.nonNull.int('dumpsterBin_ID')
  },
})

export const OfficialBinsGetQueryResult = extendType({
  type: 'OfficialBinsQuery',
  definition(t) {
    t.nullable.field('get', {
      type: 'DumpsterBinType',
      args: {
        props: nonNull('OfficialBinGetQueryProps'),
      },
      async resolve(_parent, { props }, { user, prisma }) {
        const { dumpsterBin_ID } = props
        if (!user) {
          throw new TypeError('Unauthorized')
        }

        if (user.users_typeID === 5 || user.users_typeID === 6) {
          const bin = await prisma.dumpster_Bin.findUnique({
            where: {
              dumpsterBin_ID,
            },
          })

          return bin
        }

        throw new TypeError('Unauthorized')
      },
    })
  },
})
