import { App, Button } from 'antd'
import { useMutation } from '@apollo/client'
import { Form } from 'react-final-form'
import { useState } from 'react'
import {
  type ContractsInfo,
  type OfficialAddContractToDumpsterProps,
} from './interfaces'
import { graphql } from '@/gql'
import { Input } from '@/components/domains/common/Input'
import { validationMessages } from '@/utils/validationMessages'
import { FormModal } from '@/components/domains/common/FormModal'
import { ContractStatus } from '@/types/Status'
import { DateInput } from '@/components/domains/common/Inputs/DateInput'
import useValidateForms from '@/components/domains/user/hooks/useValidateForms'

const officialContractsAddMutation = graphql(`
  mutation OfficialContractsAdd($props: OfficialContractsAddMutationProps!) {
    official {
      contracts {
        add(props: $props) {
          status {
            message
          }
        }
      }
    }
  }
`)

export const OfficialAddContractToDumpster: React.FC<
  OfficialAddContractToDumpsterProps
> = ({ dumpster, refetch }) => {
  const [add, { loading }] = useMutation(officialContractsAddMutation)
  const { message } = App.useApp()
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  const addContract = async (values: ContractsInfo) => {
    const { data } = await add({
      variables: {
        props: {
          dumpsterContract_number: values.dumpsterContract_number,
          dumpsterContract_dumpsterID: dumpster.dumpster_ID,
          dumpsterContract_dateFrom: values.dumpsterContract_dateFrom,
          dumpsterContract_dateTo: values.dumpsterContract_dateTo,
          dumpsterContract_statusID: ContractStatus.CURRENT,
          dumpsterContract_communityID: dumpster.dumpster_communityID,
        },
      },
    })

    setIsModalOpen(false)
    await refetch()

    const status = data?.official?.contracts?.add?.status.message

    await (status === 'Error'
      ? message.error('Wystąpił błąd')
      : message.success('Dodano kontrakt'))
  }

  const validateContractInfo = (values: Partial<ContractsInfo>) => {
    const { required, wrongDateOrder } = validationMessages

    const { checkDateOrder } = useValidateForms()

    const errors: Partial<Record<keyof ContractsInfo, string>> = {
      dumpsterContract_number: values.dumpsterContract_number
        ? undefined
        : required,
      dumpsterContract_dateFrom: values.dumpsterContract_dateFrom
        ? undefined
        : required,
      dumpsterContract_dateTo: values.dumpsterContract_dateTo
        ? checkDateOrder(
            values.dumpsterContract_dateFrom,
            values.dumpsterContract_dateTo
          )
          ? undefined
          : wrongDateOrder
        : required,
    }

    return errors
  }

  const formNode = (
    <Form onSubmit={addContract} validate={validateContractInfo}>
      {({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <Input
            name="dumpsterContract_number"
            placeholder="Numer umowy"
            type="text"
          />

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              gap: '10px',
            }}
          >
            <div style={{ width: '100%' }}>
              <div style={{ marginLeft: '2px' }}>Data rozpoczęcia umowy</div>
              <DateInput name={'dumpsterContract_dateFrom'} />
            </div>
            <div style={{ width: '100%' }}>
              <div style={{ marginLeft: '2px' }}>Data zakończenia umowy</div>
              <DateInput name={'dumpsterContract_dateTo'} />
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              margin: '20px 0 10px',
            }}
          >
            <Button htmlType="submit" type="primary" loading={loading}>
              Dodaj umowę
            </Button>
          </div>
        </form>
      )}
    </Form>
  )

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        margin: '30px auto 10px',
      }}
    >
      <FormModal
        popupTitle={'Dodaj nową umowę'}
        formNode={formNode}
        buttonContent={'Dodaj nową umowę'}
        buttonType="primary"
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </div>
  )
}
