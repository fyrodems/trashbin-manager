import { App, Button } from 'antd'
import { useMutation } from '@apollo/client'
import { Form } from 'react-final-form'
import { useState } from 'react'
import { type DumpsterRate, type CompanyAddRateProps } from './interfaces'
import { type RateInfoType } from '@/gql/graphql'
import { graphql } from '@/gql'
import { Input } from '@/components/domains/common/Input'
import { validationMessages } from '@/utils/validationMessages'
import { FormModal } from '@/components/domains/common/FormModal'
import { Select } from '@/components/domains/common/Select'
import { filterRatesTypes, getGarbageTypeIds } from '@/utils/rates'

const officialRatesAddMutation = graphql(`
  mutation OfficialRatesAdd($props: OfficialRatesAddMutationProps!) {
    official {
      rates {
        add(props: $props) {
          status {
            message
          }
        }
      }
    }
  }
`)

export const CompanyAddRate: React.FC<CompanyAddRateProps> = ({
  contractID,
  rates,
  refetch,
}) => {
  const [add, { loading }] = useMutation(officialRatesAddMutation)
  const { message } = App.useApp()
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  const addRate = async (values: DumpsterRate) => {
    const { data } = await add({
      variables: {
        props: {
          rate_value: values.rate_value,
          rate_typeID: Number(values.rate_typeID),
          rate_dumpsterContractID: contractID,
        },
      },
    })

    await refetch()
    setIsModalOpen(false)

    const status = data?.official?.rates?.add?.status.message

    await (status === 'Error'
      ? message.error('Wystąpił błąd')
      : message.success('Dodano stawkę'))
  }

  const validateRateInfo = (values: Partial<RateInfoType>) => {
    const requiredError = validationMessages.required

    const errors: Partial<Record<keyof RateInfoType, string>> = {
      rate_value: values.rate_value ? undefined : requiredError,
      rate_typeID: values.rate_typeID ? undefined : requiredError,
    }

    return errors
  }

  const allSelectOptions = [
    { label: 'Papier', value: '11' },
    { label: 'Bioodpady', value: '12' },
    { label: 'Metale i tworzywa sztuczne', value: '13' },
    { label: 'Szkło', value: '14' },
    { label: 'Zmieszane', value: '15' },
  ]

  let selectOptions = allSelectOptions

  if (rates) {
    const alreadyExistingRates: number[] = getGarbageTypeIds(rates)
    selectOptions = filterRatesTypes(allSelectOptions, alreadyExistingRates)
  }

  const formNode = (
    <Form onSubmit={addRate} validate={validateRateInfo}>
      {({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <Select
            name="rate_typeID"
            placeholder="Rodzaj odpadu"
            selectOptions={selectOptions || allSelectOptions}
            value={420}
          />
          <Input
            name="rate_value"
            placeholder="Stawka za wywóz"
            type="number"
          />
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              margin: '10px 0 10px',
            }}
          >
            <Button htmlType="submit" type="primary" loading={loading}>
              Dodaj stawkę do umowy
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
        margin: '30px 0 10px',
      }}
    >
      {selectOptions.length === 0 ? null : (
        <FormModal
          popupTitle={'Dodaj nową stawkę'}
          formNode={formNode}
          buttonContent="Dodaj nową stawkę"
          buttonType="primary"
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
      )}
    </div>
  )
}
