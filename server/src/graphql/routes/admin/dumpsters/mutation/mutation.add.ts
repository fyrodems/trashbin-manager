/* eslint-disable no-await-in-loop */
import { extendType, inputObjectType, nonNull } from 'nexus'
import { loggedIn } from '@/utils/routeAuth'

export const AdminDumpstersAddMutationProps = inputObjectType({
  name: 'AdminDumpstersAddMutationProps',
  definition(t) {
    t.nonNull.string('dumpster_name')
    t.nullable.string('dumpster_description')
    t.nonNull.string('dumpster_street')
    t.nonNull.string('dumpster_city')
    t.nonNull.string('dumpster_postCode')
    t.nonNull.int('dumpster_communityID')
    t.nonNull.string('dumpster_houseNumbers')
    t.nonNull.int('paper_binsNumber')
    t.nonNull.int('bio_binsNumber')
    t.nonNull.int('plastic_binsNumber')
    t.nonNull.int('glass_binsNumber')
    t.nonNull.int('mixed_binsNumber')
  },
})

export const AdminDumpstersAddMutation = extendType({
  type: 'AdminDumpstersMutation',
  definition(t) {
    t.field('add', {
      type: 'MutationResponseType',
      args: {
        props: nonNull('AdminDumpstersAddMutationProps'),
      },
      authorize: loggedIn(),
      async resolve(_parent, { props }, { prisma }) {
        const {
          dumpster_name,
          dumpster_description,
          dumpster_street,
          dumpster_city,
          dumpster_postCode,
          dumpster_communityID,
          dumpster_houseNumbers,
          paper_binsNumber,
          bio_binsNumber,
          plastic_binsNumber,
          glass_binsNumber,
          mixed_binsNumber,
        } = props
        try {
          const lastDumpsterID = await prisma.dumpster.findMany({
            orderBy: {
              dumpster_ID: 'desc',
            },
            take: 1,
          })

          const newDumpster = await prisma.dumpster.create({
            data: {
              dumpster_ID: lastDumpsterID[0]?.dumpster_ID
                ? lastDumpsterID[0].dumpster_ID + 1
                : 1,
              dumpster_name,
              dumpster_description,
              dumpster_street,
              dumpster_city,
              dumpster_postCode,
              dumpster_communityID,
              dumpster_houseNumbers,
              dumpster_hasError: false,
              dumpster_statusID: 27,
            },
          })

          // po stworzeniu smietnika zapełniamy go konkretnymi wybranymi rodzajami kublow po kolei
          for (let i = 0; i < paper_binsNumber; i++) {
            const lastBinID = await prisma.dumpster_Bin.findMany({
              orderBy: {
                dumpsterBin_ID: 'desc',
              },
              take: 1,
            })
            await prisma.dumpster_Bin.create({
              data: {
                dumpsterBin_ID: lastBinID[0]?.dumpsterBin_ID
                  ? lastBinID[0].dumpsterBin_ID + 1
                  : 1,
                dumpsterBin_dumpsterID: newDumpster.dumpster_ID,
                dumpsterBin_isFull: false,
                dumpsterBin_typeID: 11,
              },
            })
          }

          for (let i = 0; i < bio_binsNumber; i++) {
            const lastBinID = await prisma.dumpster_Bin.findMany({
              orderBy: {
                dumpsterBin_ID: 'desc',
              },
              take: 1,
            })
            await prisma.dumpster_Bin.create({
              data: {
                dumpsterBin_ID: lastBinID[0]?.dumpsterBin_ID
                  ? lastBinID[0].dumpsterBin_ID + 1
                  : 1,
                dumpsterBin_dumpsterID: newDumpster.dumpster_ID,
                dumpsterBin_isFull: false,
                dumpsterBin_typeID: 12,
              },
            })
          }

          for (let i = 0; i < plastic_binsNumber; i++) {
            const lastBinID = await prisma.dumpster_Bin.findMany({
              orderBy: {
                dumpsterBin_ID: 'desc',
              },
              take: 1,
            })
            await prisma.dumpster_Bin.create({
              data: {
                dumpsterBin_ID: lastBinID[0]?.dumpsterBin_ID
                  ? lastBinID[0].dumpsterBin_ID + 1
                  : 1,
                dumpsterBin_dumpsterID: newDumpster.dumpster_ID,
                dumpsterBin_isFull: false,
                dumpsterBin_typeID: 13,
              },
            })
          }

          for (let i = 0; i < glass_binsNumber; i++) {
            const lastBinID = await prisma.dumpster_Bin.findMany({
              orderBy: {
                dumpsterBin_ID: 'desc',
              },
              take: 1,
            })
            await prisma.dumpster_Bin.create({
              data: {
                dumpsterBin_ID: lastBinID[0]?.dumpsterBin_ID
                  ? lastBinID[0].dumpsterBin_ID + 1
                  : 1,
                dumpsterBin_dumpsterID: newDumpster.dumpster_ID,
                dumpsterBin_isFull: false,
                dumpsterBin_typeID: 14,
              },
            })
          }

          for (let i = 0; i < mixed_binsNumber; i++) {
            const lastBinID = await prisma.dumpster_Bin.findMany({
              orderBy: {
                dumpsterBin_ID: 'desc',
              },
              take: 1,
            })
            await prisma.dumpster_Bin.create({
              data: {
                dumpsterBin_ID: lastBinID[0]?.dumpsterBin_ID
                  ? lastBinID[0].dumpsterBin_ID + 1
                  : 1,
                dumpsterBin_dumpsterID: newDumpster.dumpster_ID,
                dumpsterBin_isFull: false,
                dumpsterBin_typeID: 15,
              },
            })
          }

          return {
            status: {
              message: 'Success',
            },
          }
        } catch {
          return {
            status: {
              message: 'Error',
            },
          }
        }
      },
    })
  },
})
