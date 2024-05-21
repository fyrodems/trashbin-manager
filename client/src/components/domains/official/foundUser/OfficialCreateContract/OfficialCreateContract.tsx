import { App, Button } from 'antd'
import { useMutation } from '@apollo/client'
import { PlusOutlined } from '@ant-design/icons'
import { useState } from 'react'
import { Form } from 'react-final-form'
import {
  type OfficialCreateContractProps,
  type OfficialAddContractValues,
} from '../officialFoundUserInterfaces'
import { validateContractInfo } from './validation'
import { graphql } from '@/gql'
import { Input } from '@/components/domains/common/Input'
import { FormModal } from '@/components/domains/common/FormModal'
import { useAuth } from '@/auth/authProvider'
import { type UserContractRatesType } from '@/gql/commonTypes'

const officialCreateContractMutation = graphql(`
  mutation OfficialUserContractsAdd(
    $props: OfficialUserContractsAddMutationProps!
  ) {
    official {
      userContracts {
        add(props: $props) {
          status {
            message
          }
        }
      }
    }
  }
`)

export const OfficialCreateContract: React.FC<OfficialCreateContractProps> = ({
  userData,
  refetch,
}) => {
  const [add, { loading }] = useMutation(officialCreateContractMutation)
  const { message } = App.useApp()
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const { user } = useAuth()
  const addContract = async (values: OfficialAddContractValues) => {
    const {
      usersContract_number,
      usersContract_dateFrom,
      usersContract_dateTo,
      usersContract_ratePaper,
      usersContract_ratePlastic,
      usersContract_rateGlass,
      usersContract_rateBio,
      usersContract_rateMixed,
    } = values

    const communityID = user?.addressInfo?.find(
      (address) => address.usersAddress_typeID === 3
    )?.usersAddress_communityID
    if (userData.basicInfo && communityID !== undefined) {
      const { data } = await add({
        variables: {
          props: {
            usersContract_userID: userData.basicInfo.users_ID,
            usersContract_number,
            usersContract_dateFrom,
            usersContract_dateTo,
            usersContract_statusID: 15,
            usersContract_communityID: communityID,
            usersContract_ratePaper,
            usersContract_ratePlastic,
            usersContract_rateGlass,
            usersContract_rateBio,
            usersContract_rateMixed,
          },
        },
      })

      const status = data?.official?.userContracts?.add?.status.message

      if (status === 'Error') {
        await message.error('Wystąpił błąd')
      } else {
        await message.success('Dodano kontrakt')
        setIsModalOpen(false)
      }
    } else {
      await message.error('Wystąpił błąd')
    }

    await refetch()
  }

  //   jeśli istnieje aktywna umowa, nie zezwól na dodanie nowej
  const isDisabled = (
    userContracts:
      | Array<{
          usersContract_ID: number
          usersContract_userID: number
          usersContract_number: string
          usersContract_dateFrom: string
          usersContract_dateTo: string
          usersContract_statusID: number
          usersContract_communityID: number
          rates?: UserContractRatesType
        }>
      | undefined
  ) => {
    if (userContracts) {
      const numOfActiveContracts = [...userContracts].filter(
        (contract) => contract.usersContract_statusID === 15
      ).length
      if (numOfActiveContracts > 0) {
        return true
      }
    }

    return false
  }

  const formNode = (
    <Form onSubmit={addContract} validate={validateContractInfo}>
      {({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <Input
            name="usersContract_number"
            placeholder="Numer umowy"
            type="text"
          />
          <Input
            name="usersContract_dateFrom"
            placeholder="Obowiązuje od"
            type="date"
          />
          <Input
            name="usersContract_dateTo"
            placeholder="Obowiązuje do"
            type="date"
          />
          <Input
            name="usersContract_ratePaper"
            placeholder="Stawka papier"
            type="number"
          />
          <Input
            name="usersContract_ratePlastic"
            placeholder="Stawka tworzywa sztuczne"
            type="number"
          />
          <Input
            name="usersContract_rateGlass"
            placeholder="Stawka szkło"
            type="number"
          />
          <Input
            name="usersContract_rateBio"
            placeholder="Stawka bio"
            type="number"
          />
          <Input
            name="usersContract_rateMixed"
            placeholder="Stawka zmieszane"
            type="number"
          />
          <div
            style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}
          >
            <Button
              onClick={() => {
                setIsModalOpen(false)
              }}
            >
              Anuluj
            </Button>
            <Button htmlType="submit" type="primary" loading={loading}>
              Dodaj
            </Button>
          </div>
        </form>
      )}
    </Form>
  )

  return (
    <FormModal
      isModalOpen={isModalOpen}
      setIsModalOpen={setIsModalOpen}
      isDisabled={isDisabled(
        userData.contracts?.userContracts as Array<{
          usersContract_ID: number
          usersContract_userID: number
          usersContract_number: string
          usersContract_dateFrom: string
          usersContract_dateTo: string
          usersContract_statusID: number
          usersContract_communityID: number
          rates?: UserContractRatesType
        }>
      )}
      buttonContent={
        <span
          style={{
            display: 'flex',
            margin: '0 auto',
            gap: '6px',
            alignItems: 'center',
          }}
        >
          <PlusOutlined />
          Dodaj umowę
        </span>
      }
      popupTitle="Dodaj umowę"
      formNode={formNode}
    />
  )
}
