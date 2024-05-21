import { useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { type UserStateSetterProps } from '../userMainViewInterfaces'
import { graphql } from '@/gql'

const findGarbageQuery = graphql(`
  query UserGarbages($props: UserGarbageGetQueryProps!) {
    user {
      garbage {
        get {
          result(props: $props) {
            pieChart {
              total
              garbageTypes {
                color
                mass
                type
                typeID
              }
            }
            lineChart {
              garbage_sum
              garbage_typeID
              month
              monthIndex
              waste_name
              garbage_fullDate
            }
          }
        }
      }
    }
  }
`)

export const UserStateSetterForLast30DaysGarbages: React.FC<
  UserStateSetterProps
> = ({ setLast30DaysGarbages }) => {
  const dateNow = new Date()
  const endDate = new Date(dateNow).toISOString().split('T')[0]
  const previousMonth = new Date(dateNow.setMonth(dateNow.getMonth() - 1))
    .toISOString()
    .split('T')[0]

  const { data } = useQuery(findGarbageQuery, {
    variables: {
      props: {
        garbage_endDate: endDate,
        garbage_startDate: previousMonth,
      },
    },
  })

  useEffect(() => {
    const allGarbages = data?.user?.garbage?.get?.result
    if (!allGarbages) return

    setLast30DaysGarbages(allGarbages)
  }, [data])

  return null
}
