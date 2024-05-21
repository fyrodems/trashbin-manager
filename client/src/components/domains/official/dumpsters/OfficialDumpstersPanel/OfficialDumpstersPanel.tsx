import { useQuery } from '@apollo/client'
import { useState, useEffect } from 'react'
import { Card, Divider, Result, Spin } from 'antd'
import { InfoCircleTwoTone } from '@ant-design/icons'
import { type DumpsterInfoType } from '../interfaces'
import { OfficialDumpsterCardTitle } from '../OfficialDumpsterCardTitle/OfficialDumpsterCardTitle'
import { OfficialDumpsterCardBins } from '../OfficialDumpsterCardBins/OfficialDumpsterCardBins'
import { OfficialAddContractToDumpster } from '../contracts/OfficialAddContractToDumpster/OfficialAddContractToDumpster'
import { OfficialDumpsterContractsCollapse } from '../OfficialDumpsterContractsCollapse/OfficialDumpsterContractsCollapse'
import { graphql } from '@/gql'

const findDumpstersQuery = graphql(`
  query OfficialDumpstersGet {
    official {
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
          bins {
            dumpsterBin_typeID
            dumpsterBin_isFull
          }
          contracts {
            dumpsterContract_dateTo
            dumpsterContract_ID
            dumpsterContract_number
            dumpsterContract_dateFrom
            dumpsterContract_statusID
            dumpsterContract_dumpsterID
            rates {
              rate_ID
              rate_typeID
              rate_value
              rate_statusID
            }
          }
        }
      }
    }
  }
`)

export const OfficialDumpstersPanel: React.FC = () => {
  const { data, refetch, loading } = useQuery(findDumpstersQuery)
  const [dumpsters, setDumpsters] = useState<DumpsterInfoType[]>([])

  useEffect(() => {
    if (data?.official?.dumpsters?.get) {
      setDumpsters(data?.official?.dumpsters?.get as DumpsterInfoType[])
    }
  }, [data])

  if (loading) {
    return (
      <div style={{ height: '60vh', display: 'grid', placeItems: 'center' }}>
        <Spin size="large" />
      </div>
    )
  }

  const dumpstersList = dumpsters.map((dumpster) => (
    <Card
      key={dumpster.dumpster_ID}
      style={{ margin: '20px auto' }}
      title={<OfficialDumpsterCardTitle dumpster={dumpster} />}
      hoverable={true}
      extra={`${dumpster.dumpster_street}, ${dumpster.dumpster_postCode} ${dumpster.dumpster_city}`}
    >
      {dumpster.bins && dumpster.bins.length > 0 ? (
        <>
          <Divider>Zapełnienie kubłów</Divider>
          <OfficialDumpsterCardBins dumpster={dumpster} />
        </>
      ) : (
        <Result
          icon={<InfoCircleTwoTone twoToneColor={'#99BA75'} />}
          title="Nie znaleziono kubłów w altanie"
        />
      )}

      {dumpster.contracts && dumpster.contracts.length > 0 ? (
        <>
          <Divider>Aktywne umowy</Divider>
          <OfficialDumpsterContractsCollapse
            contracts={dumpster.contracts}
            refetch={refetch}
          />
        </>
      ) : (
        <Result
          icon={<InfoCircleTwoTone twoToneColor={'#99BA75'} />}
          title="Nie znaleziono kontraktów przypisanych do altany"
        />
      )}
      <OfficialAddContractToDumpster dumpster={dumpster} refetch={refetch} />
    </Card>
  ))

  return (
    <>
      {dumpsters.length > 0 ? (
        dumpstersList
      ) : (
        <Result
          icon={<InfoCircleTwoTone twoToneColor={'#99BA75'} />}
          title="Nie znaleziono Twoich adresów. Skontaktuj sie z pomocą techniczą"
        />
      )}
    </>
  )
}
