import { Space, Button, Result, App } from 'antd'
import { useQuery, useMutation } from '@apollo/client'
import { useState, useEffect } from 'react'
import Table, { type ColumnsType } from 'antd/es/table'
import { RedoOutlined, SearchOutlined } from '@ant-design/icons'
import { Form } from 'react-final-form'
import EditOutlined from '@ant-design/icons/lib/icons/EditOutlined'
import { SuperOfficialCreateOfficial } from '../SuperOfficialCreateOfficialForm/SuperOfficialCreateOfficialForm'
import { SuperOfficialDeleteOfficialForm } from '../SuperOfficialDeleteOfficialForm/SuperOfficialDeleteOfficialForm'
import { SuperOfficialEditOfficialForm } from '../SuperOfficialEditOfficialForm/SuperOfficialEditOfficialForm'
import {
  type OfficialInfoType,
  type DataType,
} from '../superOfficialInterfaces'
import styles from './SuperOfficialPanel.module.scss'
import { graphql } from '@/gql'
import { Input } from '@/components/domains/common/Input'

const findOfficialsQuery = graphql(`
  query SuperOfficialOfficialsGet {
    official {
      officials {
        get {
          users_ID
          users_login
          users_name
          users_identificationNumber
          users_phoneNumber
          users_typeID
          users_statusID
          addresses {
            usersAddress_ID
            usersAddress_userID
            usersAddress_street
            usersAddress_houseNumber
            usersAddress_apartamentNumber
            usersAddress_postCode
            usersAddress_city
            usersAddress_typeID
            usersAddress_communityID
            usersAddress_statusID
          }
        }
      }
    }
  }
`)

const restoreOfficialMutation = graphql(`
  mutation SuperOfficialOfficialRestore(
    $props: SuperOfficialOfficialRestoreMutationProps!
  ) {
    official {
      officials {
        restore(props: $props) {
          status {
            message
          }
        }
      }
    }
  }
`)

export const SuperOfficialPanel: React.FC = () => {
  const { data, refetch } = useQuery(findOfficialsQuery)
  const [officials, setOfficials] = useState<OfficialInfoType[]>([])
  const [allOfficials, setAllOfficials] = useState<OfficialInfoType[]>([])
  const [restore] = useMutation(restoreOfficialMutation)

  const [isEditOfficialOpen, setIsEditOfficialOpen] = useState(false)
  const [chosenOfficial, setChosenOfficial] = useState<DataType | undefined>(
    undefined
  )

  const { message } = App.useApp()

  useEffect(() => {
    if (data?.official?.officials?.get) {
      setOfficials(data?.official?.officials?.get)
      setAllOfficials(data?.official?.officials?.get)
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
        users_phoneNumber: official.users_phoneNumber,
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
      setOfficials(data?.official?.officials?.get ?? [])
    }
  }

  const restoreOfficial = async (id: number) => {
    const { data } = await restore({
      variables: {
        props: {
          users_ID: id,
        },
      },
    })

    const status = data?.official?.officials?.restore?.status.message

    await (status === 'Error'
      ? message.error('Wystąpił błąd')
      : message.success('Przywrócono urzędnika'))

    await refetch()
  }

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
      title: <SuperOfficialCreateOfficial refetch={refetch} />,
      key: 'users_action',
      render: (_, record) => (
        <Space size="middle" direction="horizontal">
          <Button
            onClick={() => {
              setIsEditOfficialOpen(true)
              setChosenOfficial(record)
            }}
            className={styles.iconButton}
          >
            <EditOutlined />
          </Button>
          {record.users_statusID === 2 ? (
            <Button
              className={styles.iconButton}
              onClick={async () => restoreOfficial(record.users_ID)}
            >
              <RedoOutlined />
            </Button>
          ) : (
            <SuperOfficialDeleteOfficialForm
              users_ID={record.users_ID}
              users_name={record.users_name}
              refetch={refetch}
            />
          )}
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
              handleSearch(e.target.value)
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
              pagination={{ pageSize: 10, position: ['bottomCenter'] }}
              columns={columns}
              dataSource={tableData}
            />
          ) : (
            <Result
              icon={<></>}
              title="Brak urzędników spełniających kryteria wyszukiwania"
            />
          )}
        </div>
      </div>

      {isEditOfficialOpen && chosenOfficial ? (
        <SuperOfficialEditOfficialForm
          open={isEditOfficialOpen}
          setOpen={setIsEditOfficialOpen}
          officialData={chosenOfficial}
          refetch={refetch}
        />
      ) : null}
    </>
  )
}
