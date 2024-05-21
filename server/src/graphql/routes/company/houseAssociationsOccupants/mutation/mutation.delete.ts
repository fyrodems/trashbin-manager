import { extendType, inputObjectType, nonNull } from 'nexus'

export const CompanyOccupantsDeleteMutationProps = inputObjectType({
  name: 'CompanyOccupantsDeleteMutationProps',
  definition(t) {
    t.nonNull.int('connection_ID')
  },
})

export const CompanyOccupantsDeleteMutation = extendType({
  type: 'CompanyOccupantsMutation',
  definition(t) {
    t.field('delete', {
      type: 'MutationResponseType',
      args: {
        props: nonNull('CompanyOccupantsDeleteMutationProps'),
      },
      async resolve(_parent, { props }, { prisma }) {
        const { connection_ID } = props
        try {
          await prisma.housingAssociation_Occupant.update({
            where: {
              housingAssociationOccupant_ID: connection_ID,
            },
            data: {
              housingAssociationOccupant_statusID: 23,
            },
          })
          return {
            status: {
              message: 'Success',
            },
          }
        } catch {
          return {
            status: {
              message: 'Error',
              description: 'Error while deleting occupant',
            },
          }
        }
      },
    })
  },
})
