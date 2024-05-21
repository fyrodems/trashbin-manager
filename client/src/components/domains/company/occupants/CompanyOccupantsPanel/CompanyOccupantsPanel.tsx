import { App, Button, Divider, Space, Spin } from 'antd'
import { useMutation } from '@apollo/client'
import { useState } from 'react'
import Table, { type ColumnsType } from 'antd/es/table'
import { CompanySearchOccupant } from '../CompanySearchOccupant/CompanySearchOccupant'
import {
  type CompanyOccupantsPanelProps,
  type DataType,
  type OfficialUserOccupantSearchType,
} from './interfaces'
import styles from './CompanyOccupantsPanel.module.scss'
import { graphql } from '@/gql'

const officialOccupantsDeleteMutation = graphql(`
  mutation CompanyOccupantsDelete(
    $props: CompanyOccupantsDeleteMutationProps!
  ) {
    company {
      occupants {
        delete(props: $props) {
          status {
            message
          }
        }
      }
    }
  }
`)

export const CompanyOccupantsPanel: React.FC<CompanyOccupantsPanelProps> = ({
  occupants,
  refetch,
}) => {
  const [deleteOccupant] = useMutation(officialOccupantsDeleteMutation)
  const [occupantsToAdd, setOccupantsToAdd] = useState<
    OfficialUserOccupantSearchType[]
  >([])
  const [occupantDeleteLoading, setOccupantDeleteLoading] =
    useState<boolean>(false)
  const { message } = App.useApp()

  const deleteOccup = async (connection_ID?: number) => {
    try {
      if (connection_ID) {
        setOccupantDeleteLoading(true)

        const { data: mutationData } = await deleteOccupant({
          variables: {
            props: {
              connection_ID,
            },
          },
        })

        const status = mutationData?.company?.occupants?.delete?.status.message
        await (status === 'Success'
          ? message.success('Usunięto lokatora')
          : message.error('Wystąpił błąd'))
      }

      await refetch()
    } catch (error) {
      console.error('Error:', error)
      message.error('Wystąpił błąd')
    } finally {
      setOccupantDeleteLoading(false)
    }
  }

  const tableData = occupants.map((occupant) => ({
    key: occupant.users_ID,
    users_name: occupant.users_name,
    users_identificationNumber: occupant.users_identificationNumber,
    users_login: occupant.users_login,
    users_phoneNumber: occupant.users_phoneNumber,
    users_ID: occupant.users_ID,
    users_statusID: occupant.users_statusID,
    connection_ID: occupant.connection_ID,
  }))

  const columns: ColumnsType<DataType> = [
    {
      title: 'Imię i nazwisko',
      dataIndex: 'users_name',
      sorter: (a, b) => a.users_name.localeCompare(b.users_name),
      sortDirections: ['descend', 'ascend', 'descend'],
    },
    {
      title: 'E-mail',
      dataIndex: 'users_login',
    },
    {
      title: 'Numer telefonu',
      dataIndex: 'users_phoneNumber',
      render: (text: string) => <>{text || 'Brak danych'}</>,
    },
    {
      title: '',
      key: 'users_action',
      render: (_, record) => (
        <Space size="middle" direction="vertical">
          <Button onClick={async () => deleteOccup(record.connection_ID)}>
            Usuń lokatora
          </Button>
        </Space>
      ),
    },
  ]

  return (
    <div>
      <Spin
        size="large"
        spinning={occupantDeleteLoading}
        className={
          occupantDeleteLoading ? styles.spinWithOpacity : styles.spinHidden
        }
      />
      <Divider>Osoby w Twojej spółdzielni</Divider>

      {occupants && occupants.length > 0 ? (
        <Table
          pagination={{ pageSize: 10, position: ['bottomCenter'] }}
          columns={columns}
          dataSource={tableData}
          setOccupantsToAdd={setOccupantsToAdd}
        />
      ) : null}

      <Divider>Wyszukaj nowego lokatora</Divider>

      <CompanySearchOccupant
        occupants={occupants}
        occupantsToAdd={occupantsToAdd}
        setOccupantsToAdd={setOccupantsToAdd}
        refetch={refetch}
      />
    </div>
  )
}
