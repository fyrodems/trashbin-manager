import { useQuery } from '@apollo/client'
import { useEffect, useState } from 'react'
import { Button, Divider } from 'antd'
import { CompanyReportColumnChart } from '../../statistics/CompanyReportColumnChart/CompanyReportColumnChart'
import { CompanyGarbageSearchForm } from '../../statistics/CompanyGarbageSearchForm/CompanyGarbageSearchForm'
import { CompanyReportSmall } from '../../statistics/CompanyReportSmall/CompanyReportSmall'
import { CompanyReportErrors } from '../../statistics/CompanyReportErrors/CompanyReportErrors'
import { graphql } from '@/gql'
import { getPreviousMonthGarbage } from '@/utils/months'
import { useAuth } from '@/auth/authProvider'

const companyGarbageQuery = graphql(`
  query CompanyGarbageGet($props: CompanyGarbageGetQueryProps!) {
    company {
      garbage {
        get(props: $props) {
          dumpsterID
          garbage {
            paper
            glass
            bio
            plastic
            mixed
          }
        }
      }
    }
  }
`)

export const CompanyView: React.FC = () => {
  const { user } = useAuth()
  const [allGarbage, setAllGarbage] = useState()
  const [periodGarbage, setPeriodGarbage] = useState(null)

  const { data } = useQuery(companyGarbageQuery, {
    variables: {
      props: {
        company_ID: user?.basicInfo?.users_ID ?? 0,
        garbage_dateFrom: '1000-01-01',
        garbage_dateTo: getPreviousMonthGarbage().today,
      },
    },
  })

  useEffect(() => {
    const response = data?.company?.garbage?.get
    setAllGarbage(response)
  }, [data])

  return (
    <main>
      <Divider>Statystki</Divider>
      {allGarbage && (
        <>
          <CompanyReportColumnChart allGarbage={periodGarbage ?? allGarbage} />

          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '10px',
              margin: '30px',
            }}
          >
            <Button
              style={{ borderRadius: '5px' }}
              onClick={() => {
                setPeriodGarbage(null)
              }}
            >
              Pokaż wszystkie
            </Button>
            <CompanyGarbageSearchForm setPeriodGarbage={setPeriodGarbage} />
          </div>

          <CompanyReportSmall allGarbage={allGarbage} />
          <CompanyReportErrors />
        </>
      )}
    </main>
  )
}
