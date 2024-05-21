import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { App, Descriptions, Divider, Radio, type RadioChangeEvent } from 'antd'
import { OfficialEditContractForm } from '../OfficialEditContract/OfficialEditContractForm'
import { OfficialArchivizeContract } from '../OfficialArchivizeContract/OfficialArchivizeContract'
import type {
  OfficialPanelUserContractsProps,
  ContractInfoValues,
  UserContractInfoValues,
} from '../contractsInterfaces'
import { OfficialCreateContract } from '../../OfficialCreateContract/OfficialCreateContract'
import styles from './OfficialPanelUserContracts.module.scss'
import { graphql } from '@/gql'

const { Item } = Descriptions

const officialEditContractMutation = graphql(`
  mutation OfficialUserContractsEdit(
    $props: OfficialUserContractsEditMutationProps!
  ) {
    official {
      userContracts {
        edit(props: $props) {
          status {
            message
          }
        }
      }
    }
  }
`)

export const OfficialPanelUserContracts: React.FC<
  OfficialPanelUserContractsProps
> = ({ userContractsData, refetch, userData }) => {
  const [update] = useMutation(officialEditContractMutation)
  const [selectedStatusId, setSelectedStatusId] = useState<string>('15')
  const { message } = App.useApp()
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  if (userContractsData === undefined) {
    throw new Error('No contracts data!')
  }

  const onSubmit = async (values: UserContractInfoValues) => {
    const {
      usersContract_number,
      usersContract_dateFrom,
      usersContract_dateTo,
      usersContract_ID,
      rates,
    } = values

    if (
      usersContract_ID &&
      usersContract_number &&
      usersContract_dateFrom &&
      usersContract_dateTo &&
      rates?.paper &&
      rates?.plastic &&
      rates?.glass &&
      rates?.bio &&
      rates?.mixed
    ) {
      const { data } = await update({
        variables: {
          props: {
            usersContract_ID,
            usersContract_number,
            usersContract_dateFrom,
            usersContract_dateTo,
            usersContract_statusID: 15,
            usersContract_ratePaper: rates.paper,
            usersContract_ratePlastic: rates.plastic,
            usersContract_rateGlass: rates.glass,
            usersContract_rateBio: rates.bio,
            usersContract_rateMixed: rates.mixed,
          },
        },
      })

      const status = data?.official?.userContracts?.edit?.status.message

      if (status === 'Success') {
        await message.success('Poprawnie edytowano umowę')
        setIsModalOpen(false)
      } else {
        await message.error('Wystąpił błąd')
      }
    } else {
      await message.error('Wystąpił błąd')
    }

    await refetch()
  }

  const returnJSXElement = (
    contract: UserContractInfoValues,
    initialValues: ContractInfoValues
  ) => (
    <div key={contract.usersContract_ID}>
      <Descriptions
        labelStyle={{ width: '170px' }}
        size="small"
        column={1}
        bordered
      >
        <Item label="Numer umowy">{contract.usersContract_number}</Item>
        <Item label="Obowiązuje od">{contract.usersContract_dateFrom}</Item>
        <Item label="Obowiązuje do">{contract.usersContract_dateTo}</Item>
        <Item label="Stawka papier">
          {contract.rates?.paper
            ? `${contract.rates.paper} zł/kg`
            : 'Brak danych'}
        </Item>
        <Item label="Stawka tworzywa sztuczne">
          {contract.rates?.plastic
            ? `${contract.rates.plastic} zł/kg`
            : 'Brak danych'}
        </Item>
        <Item label="Stawka szkło">
          {contract.rates?.glass
            ? `${contract.rates.glass} zł/kg`
            : 'Brak danych'}
        </Item>
        <Item label="Stawka bio">
          {contract.rates?.bio ? `${contract.rates.bio} zł/kg` : 'Brak danych'}
        </Item>
        <Item label="Stawka zmieszane">
          {contract.rates?.mixed
            ? `${contract.rates.mixed} zł/kg`
            : 'Brak danych'}
        </Item>
      </Descriptions>

      <div className={styles.contractActions}>
        {contract.usersContract_statusID === 15 && contract.usersContract_ID ? (
          <>
            <OfficialEditContractForm
              onSubmit={onSubmit}
              initialValues={{
                ...initialValues,
                usersContract_dateTo:
                  initialValues.dumpsterContract_dateTo ??
                  new Date().toISOString(),
                usersContract_dateFrom:
                  initialValues.usersContract_dateFrom ??
                  new Date().toISOString(),
                usersContract_number:
                  initialValues.usersContract_number ?? 'Numer umowy',
                usersContract_ratePaper: initialValues.rates.paper ?? 0,
                usersContract_ratePlastic: initialValues.rates.plastic ?? 0,
                usersContract_rateGlass: initialValues.rates.glass ?? 0,
                usersContract_rateBio: initialValues.rates.bio ?? 0,
                usersContract_rateMixed: initialValues.rates.mixed ?? 0,
              }}
              contract={contract}
              isModalOpen={isModalOpen}
              setIsModalOpen={setIsModalOpen}
            />

            <OfficialArchivizeContract
              usersContract_ID={contract.usersContract_ID}
              refetch={refetch}
            />
          </>
        ) : null}
      </div>
    </div>
  )

  let contracts: string | any[] = []
  if (userContractsData) {
    contracts = userContractsData
      .filter(
        (contract) =>
          contract.usersContract_statusID === Number(selectedStatusId)
      )
      .map((contract) => {
        const initialValues: ContractInfoValues = {
          usersContract_ID: contract.usersContract_ID,
          usersContract_userID: contract.usersContract_userID,
          usersContract_number: contract.usersContract_number,
          usersContract_dateFrom: contract.usersContract_dateFrom,
          usersContract_dateTo: contract.usersContract_dateTo,
          usersContract_statusID: contract.usersContract_statusID,
          usersContract_communityID: contract.usersContract_communityID,
          rates: {
            bio: contract.rates?.bio ?? 0,
            glass: contract.rates?.glass ?? 0,
            mixed: contract.rates?.mixed ?? 0,
            paper: contract.rates?.paper ?? 0,
            plastic: contract.rates?.paper ?? 0,
          },
        }

        return returnJSXElement(contract, initialValues)
      })
  }

  const onChange = (e: RadioChangeEvent) => {
    setSelectedStatusId(e.target.value as string)
  }

  const sortOptions = [
    { label: 'Aktywna', value: '15' },
    { label: 'Historyczne', value: '16' },
  ]

  return (
    <>
      <Divider>Umowy użytkownika</Divider>
      <div className={styles.headerWrapper}>
        <OfficialCreateContract userData={userData} refetch={refetch} />
        <Radio.Group
          className={styles.groupRadio}
          options={sortOptions}
          onChange={(e) => {
            onChange(e)
          }}
          value={selectedStatusId}
          optionType="button"
        />
      </div>
      <>
        {contracts.length > 0 ? (
          contracts
        ) : (
          <li
            className={styles.noContractInfo}
          >{`Użytkownik nie ma umowy o wskazanym statusie`}</li>
        )}
      </>
    </>
  )
}
