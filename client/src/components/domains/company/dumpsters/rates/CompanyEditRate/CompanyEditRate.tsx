import { useMutation } from '@apollo/client'
import { Form } from 'react-final-form'
import { App, Button } from 'antd'
import { useState } from 'react'
import { type RateUpdateProps, type RateValues } from './interfaces'
import { validateRateInfo } from './validate'
import { Input } from '@/components/domains/common/Input'
import { graphql } from '@/gql'
import { FormModal } from '@/components/domains/common/FormModal'

const editRateMutation = graphql(`
  mutation OfficialRatesEdit($props: OfficialRatesEditMutationProps!) {
    official {
      rates {
        edit(props: $props) {
          status {
            message
          }
        }
      }
    }
  }
`)

export const CompanyEditRate: React.FC<RateUpdateProps> = ({
  rateData,
  refetch,
}) => {
  const { message } = App.useApp()
  const [update, { loading }] = useMutation(editRateMutation)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  const initialValues: RateValues = {
    rate_value: rateData.rate_value,
    rate_typeID: rateData.rate_typeID,
  }

  const onSubmit = async (values: RateValues) => {
    const { data } = await update({
      variables: {
        props: {
          rate_ID: rateData.rate_ID,
          rate_typeID: rateData.rate_typeID,
          rate_value: values.rate_value,
        },
      },
    })
    setIsModalOpen(false)
    await refetch()

    const status = data?.official?.rates?.edit?.status.message
    await (status === 'Error'
      ? message.error('Wystąpił błąd')
      : message.success('Zapisano zmiany'))
  }

  const formNode = (
    <Form
      onSubmit={onSubmit}
      initialValues={initialValues}
      validate={validateRateInfo}
    >
      {({ handleSubmit }) => (
        <form id="rateData" onSubmit={handleSubmit}>
          <Input
            name="rate_value"
            placeholder="Stawka za wywóz"
            type="number"
          />
          <div
            style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}
          >
            <Button
              onClick={() => {
                setIsModalOpen(false)
              }}
            >
              Anuluj
            </Button>
            <Button
              form="rateData"
              htmlType="submit"
              type="primary"
              loading={loading}
            >
              Zmień stawkę
            </Button>
          </div>
        </form>
      )}
    </Form>
  )

  return (
    <>
      <FormModal
        popupTitle={'Edycja stawki'}
        formNode={formNode}
        buttonContent="Edytuj stawkę"
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </>
  )
}
