import { useEffect, useState } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { Button, Modal, Result, Space } from 'antd'
import { Form } from 'react-final-form'
import Table, { type ColumnsType } from 'antd/es/table'
import classNames from 'classnames'
import {
  CheckOutlined,
  CloseOutlined,
  InfoCircleTwoTone,
} from '@ant-design/icons'
import {
  type OrderValues,
  type NewCardsVerificationValues,
  type OrderUpdateProps,
  type NewOrderType,
  type DataType,
} from './interfaces'
import styles from './AdminCardsOrders.module.scss'
import { Input } from '@/components/domains/common/Input'
import { graphql } from '@/gql'
import {
  generateDateLabel,
  statusLabel,
  reverseArray,
} from '@/utils/applicationUtils'

const adminCardsOrdersQuery = graphql(`
  query AdminCardsOrdersGet {
    admin {
      cardsOrders {
        get {
          cardsBulkOrder_ID
          cardsBulkOrder_statusID
          cardsBulkOrder_orderDate
          cardsBulkOrder_numOfCards
          user {
            users_name
          }
        }
      }
    }
  }
`)

const officialApplicationCardsVerify = graphql(`
  mutation AdminCardsOrdersVerifyAdd(
    $props: AdminCardsOrdersVerifyAddMutationProps!
  ) {
    admin {
      cardsOrders {
        verifyAdd(props: $props) {
          status {
            message
          }
        }
      }
    }
  }
`)

export const OrderUpdate: React.FC<OrderUpdateProps> = ({
  open,
  setOpen,
  verify,
  order,
}) => {
  const onSubmit = async (values: OrderValues) => {
    await verify({
      variables: {
        props: {
          isVerified: true,
          cardsBulkOrder_ID: order.cardsBulkOrder_ID,
          cardsNumbers: Object.values(values) as string[],
        },
      },
    })

    setOpen(false)
  }

  const numsInputs = order?.cardsBulkOrder_numOfCards ?? 0

  return (
    <Modal
      footer={
        <>
          <Button
            onClick={() => {
              setOpen(false)
            }}
          >
            Anuluj
          </Button>
          <Button form="adminOrderUpdate" htmlType="submit" type="primary">
            Zatwierdź wysyłkę pakietu
          </Button>
        </>
      }
      open={open}
      onCancel={() => {
        setOpen(false)
      }}
    >
      <Form onSubmit={onSubmit}>
        {({ handleSubmit }) => (
          <form id="adminOrderUpdate" onSubmit={handleSubmit}>
            {Array.from({ length: numsInputs }).map((i, idx) => {
              return (
                <Input
                  key={idx} //! Nie może być index
                  name={`cardsApplications_number${idx}`}
                  placeholder="Numer karty dostępu"
                  type="text"
                />
              )
            })}
          </form>
        )}
      </Form>
    </Modal>
  )
}

export const AdminCardsOrders: React.FC = () => {
  const { data } = useQuery(adminCardsOrdersQuery)
  const [verify] = useMutation(officialApplicationCardsVerify)
  const [actualOrder, setActualOrder] = useState<NewOrderType | undefined>(
    undefined
  )
  const [ordersList, setOrdersList] = useState<NewOrderType[]>([])
  const [positiveVerificationModalOpen, setPositiveVerificationModalOpen] =
    useState(false)

  useEffect(() => {
    const response = data?.admin?.cardsOrders?.get
    if (response) {
      setOrdersList(response)
    }
  }, [data])

  const handleVerify = async ({
    isVerified,
    cardsBulkOrder_ID,
    cardsNumbers,
  }: NewCardsVerificationValues) => {
    await verify({
      variables: {
        props: {
          isVerified,
          cardsBulkOrder_ID,
          cardsNumbers,
        },
      },
    })
  }

  const tableData = reverseArray(ordersList).map((order: NewOrderType) => ({
    key: order.cardsBulkOrder_ID,
    status: order.cardsBulkOrder_statusID,
    orderDate: order.cardsBulkOrder_orderDate,
    numOfCards: order.cardsBulkOrder_numOfCards,
    user: order.user.users_name,
    order,
  }))

  const columns: ColumnsType<DataType> = [
    {
      title: 'Wnioskujący',
      dataIndex: 'user',
    },
    {
      title: 'Liczba zamówionych kart',
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
    {
      title: 'Dostępne akcje',
      key: 'users_action',
      render: (_, record) => (
        <Space size="middle" direction="horizontal">
          <Button
            onClick={() => {
              setPositiveVerificationModalOpen(true)
              setActualOrder(record.order)
            }}
            className={styles.iconButton}
          >
            <CheckOutlined />
          </Button>
          <Button
            onClick={async () =>
              handleVerify({
                isVerified: false,
                cardsBulkOrder_ID: record.order.cardsBulkOrder_ID,
                cardsNumbers: [
                  record.order.cardsBulkOrder_numOfCards.toString(),
                ],
              })
            }
            className={styles.iconButton}
          >
            <CloseOutlined />
          </Button>
        </Space>
      ),
    },
  ]

  return (
    <>
      <div className={styles.tableWrapper}>
        {ordersList && ordersList.length > 0 ? (
          <>
            <Table
              pagination={{ pageSize: 10, position: ['bottomCenter'] }}
              columns={columns}
              dataSource={tableData}
            />
          </>
        ) : (
          <Result
            icon={<InfoCircleTwoTone twoToneColor={'#99BA75'} />}
            title="Brak oczekujących zamówień"
          />
        )}
      </div>
      <div>
        {actualOrder ? (
          <OrderUpdate
            open={positiveVerificationModalOpen}
            setOpen={setPositiveVerificationModalOpen}
            verify={verify}
            order={actualOrder}
          />
        ) : null}
      </div>
    </>
  )
}
