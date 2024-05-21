import { Divider, Spin, Table } from 'antd'
import { type ColumnsType } from 'antd/es/table'
import { Link } from 'react-router-dom'
import { type FoundUsersListProps } from '../officialSearchUserInterfaces'

export interface DataType {
  key: React.Key
  name: string
  ID: number
  statusID: number
}

export const OfficialSearchUserList: React.FC<FoundUsersListProps> = ({
  loading,
  usersList,
}) => {
  const statusLabel: Record<string, string> = {
    1: 'Aktywny',
    2: 'Zablokowany',
    3: 'Do zatwierdzenia',
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

      render: (text: string, record: DataType) => (
        <Link to={`/user/${record.ID}`}>{text}</Link>
      ),
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
          value: 1,
        },
        {
          text: 'Zablokowany',
          value: 2,
        },
        {
          text: 'Do zatwierdzenia',
          value: 3,
        },
      ],
      onFilter: (value, record) =>
        record.statusID.toString().startsWith(value as string),
    },
  ]

  if (loading) {
    return (
      <div style={{ display: 'grid', placeItems: 'center' }}>
        <Spin size="large" />
      </div>
    )
  }

  if (usersList.length > 0) {
    return (
      <>
        <Divider />

        <Table
          pagination={{ pageSize: 5, position: ['bottomCenter'] }}
          columns={columns}
          dataSource={tableData}
        />
      </>
    )
  }

  return null
}
