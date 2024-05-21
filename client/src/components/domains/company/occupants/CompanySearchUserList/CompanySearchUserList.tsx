import { useMutation } from '@apollo/client'
import { App, Button, Divider, Spin, Table } from 'antd'
import { type ColumnsType } from 'antd/es/table'
import { useState } from 'react'
import { type DataType, type FoundUsersListProps } from './interfaces'
import { graphql } from '@/gql'
import { useAuth } from '@/auth/authProvider'
import { AccountStatus } from '@/types/Status'
import styles from './CompanySearchUserList.module.scss'

const officialOccupantsAddMutation = graphql(`
  mutation CompanyOccupantsAdd($props: CompanyOccupantsAddMutationProps!) {
    company {
      occupants {
        add(props: $props) {
          status {
            message
          }
        }
      }
    }
  }
`)

export const CompanySearchUserList: React.FC<FoundUsersListProps> = ({
  findUserLoading,
  usersList,
  occupantsToAdd,
  setOccupantsToAdd,
  refetch,
}) => {
  const { message } = App.useApp()
  const { user } = useAuth()
  const [occupantAddLoading, setOccupantAddLoading] = useState<boolean>(false)
  const [addOccupant] = useMutation(officialOccupantsAddMutation)

  const statusLabel: Record<string, string> = {
    1: 'Aktywny',
    2: 'Zablokowany',
    3: 'Do zatwierdzenia',
  }

  const rowSelection = {
    onChange(selectedRowKeys: React.Key[]) {
      setOccupantsToAdd(
        tableData.filter((userData) => selectedRowKeys.includes(userData.key))
      )
    },
    getCheckboxProps: (record: DataType) => ({
      disabled: record.name === 'Disabled User',
      name: record.name,
    }),
  }

  const addOccup = async (occupant_ID: number) => {
    try {
      setOccupantAddLoading(true)

      if (user?.basicInfo && user?.basicInfo.users_ID) {
        const { data: mutationData } = await addOccupant({
          variables: {
            props: {
              company_ID: user.basicInfo.users_ID,
              occupant_ID,
            },
          },
        })

        await refetch()

        const status = mutationData?.company?.occupants?.add?.status.message
        await (status === 'Success'
          ? message.success('Dodano lokatora')
          : message.error('Wystąpił błąd'))
      }
    } catch (error) {
      console.error('Error:', error)
      await message.error('Wystąpił błąd')
    } finally {
      setOccupantAddLoading(false)
    }
  }

  const tableData = usersList.map((user) => ({
    key: user.users_ID,
    name: user.users_name,
    login: user.users_login,
    phoneNumber: user.users_phoneNumber,
    ID: user.users_ID,
    statusID: user.users_statusID,
  }))

  const columns: ColumnsType<DataType> = [
    {
      title: 'Imię i nazwisko',
      dataIndex: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
      sortDirections: ['descend', 'ascend', 'descend'],

      render: (text: string) => <p>{text}</p>,
    },
    {
      title: 'E-mail',
      dataIndex: 'login',
    },
    {
      title: 'Numer telefonu',
      dataIndex: 'phoneNumber',
    },
    {
      title: 'Status',
      dataIndex: 'statusID',
      render: (text: string) => <>{statusLabel[text] ?? 'Do zatwierdzenia'}</>,
      filters: [
        {
          text: 'Aktywny',
          value: AccountStatus.ACTIVE,
        },
        {
          text: 'Zablokowany',
          value: AccountStatus.BLOCKED,
        },
        {
          text: 'Do zatwierdzenia',
          value: AccountStatus.FOR_APPROVAL,
        },
      ],
      onFilter: (value, record) =>
        record.statusID.toString().startsWith(value as string),
    },
  ]

  if (findUserLoading) {
    return (
      <div style={{ display: 'grid', placeItems: 'center' }}>
        <Spin size="large" />
      </div>
    )
  }

  if (usersList.length > 0) {
    return (
      <>
        <Spin
          size="large"
          spinning={occupantAddLoading}
          className={
            occupantAddLoading ? styles.spinWithOpacity : styles.spinHidden
          }
        />
        <Divider />
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '40px',
          }}
        >
          <Button
            loading={occupantAddLoading}
            type="primary"
            onClick={async () => {
              for (const occupant of occupantsToAdd) {
                await addOccup(occupant.ID)
              }
            }}
            disabled={occupantsToAdd.length === 0}
          >
            Dodaj wybranych lokatorów do spółdzielni
          </Button>
        </div>
        <Table
          pagination={{ pageSize: 5, position: ['bottomCenter'] }}
          rowSelection={{
            ...rowSelection,
          }}
          columns={columns}
          dataSource={tableData}
        />
      </>
    )
  }

  return null
}
