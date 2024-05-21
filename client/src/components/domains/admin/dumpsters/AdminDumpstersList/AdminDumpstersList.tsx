import { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import { Button, Space, Result } from 'antd'
import { EditOutlined, InfoCircleTwoTone } from '@ant-design/icons'
import Table, { type ColumnsType } from 'antd/es/table'
import { AdminDumpsterDeleteForm } from '../AdminDumpsterDeleteForm/AdminDumpsterDeleteForm'
import { AdminDumpsterCreateForm } from '../AdminDumpsterCreateForm/AdminDumpsterCreateForm'
import { AdminDumpsterEditForm } from '../AdminDumpsterEditForm/AdminDumpsterEditForm'
import { AdminOwnerDeleteForm } from '../AdminOwnerDeleteForm/AdminOwnerDeleteForm'
import { AdminOwnerAddForm } from '../AdminOwnerAddForm/AdminOwnerAddForm'
import { AdminDumpsterBinEditForm } from '../AdminDumpsterBinEditForm/AdminDumpsterBinEditForm'
import {
  type AdminDumpstersSearchQueryResult,
  type DumpstersListDataType,
} from '../adminDumpstersInterfaces'
import styles from './AdminDumpstersList.module.scss'
import { graphql } from '@/gql'
import { reverseArray } from '@/utils/applicationUtils'

const adminDumpstersQuery = graphql(`
  query AdminDumpstersGet2 {
    admin {
      dumpsters {
        get {
          dumpster_ID
          dumpster_street
          dumpster_city
          dumpster_postCode
          dumpster_communityID
          dumpster_houseNumbers
          dumpster_hasError
          dumpster_name
          dumpster_description
          bins {
            dumpsterBin_ID
            dumpsterBin_typeID
          }
          owners {
            users_name
            users_ID
          }
        }
      }
    }
  }
`)

export const AdminDumpstersList: React.FC = () => {
  const { data } = useQuery(adminDumpstersQuery)
  const [dumpstersList, setDumpstersList] = useState<
    AdminDumpstersSearchQueryResult[]
  >([])
  const [isEditModalOpen, setIsEditDumpsterModalOpen] = useState(false)
  const [chosenDumpster, setChosenDumpster] =
    useState<AdminDumpstersSearchQueryResult>()
  const [isAddOwnerModalOpen, setIsAddOwnerModalOpen] = useState(false)
  const [isEditDumpsterBinModalOpen, setIsEditDumpsterBinModalOpen] =
    useState(false)
  const [isCreateDumpsterModalOpen, setIsCreateDumpsterModalOpen] =
    useState(false)

  useEffect(() => {
    const response = data?.admin?.dumpsters?.get
    if (response) {
      setDumpstersList(response)
    }
  }, [data])

  const tableData = reverseArray(dumpstersList).map(
    (dumpster: AdminDumpstersSearchQueryResult) => ({
      key: dumpster.dumpster_name,
      owner: dumpster?.owners ? dumpster.owners[0]?.users_name : 'Gmina',
      location: `${dumpster.dumpster_postCode} ${dumpster.dumpster_city}, ul. ${dumpster.dumpster_street}`,
      status: dumpster.dumpster_hasError ? 'Uszkodzona' : 'Sprawna',
      dumpsterData: dumpster,
    })
  )

  const columns: ColumnsType<DumpstersListDataType> = [
    {
      title: 'Nazwa',
      dataIndex: 'key',
    },
    {
      title: 'Właściciel',
      dataIndex: 'owner',

      render: (_, record) => (
        <Space size="middle" direction="horizontal">
          {record.owner === undefined ? (
            <>
              Gmina
              <Button
                onClick={() => {
                  setIsAddOwnerModalOpen(true)
                  setChosenDumpster(record.dumpsterData)
                }}
                className={styles.iconButton}
              >
                <EditOutlined />
              </Button>
            </>
          ) : (
            <>
              {record.owner}
              <AdminOwnerDeleteForm
                user_ID={record.dumpsterData.owners[0]?.users_ID}
                dumpster_ID={record.dumpsterData.dumpster_ID}
              />
            </>
          )}
        </Space>
      ),
    },
    {
      title: 'Lokalizacja',
      dataIndex: 'location',
    },
    {
      title: 'Status',
      dataIndex: 'status',
    },
    {
      title: (
        <AdminDumpsterCreateForm
          isModalOpen={isCreateDumpsterModalOpen}
          setIsModalOpen={setIsCreateDumpsterModalOpen}
        />
      ),
      key: 'users_action',
      render: (_, record) => (
        <Space size="middle" direction="horizontal">
          <Button
            onClick={() => {
              setIsEditDumpsterBinModalOpen(true)
              setChosenDumpster(record.dumpsterData)
            }}
          >
            Edytuj kubły
          </Button>
          <Button
            onClick={() => {
              setIsEditDumpsterModalOpen(true)
              setChosenDumpster(record.dumpsterData)
            }}
          >
            Edytuj altanę
          </Button>
          <AdminDumpsterDeleteForm
            dumpster_ID={record.dumpsterData.dumpster_ID}
          />
        </Space>
      ),
    },
  ]

  return (
    <>
      {isEditModalOpen && chosenDumpster ? (
        <AdminDumpsterEditForm
          dumpsterData={chosenDumpster}
          open={isEditModalOpen}
          setOpen={setIsEditDumpsterModalOpen}
        />
      ) : null}
      {isEditDumpsterBinModalOpen && chosenDumpster ? (
        <AdminDumpsterBinEditForm
          dumpsterData={chosenDumpster}
          open={isEditDumpsterBinModalOpen}
          setOpen={setIsEditDumpsterBinModalOpen}
        />
      ) : null}
      {isAddOwnerModalOpen && chosenDumpster ? (
        <AdminOwnerAddForm
          dumpsterID={chosenDumpster.dumpster_ID}
          open={isAddOwnerModalOpen}
          setOpen={setIsAddOwnerModalOpen}
        />
      ) : null}

      <div className={styles.tableWrapper}>
        {dumpstersList && dumpstersList.length > 0 ? (
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
    </>
  )
}
