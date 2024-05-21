import { extendType, inputObjectType, nonNull } from 'nexus'

export const CompanyOccupantsAddMutationProps = inputObjectType({
  name: 'CompanyOccupantsAddMutationProps',
  definition(t) {
    t.nonNull.int('company_ID')
    t.nonNull.int('occupant_ID')
  },
})

export const CompanyOccupantsAddMutation = extendType({
  type: 'CompanyOccupantsMutation',
  definition(t) {
    t.field('add', {
      type: 'MutationResponseType',
      args: {
        props: nonNull('CompanyOccupantsAddMutationProps'),
      },
      async resolve(_parent, { props }, { prisma }) {
        const { company_ID, occupant_ID } = props
        try {
          // sprawdzamy, czy jest juz takie polaczenie, a jak nie, to je dodajemy, w przeciwnym razie zmieniamy jego status na aktywne
          const connection = await prisma.housingAssociation_Occupant.findMany({
            where: {
              AND: [
                { housingAssociationOccupant_occupantID: occupant_ID },
                { housingAssociationOccupant_associationID: company_ID },
              ],
            },
          })

          if (connection.length === 0) {
            const lastConnectionID =
              await prisma.housingAssociation_Occupant.findMany({
                orderBy: {
                  housingAssociationOccupant_ID: 'desc',
                },
                take: 1,
              })

            await prisma.housingAssociation_Occupant.create({
              data: {
                housingAssociationOccupant_ID: lastConnectionID[0]
                  ?.housingAssociationOccupant_ID
                  ? lastConnectionID[0].housingAssociationOccupant_ID + 1
                  : 1,
                housingAssociationOccupant_associationID: company_ID,
                housingAssociationOccupant_occupantID: occupant_ID,
                housingAssociationOccupant_statusID: 22,
              },
            })
            return {
              status: {
                message: 'Success',
              },
            }
          }

          if (connection.length === 1) {
            await prisma.housingAssociation_Occupant.update({
              where: {
                housingAssociationOccupant_ID:
                  connection[0].housingAssociationOccupant_ID,
              },
              data: {
                housingAssociationOccupant_statusID: 22,
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
              description: 'Error while adding occupant',
            },
          }
        }
      },
    })
  },
})
