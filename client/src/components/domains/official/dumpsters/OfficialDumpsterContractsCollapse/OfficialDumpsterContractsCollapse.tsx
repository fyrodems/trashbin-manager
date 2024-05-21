import { App, Collapse, Result } from 'antd'
import { useMutation } from '@apollo/client'
import { InfoCircleTwoTone } from '@ant-design/icons'
import { OfficialEditContract } from '../contracts/OfficialEditContract/OfficialEditContract'
import { OfficialAddRate } from '../rates/OfficialAddRate/OfficialAddRate'
import { OfficialDumpsterContractsRates } from '../rates/OfficialDumpsterContractsRates/OfficialDumpsterContractsRates'
import styles from './OfficialDumpsterContractsCollapse.module.scss'
import {
  type OfficialDumpsterContractsCollapseProps,
  type ContractActionsProps,
} from './interfaces'
import { graphql } from '@/gql'
import { ConfirmModal } from '@/components/domains/common/ConfirmModal'
import { RateStatus } from '@/types/Status'

const { Panel } = Collapse

const officialContractsArchivizeMutation = graphql(`
  mutation OfficialContractsArchivize(
    $props: OfficialContractsArchivizeMutationProps!
  ) {
    official {
      contracts {
        archivize(props: $props) {
          status {
            message
          }
        }
      }
    }
  }
`)

export const OfficialDumpsterContractsCollapse: React.FC<
  OfficialDumpsterContractsCollapseProps
> = ({ contracts, refetch }) => {
  const { message } = App.useApp()
  const [archivize] = useMutation(officialContractsArchivizeMutation)

  const isDateInPast = (date: string) => {
    const givenDate = new Date(date)
    const currentDate = new Date()
    return givenDate.getTime() < currentDate.getTime()
  }

  const archivizeContract = async (dumpsterContract_ID: number) => {
    const { data } = await archivize({
      variables: {
        props: {
          dumpsterContract_ID,
        },
      },
    })

    await refetch()
    const status = data?.official?.contracts?.archivize?.status.message

    await (status === 'Error'
      ? message.error('Wystąpił błąd')
      : message.success('Zarchiwizowano kontrakt'))
  }

  function formatDate(inputDate: string): string {
    const date = new Date(inputDate)

    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const year = date.getFullYear()

    return `${day}.${month}.${year}`
  }

  const ContractActions: React.FC<ContractActionsProps> = ({ contract }) => (
    <div
      data-action="stop-propagation"
      onClick={(event) => {
        event.stopPropagation()
      }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        gap: '10px',
      }}
    >
      <OfficialEditContract contractData={contract} refetch={refetch} />
      <ConfirmModal
        popupTitle={`Czy na pewno chcesz zarchiwizować umowę o numerze 
        ${contract.dumpsterContract_number} 
        z dzisiejszą datą zakończenia?`}
        buttonContent="Archiwizuj umowę"
        confirmFunction={async () => {
          await archivizeContract(contract.dumpsterContract_ID)
        }}
      />
    </div>
  )

  const activeContracts = contracts.filter(
    (c: { dumpsterContract_dateTo: string }) =>
      !isDateInPast(c.dumpsterContract_dateTo)
  )

  const collapseItems = activeContracts.map((contract) => {
    const {
      dumpsterContract_ID,
      dumpsterContract_dateTo,
      dumpsterContract_number,
      rates,
    } = contract

    const activeRates = rates.filter((rate) => {
      return rate.rate_statusID === RateStatus.CURRENT
    })

    return (
      <Panel
        key={dumpsterContract_ID}
        header={`Umowa nr ${dumpsterContract_number} ważna do ${formatDate(
          dumpsterContract_dateTo
        )}`}
        extra={<ContractActions contract={contract} />}
        className={styles.cardPanel}
      >
        <OfficialDumpsterContractsRates
          key={dumpsterContract_ID}
          rates={activeRates}
          refetch={refetch}
        />
        <OfficialAddRate
          contractID={dumpsterContract_ID}
          rates={activeRates}
          refetch={refetch}
        />
      </Panel>
    )
  })

  return (
    <>
      {collapseItems && collapseItems.length > 0 ? (
        <Collapse ghost={true} expandIconPosition="start">
          {collapseItems}
        </Collapse>
      ) : (
        <Result
          icon={<InfoCircleTwoTone twoToneColor={'#99BA75'} />}
          title="Nie znaleziono aktywnych umów przypisanych do atlany"
        />
      )}
    </>
  )
}
