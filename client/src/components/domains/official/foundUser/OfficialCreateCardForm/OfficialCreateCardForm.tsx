import { App, Button } from 'antd'
import { useMutation } from '@apollo/client'
import { CreditCardOutlined } from '@ant-design/icons'
import { useState } from 'react'
import { Form } from 'react-final-form'
import {
  type OfficialCreateCardFormProps,
  type CardInfo,
} from '../officialFoundUserInterfaces'
import { graphql } from '@/gql'
import { Input } from '@/components/domains/common/Input'
import { validationMessages } from '@/utils/validationMessages'
import { FormModal } from '@/components/domains/common/FormModal'

const officialCardsAddMutation = graphql(`
  mutation OfficialCardsAdd($props: OfficialCardsAddMutationProps!) {
    official {
      cards {
        add(props: $props) {
          status {
            message
          }
        }
      }
    }
  }
`)

export const OfficialCreateCardForm: React.FC<OfficialCreateCardFormProps> = ({
  userData,
  refetch,
}) => {
  const [add] = useMutation(officialCardsAddMutation)
  const { message } = App.useApp()
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  const addCard = async (values: CardInfo) => {
    if (userData.basicInfo) {
      const { data } = await add({
        variables: {
          props: {
            usersCards_userID: userData.basicInfo.users_ID,
            usersCards_statusID: 4,
            usersCards_number: values.usersCards_number,
            usersCards_numberPIN: values.usersCards_numberPIN || null,
          },
        },
      })

      const status = data?.official?.cards?.add?.status.message

      if (status === 'Error') {
        await message.error('Wystąpił błąd')
      } else {
        await message.success('Dodano nową kartę')
        setIsModalOpen(false)
      }
    } else {
      await message.error('Wystąpił błąd')
    }

    await refetch()
  }

  const validateCardInfo = (values: Partial<CardInfo>) => {
    const requiredError = validationMessages.required

    const errors: Partial<Record<keyof CardInfo, string>> = {
      usersCards_number: values.usersCards_number ? undefined : requiredError,
      usersCards_numberPIN: values.usersCards_numberPIN,
    }

    return errors
  }

  const formNode = (
    <Form onSubmit={addCard} validate={validateCardInfo}>
      {({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <Input
            name="usersCards_number"
            placeholder="Numer karty"
            type="text"
          />
          {/* <Input name="usersCards_numberPIN" placeholder="PIN karty" type='text' /> */}
          <div
            style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}
          >
            <Button
              onClick={() => {
                setIsModalOpen(false)
              }}
            >
              Anuluj
            </Button>
            <Button htmlType="submit" type="primary">
              Dodaj nową kartę
            </Button>
          </div>
        </form>
      )}
    </Form>
  )

  return (
    <>
      <FormModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        buttonContent={
          <span
            style={{
              display: 'flex',
              margin: '0 auto',
              gap: '6px',
              alignItems: 'center',
            }}
          >
            <CreditCardOutlined />
            Dodaj kartę
          </span>
        }
        formNode={formNode}
        popupTitle="Dodaj nową kartę"
      />
    </>
  )
}
