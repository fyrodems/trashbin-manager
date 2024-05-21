import { Button, Modal, Radio, type RadioChangeEvent, Space } from 'antd'
import { useMutation } from '@apollo/client'
import { type AdminDumpsterUpdateProps } from '../adminDumpstersInterfaces'
import { graphql } from '@/gql'

const editDumpsterBinMutation = graphql(`
  mutation AdminDumpstersBinEdit($props: AdminDumpstersBinEditMutationProps!) {
    admin {
      dumpsters {
        bin(props: $props) {
          status {
            message
          }
        }
      }
    }
  }
`)

const trashTypes = [
  { trashTypeName: 'Papier', value: 11 },
  { trashTypeName: 'Bioodpady', value: 12 },
  { trashTypeName: 'Metale i tworzywa', value: 13 },
  { trashTypeName: 'Szkło', value: 14 },
  { trashTypeName: 'Zmieszane', value: 15 },
]

export const AdminDumpsterBinEditForm: React.FC<AdminDumpsterUpdateProps> = ({
  open,
  setOpen,
  dumpsterData,
}) => {
  const [updateBin] = useMutation(editDumpsterBinMutation)

  const radioOnChange = async (e: RadioChangeEvent, id: number) => {
    await updateBin({
      variables: {
        props: {
          dumpsterBin_ID: id,
          dumpsterBin_typeID: e.target.value as number,
        },
      },
    })
  }

  const bins = []

  if (dumpsterData.bins) {
    for (const bin of dumpsterData.bins) {
      if (bin) {
        bins.push(
          <div key={bin.dumpsterBin_ID}>
            <p>Kubeł o ID: {bin.dumpsterBin_ID}</p>
            <Radio.Group
              onChange={async (e) => radioOnChange(e, bin.dumpsterBin_ID)}
              value={bin.dumpsterBin_typeID}
            >
              <Space direction="horizontal">
                {trashTypes.map(({ trashTypeName, value }) => {
                  return (
                    <Radio
                      key={value}
                      value={value}
                      defaultChecked={bin.dumpsterBin_typeID === value}
                    >
                      {trashTypeName}
                    </Radio>
                  )
                })}
              </Space>
            </Radio.Group>
          </div>
        )
      }
    }
  }

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
        </>
      }
      open={open}
      onCancel={() => {
        setOpen(false)
      }}
    >
      {bins.length > 0 ? bins : <div>Brak informacji o kubłach</div>}
    </Modal>
  )
}
