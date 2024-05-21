import { useMutation } from '@apollo/client'
import {
  App,
  Button,
  Divider,
  Modal,
  Radio,
  type RadioChangeEvent,
  Space,
} from 'antd'
import { Form } from 'react-final-form'
import { useState } from 'react'
import { type CardUpdateProps, type CardValues } from '../cardsInterfaces'
import styles from '../OfficialCards.module.scss'
import { Input } from '@/components/domains/common/Input'
import { graphql } from '@/gql'

const editCardMutation = graphql(`
  mutation OfficialCardsEdit($props: OfficialCardsEditMutationProps!) {
    official {
      cards {
        edit(props: $props) {
          status {
            message
          }
        }
      }
    }
  }
`)

export const OfficialEditCardForm: React.FC<CardUpdateProps> = ({
  open,
  setOpen,
  cardData,
  refetch,
}) => {
  const [update, { loading }] = useMutation(editCardMutation)
  const [cardStatus, setCardStatus] = useState(cardData?.usersCards_statusID)
  const { message } = App.useApp()

  const onChange = (e: RadioChangeEvent) => {
    setCardStatus(e.target.value as number)
  }

  const initialValues: CardValues = {
    usersCards_ID: cardData?.usersCards_ID,
    usersCards_statusID: Number(cardData?.usersCards_statusID),
    usersCards_number: cardData?.usersCards_number,
    usersCards_numberPIN: cardData?.usersCards_numberPIN,
  }

  const onSubmit = async (values: CardValues) => {
    const { data } = await update({
      variables: {
        props: {
          ...values,
          usersCards_statusID: cardStatus,
        },
      },
    })

    const status = data?.official?.cards?.edit?.status

    if (status?.message === 'Error') {
      await message.error('Wystąpił błąd')
    } else {
      await message.success('Zmiany zostały zapisane')
      setOpen(false)
    }

    await refetch()
  }

  return (
    <Modal
      className={styles.form}
      title="Edycja karty dostępu"
      footer={
        <>
          <Button
            onClick={() => {
              setOpen(false)
            }}
          >
            Anuluj
          </Button>
          <Button
            form="cardData"
            htmlType="submit"
            type="primary"
            loading={loading}
          >
            Zmień
          </Button>
        </>
      }
      open={open}
      onCancel={() => {
        setOpen(false)
      }}
    >
      <Form onSubmit={onSubmit} initialValues={initialValues}>
        {({ handleSubmit }) => (
          <form id="cardData" onSubmit={handleSubmit}>
            <Divider
              plain
              orientation="left"
              orientationMargin={0}
              style={{ margin: '10px !important' }}
            >
              Status karty dostępu
            </Divider>

            <Radio.Group onChange={onChange} value={cardStatus}>
              <Space direction="vertical">
                <Radio value={4}>Aktywna</Radio>
                <Radio value={5}>Zablokowana</Radio>
              </Space>
            </Radio.Group>
            <div style={{ height: '20px' }} />
            <Input
              name="usersCards_number"
              placeholder="Numer karty"
              type="text"
            />
            {/* <Input name="usersCards_numberPIN" label="Numer PIN" /> */}
          </form>
        )}
      </Form>
    </Modal>
  )
}
