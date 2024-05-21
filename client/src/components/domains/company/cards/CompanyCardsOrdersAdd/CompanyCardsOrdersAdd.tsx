import { Form } from 'react-final-form'
import { useState } from 'react'
import { App, Button } from 'antd'
import { useMutation } from '@apollo/client'
import { PlusOutlined } from '@ant-design/icons'
import { type CardsInfo } from '../interfaces'
import { FormModal } from '@/components/domains/common/FormModal'
import { Input } from '@/components/domains/common/Input'
import { useAuth } from '@/auth/authProvider'
import { graphql } from '@/gql'
import { validationMessages } from '@/utils/validationMessages'

const companyCardsAddMutation = graphql(`
  mutation CompanyCardsAdd($props: CompanyCardsAddMutationProps!) {
    company {
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

export const CompanyCardsOrdersAdd: React.FC = () => {
  const { user } = useAuth()
  const { message } = App.useApp()
  const [add, { loading }] = useMutation(companyCardsAddMutation)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  const addCards = async (values: CardsInfo) => {
    if (user?.basicInfo.users_ID) {
      const { data } = await add({
        variables: {
          props: {
            userID: user?.basicInfo.users_ID,
            numOfCards: Number(values.numOfCards),
          },
        },
      })

      const status = data?.company?.cards?.add?.status.message

      await (status === 'Success'
        ? message.success('Złożono wniosek')
        : message.warning('Masz już oczekujące zamówienie'))
    }
  }

  const validateForm = (values: CardsInfo) => {
    const { required } = validationMessages

    const errors = {
      numOfCards: values.numOfCards ? undefined : required,
    }

    return errors
  }

  const formNode = (
    <Form onSubmit={addCards} validate={validateForm}>
      {({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <Input name="numOfCards" placeholder="Liczba kart" type="number" />
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button htmlType="submit" type="primary" loading={loading}>
              Złóż wniosek
            </Button>
          </div>
        </form>
      )}
    </Form>
  )
  return (
    <FormModal
      popupTitle={'Wniosek o nowe karty'}
      formNode={formNode}
      buttonContent={
        <span style={{ display: 'flex', gap: '8px' }}>
          <PlusOutlined />
          Złóż wniosek o nowe karty
        </span>
      }
      buttonType="primary"
      isModalOpen={isModalOpen}
      setIsModalOpen={setIsModalOpen}
    />
  )
}
