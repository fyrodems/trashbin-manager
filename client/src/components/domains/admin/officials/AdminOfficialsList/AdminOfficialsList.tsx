import { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import { SearchOutlined } from '@ant-design/icons'
import { Form } from 'react-final-form'
import Table, { type ColumnsType } from 'antd/es/table'
import { Space, Result } from 'antd'
import { AdminOfficialDeleteForm } from '../AdminOfficialDeleteForm/AdminOfficialDeleteForm'
import { AdminOfficialCreateForm } from '../AdminOfficialCreateForm/AdminOfficialCreateForm'
import { AdminOfficialChangePasswordModal } from '../AdminOfficialChangePasswordModal/AdminOfficialChangePasswordModal'
import {
  type AdminOfficialInfoType,
  type AdminOfficialsListDataType,
} from './interfaces'
import styles from './AdminOfficials.module.scss'
import { graphql } from '@/gql'
import { Input } from '@/components/domains/common/Input'

const adminOfficialsQuery = graphql(`
  query AdminOfficialsGet {
    admin {
      officials {
        get {
          users_ID
          users_identificationNumber
          users_phoneNumber
          users_typeID
          users_statusID
          users_name
          users_login
          addresses {
            usersAddress_street
            usersAddress_houseNumber
            usersAddress_city
          }
        }
      }
    }
  }
`)

export const AdminOfficialsList: React.FC = () => {
  const { data } = useQuery(adminOfficialsQuery)
  const [officials, setOfficials] = useState<AdminOfficialInfoType[]>([])
  const [allOfficials, setAllOfficials] = useState<AdminOfficialInfoType[]>([])

  useEffect(() => {
    const response = data?.admin?.officials?.get
    if (response) {
      setOfficials(response)
      setAllOfficials(response)
    }
  }, [data])

  const tableData = []

  for (const official of officials) {
    if (official) {
      tableData.push({
        key: official.users_ID,
        users_name: official.users_name,
        users_identificationNumber: official.users_identificationNumber,
        users_login: official.users_login,
        users_phoneNumber: official.users_phoneNumber ?? 'Brak danych',
        users_ID: official.users_ID,
        users_statusID: official.users_statusID,
        users_typeID: official.users_typeID,
      })
    }
  }

  const handleSearch = (users_name: string) => {
    if (users_name) {
      setOfficials(() =>
        allOfficials.filter(
          (official) =>
            official?.users_name
              .toLowerCase()
              .includes(users_name.toLowerCase()) ??
            official?.users_login
              .toLowerCase()
              .includes(users_name.toLowerCase())
        )
      )
    } else {
      setOfficials(data?.admin?.officials?.get ?? [])
    }
  }

  const columns: ColumnsType<AdminOfficialsListDataType> = [
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
      title: 'Typ',
      dataIndex: 'users_typeID',
      render(text: number) {
        switch (text) {
          case 6: {
            return 'Superurzędnik'
          }

          case 9: {
            return 'Firma'
          }

          case 10: {
            return 'Spółdzielnia mieszkaniowa'
          }

          default: {
            return 'Brak danych'
          }
        }
      },
    },
    {
      title: 'Numer telefonu',
      dataIndex: 'users_phoneNumber',
      render: (text: string) => <>{text || 'Brak danych'}</>,
    },
    {
      title: 'Status',
      dataIndex: 'users_statusID',
      render: (text: string) => (
        <>
          {(Number(text) === 1 ? (
            <span className={styles.statusInfoActive}>Aktywny</span>
          ) : (
            <span className={styles.statusInfoBlocked}>Zablokowany</span>
          )) || 'Brak danych'}
        </>
      ),
    },
    {
      title: <AdminOfficialCreateForm />,
      key: 'users_action',
      render: (_, record) => (
        <Space size="middle" direction="horizontal">
          <AdminOfficialChangePasswordModal user_ID={record.users_ID} />
          <AdminOfficialDeleteForm user_ID={record.users_ID} />
        </Space>
      ),
    },
  ]

  return (
    <>
      <Form onSubmit={() => undefined}>
        {({ handleSubmit }) => (
          <form
            onSubmit={handleSubmit}
            onChange={(e) => {
              const target = e.target as HTMLInputElement
              handleSearch(target.value)
            }}
          >
            <div className={styles.inputWrapper}>
              <Input
                withGradient
                name="users_name"
                placeholder={
                  <span className={styles.search}>
                    <SearchOutlined />
                    Szukaj
                  </span>
                }
                type="text"
              />
            </div>
          </form>
        )}
      </Form>
      <div>
        <div style={{ marginTop: '30px' }}>
          {officials && officials.length > 0 ? (
            <Table
              pagination={{ pageSize: 5, position: ['bottomCenter'] }}
              columns={columns}
              dataSource={tableData}
            />
          ) : (
            <Result
              icon={null}
              title="Brak urzędników spełniających kryteria wyszukiwania"
            />
          )}
        </div>
      </div>
    </>
  )
}
