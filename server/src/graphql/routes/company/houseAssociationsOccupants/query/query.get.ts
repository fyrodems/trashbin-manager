import { extendType, inputObjectType, nullable } from 'nexus'

export const CompanyOccupantsGetQueryProps = inputObjectType({
  name: 'CompanyOccupantsGetQueryProps',
  definition(t) {
    t.nonNull.int('company_ID')
  },
})

export const CompanyOccupantsGetQueryResult = extendType({
  type: 'CompanyOccupantsQuery',
  definition(t) {
    t.list.nonNull.field('get', {
      type: 'CompanyUserType',
      args: {
        props: nullable('CompanyOccupantsGetQueryProps'),
      },
      async resolve(_parent, { props }, { user, prisma }) {
        if (!user || user.users_typeID !== 10) {
          throw new TypeError('Unauthorized')
        }

        const usersAssociationData =
          await prisma.housingAssociation_Occupant.findMany({
            where: {
              AND: [
                { housingAssociationOccupant_associationID: props?.company_ID },
                { housingAssociationOccupant_statusID: 22 },
              ],
            },
          })
        const usersIDs = usersAssociationData.map(
          (u) => u.housingAssociationOccupant_occupantID
        )

        const users = await prisma.users.findMany({
          where: { users_ID: { in: usersIDs } },
        })

        const addresses = await prisma.users_Address.findMany({
          where: {
            AND: [
              {
                usersAddress_userID: {
                  in: usersIDs,
                },
              },
              { usersAddress_statusID: 24 },
            ],
          },
        })

        const connections = await prisma.housingAssociation_Occupant.findMany({
          where: {
            housingAssociationOccupant_occupantID: { in: usersIDs },
          },
        })

        const result = users.map((u) => {
          return {
            ...u,
            connection_ID: connections.find(
              (c) => c.housingAssociationOccupant_occupantID === u.users_ID
            )?.housingAssociationOccupant_ID,
            addresses: addresses
              .map((a) => {
                if (a.usersAddress_userID === u.users_ID) {
                  return a
                }

                return undefined
              })
              .filter((a) => a !== undefined),
          }
        })

        return result as Array<{
          users_ID: number
          users_login: string
          users_name: string
          users_identificationNumber: string
          users_phoneNumber?: string
          users_statusID: number
          connection_ID: number
          addresses: Array<{
            usersAddress_ID: number
            usersAddress_userID: number
            usersAddress_street: string
            usersAddress_houseNumber: string
            usersAddress_apartamentNumber?: string
            usersAddress_postCode: string
            usersAddress_city: string
            usersAddress_typeID: number
            usersAddress_communityID: number
            usersAddress_statusID: number
          }>
        }>
      },
    })
  },
})
