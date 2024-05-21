import { useState, useEffect } from 'react'
import { useQuery, useLazyQuery, type QueryLazyOptions } from '@apollo/client'
import { Divider, Card, Result, Spin } from 'antd'
import { InfoCircleTwoTone } from '@ant-design/icons'
import { CompanyDumpsterCardTitle } from '../../dumpsters/CompanyDumpsterCardTitle/CompanyDumpsterCardTitle'
import { CompanyDumpsterCardBins } from '../../dumpsters/CompanyDumpsterCardBins/CompanyDumpsterCardBins'
import { CompanyDumpsterContractsCollapse } from '../../dumpsters/CompanyDumpsterContractsCollapse/CompanyDumpsterContractsCollapse'
import { CompanyAddContractToDumpster } from '../../dumpsters/CompanyAddContractToDumpster/CompanyAddContractToDumpster'
import {
  type DumpsterInfoType,
  type OfficialBinGetQueryResult,
} from './interfaces'
import { graphql } from '@/gql'

const findDumpstersQuery = graphql(`
  query CompanyDumpstersGet {
    company {
      dumpsters {
        get {
          dumpster_ID
          dumpster_name
          dumpster_description
          dumpster_street
          dumpster_city
          dumpster_postCode
          dumpster_communityID
          dumpster_houseNumbers
          dumpster_hasError
          contracts {
            dumpsterContract_ID
            dumpsterContract_number
            dumpsterContract_dumpsterID
            dumpsterContract_dateFrom
            dumpsterContract_dateTo
            dumpsterContract_statusID
            dumpsterContract_communityID
            rates {
              rate_ID
              rate_value
              rate_dumpsterContractID
              rate_typeID
              rate_statusID
              rate_userContractID
            }
          }
          bins {
            dumpsterBin_ID
            dumpsterBin_dumpsterID
            dumpsterBin_isFull
            dumpsterBin_typeID
          }
        }
      }
    }
  }
`)

const findBinQuery = graphql(`
  query OfficialBinGet($props: OfficialBinGetQueryProps!) {
    official {
      bins {
        get(props: $props) {
          dumpsterBin_ID
          dumpsterBin_dumpsterID
          dumpsterBin_isFull
          dumpsterBin_typeID
        }
      }
    }
  }
`)

export const CompanyDumpstersView: React.FC = () => {
  const [search] = useLazyQuery<OfficialBinGetQueryResult>(findBinQuery)
  const { data, refetch, loading } = useQuery(findDumpstersQuery)

  const [dumpsters, setDumpsters] = useState<DumpsterInfoType[]>([])

  useEffect(() => {
    if (data?.company?.dumpsters?.get) {
      setDumpsters(data.company.dumpsters.get)
    }
  }, [data])

  // Co godzinę odświeżamy stan kubłów, aby sprawdzić, czy nie są pełne - do dokończenia !!!
  const handleBinSearch = ({ dumpsterBin_ID }: { dumpsterBin_ID: number }) => {
    if (dumpsterBin_ID) {
      const options: QueryLazyOptions<QueryProps> = {
        variables: {
          props: {
            dumpsterBin_ID,
          },
        },
      }
      void search(options)
    }
  }

  if (loading) {
    return (
      <div style={{ height: '60vh', display: 'grid', placeItems: 'center' }}>
        <Spin size="large" />
      </div>
    )
  }

  const dumpstersList = dumpsters.map((d) => (
    <Card
      key={d.dumpster_ID}
      style={{ margin: '20px auto' }}
      title={<CompanyDumpsterCardTitle dumpster={d} />}
      hoverable={true}
      extra={`ul.${d.dumpster_street}, ${d.dumpster_postCode} ${d.dumpster_city}`}
    >
      {d.bins && d.bins.length > 0 ? (
        <>
          <Divider>Zapełnienie kubłów</Divider>
          <CompanyDumpsterCardBins dumpster={d} />
        </>
      ) : (
        <Result
          icon={<InfoCircleTwoTone twoToneColor={'#99BA75'} />}
          title="Nie znaleziono kubłów w altanie"
        />
      )}
      {d.contracts && d.contracts.length > 0 ? (
        <>
          <Divider>Aktywne umowy</Divider>
          <CompanyDumpsterContractsCollapse
            contracts={d.contracts}
            refetch={refetch}
          />
        </>
      ) : (
        <Result
          icon={<InfoCircleTwoTone twoToneColor={'#99BA75'} />}
          title="Nie znaleziono kontraktów przypisanych do altany"
        />
      )}
      <CompanyAddContractToDumpster dumpster={d} refetch={refetch} />
    </Card>
  ))

  return (
    <>
      {dumpsters.length > 0 ? (
        dumpstersList
      ) : (
        <Result
          icon={<InfoCircleTwoTone twoToneColor={'#99BA75'} />}
          title="Nie znaleziono altan śmietnikowych"
        />
      )}
    </>
  )
}
