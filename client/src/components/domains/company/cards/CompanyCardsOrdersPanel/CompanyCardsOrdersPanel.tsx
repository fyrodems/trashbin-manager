import { useQuery } from '@apollo/client'
import { useEffect, useState } from 'react'
import Table, { type ColumnsType } from 'antd/es/table'
import { Divider, Result } from 'antd'
import classNames from 'classnames'
import { InfoCircleTwoTone } from '@ant-design/icons'
import { CompanyCardsOrdersAdd } from '../CompanyCardsOrdersAdd/CompanyCardsOrdersAdd'
import { type CompanyCardsType, type DataType } from '../interfaces'
import styles from './CompanyCardsOrdersPanel.module.scss'
import { graphql } from '@/gql'
import {
  generateDateLabel,
  statusLabel,
  reverseArray,
} from '@/utils/applicationUtils'

const companyCardsQuery = graphql(`
  query CompanyCardsGet {
    company {
      cards {
        get {
          cardsBulkOrder_ID
          cardsBulkOrder_userID
          cardsBulkOrder_numOfCards
          cardsBulkOrder_statusID
          cardsBulkOrder_orderDate
        }
      }
    }
  }
`)

export const CompanyCardsOrdersPanel: React.FC = () => {
  const { data } = useQuery(companyCardsQuery)
  const [companyCards, setCompanyCards] = useState<CompanyCardsType[]>([])

  useEffect(() => {
    if (data) {
      setCompanyCards(data?.company?.cards?.get || [])
    }
  }, [data])

  const tableData = reverseArray(companyCards).map((card) => ({
    key: card.cardsBulkOrder_ID,
    status: card.cardsBulkOrder_statusID,
    orderDate: card.cardsBulkOrder_orderDate,
    numOfCards: card.cardsBulkOrder_numOfCards,
  }))

  const columns: ColumnsType<DataType> = [
    {
      title: 'Numer',
      dataIndex: 'key',
    },
    {
      title: 'Liczba kart',
      dataIndex: 'numOfCards',
    },
    {
      title: 'Data złożenia',
      dataIndex: 'orderDate',

      render: (text: string) => <>{generateDateLabel(text)}</>,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (text: string) => (
        <span className={classNames(styles[`statusLabel-${text}`])}>
          {statusLabel[text] ?? 'Historyczny'}
        </span>
      ),
    },
  ]

  return (
    <>
      <div className={styles.addNewCardsButtonWrapper}>
        <CompanyCardsOrdersAdd />
      </div>
      <div className={styles.tableWrapper}>
        {companyCards && companyCards.length > 0 ? (
          <>
            <Divider>Zamówienia</Divider>
            <Table
              pagination={{ pageSize: 10, position: ['bottomCenter'] }}
              columns={columns}
              dataSource={tableData}
            />
          </>
        ) : (
          <Result
            icon={<InfoCircleTwoTone twoToneColor={'#99BA75'} />}
            title="Brak historii zamówień"
          />
        )}
      </div>
    </>
  )
}
