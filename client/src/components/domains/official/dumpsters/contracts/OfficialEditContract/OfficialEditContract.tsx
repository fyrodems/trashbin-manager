import { useMutation } from '@apollo/client'
import { Button, Radio, Space, type RadioChangeEvent, Divider, App } from 'antd'
import { Form } from 'react-final-form'
import { useState } from 'react'
import {
  type DumpsterContract,
  type OfficialEditContractProps,
} from './interfaces'
import { validateContractInfo } from './validate'
import { graphql } from '@/gql'
import { FormModal } from '@/components/domains/common/FormModal'
import { ContractStatus } from '@/types/Status'
import { DateInput } from '@/components/domains/common/Inputs/DateInput'

const editContractMutation = graphql(`
  mutation OfficialContractsEdit($props: OfficialContractsEditMutationProps!) {
    official {
      contracts {
        edit(props: $props) {
          status {
            message
          }
        }
      }
    }
  }
`)

export const OfficialEditContract: React.FC<OfficialEditContractProps> = ({
  contractData,
  refetch,
}) => {
  const { message } = App.useApp()
  const [update, { loading }] = useMutation(editContractMutation)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [contractStatus, setContractStatus] = useState<number>(
    contractData.dumpsterContract_statusID
  )

  const initialValues: DumpsterContract = {
    dumpsterContract_ID: contractData.dumpsterContract_ID,
    dumpsterContract_dateFrom: contractData.dumpsterContract_dateFrom.slice(
      0,
      10
    ),
    dumpsterContract_dateTo: contractData.dumpsterContract_dateTo.slice(0, 10),
    dumpsterContract_statusID: contractData.dumpsterContract_statusID,
    dumpsterContract_dumpsterID: contractData.dumpsterContract_dumpsterID,
  }

  const onContractStatusChange = (e: RadioChangeEvent) => {
    setContractStatus(e.target.value)
  }

  const onSubmit = async (values: DumpsterContract) => {
    const { data } = await update({
      variables: {
        props: {
          ...values,
          dumpsterContract_ID: contractData?.dumpsterContract_ID,
          dumpsterContract_statusID: contractStatus,
          dumpsterContract_dumpsterID:
            contractData?.dumpsterContract_dumpsterID,
        },
      },
    })

    setIsModalOpen(false)
    await refetch()

    const status = data?.official?.contracts?.edit?.status.message
    await (status === 'Error'
      ? message.error('Wystąpił błąd')
      : message.success('Zapisano zmiany'))
  }

  const formNode = (
    <Form
      onSubmit={onSubmit}
      initialValues={initialValues}
      validate={validateContractInfo}
    >
      {({ handleSubmit }) => (
        <form id="contractData" onSubmit={handleSubmit}>
          <Divider orientation="left" orientationMargin={0}>
            Status umowy
          </Divider>
          <Radio.Group onChange={onContractStatusChange} value={contractStatus}>
            <Space direction="vertical">
              <Radio value={ContractStatus.CURRENT}>Aktywna</Radio>
              <Radio value={ContractStatus.HISTORICAL}>Historyczna</Radio>
            </Space>
          </Radio.Group>
          <Divider />

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              gap: '10px',
            }}
          >
            <div style={{ width: '100%' }}>
              <div style={{ marginLeft: '2px' }}>Data rozpoczęcia umowy</div>
              <DateInput
                name={'dumpsterContract_dateFrom'}
                showLabel={false}
                placeholder={initialValues.dumpsterContract_dateFrom
                  .split('-')
                  .reverse()
                  .join('-')}
              />
            </div>
            <div style={{ width: '100%' }}>
              <div style={{ marginLeft: '2px' }}>Data zakończenia umowy</div>
              <DateInput
                name={'dumpsterContract_dateTo'}
                showLabel={false}
                placeholder={initialValues.dumpsterContract_dateTo
                  .split('-')
                  .reverse()
                  .join('-')}
              />
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              gap: '8px',
              justifyContent: 'flex-end',
              margin: '20px 0 10px',
            }}
          >
            <Button
              onClick={() => {
                setIsModalOpen(false)
              }}
            >
              Anuluj
            </Button>
            <Button
              form="contractData"
              htmlType="submit"
              type="primary"
              loading={loading}
            >
              Zmień
            </Button>
          </div>
        </form>
      )}
    </Form>
  )

  return (
    <FormModal
      popupTitle="Edycja umowy"
      formNode={formNode}
      buttonContent="Edytuj umowę"
      isModalOpen={isModalOpen}
      setIsModalOpen={setIsModalOpen}
    />
  )
}
