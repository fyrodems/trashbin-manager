import { Button, App, Divider } from 'antd'
import { Form } from 'react-final-form'
import { useMutation } from '@apollo/client'
import { useState } from 'react'
import { PlusOutlined } from '@ant-design/icons'
import {
  type SuperOfficialCreateOfficialProps,
  type UserInfo,
} from '../superOfficialInterfaces'
import { validateOfficialInfo } from './validateForm'
import { Input } from '@/components/domains/common/Input'
import { graphql } from '@/gql'
import { FormModal } from '@/components/domains/common/FormModal'

const createOfficialMutation = graphql(`
  mutation SuperOfficialOfficialAdd(
    $props: SuperOfficialNewOfficialAddMutationProps!
  ) {
    official {
      officials {
        add(props: $props) {
          status {
            message
            description
          }
        }
      }
    }
  }
`)

export const SuperOfficialCreateOfficial: React.FC<
  SuperOfficialCreateOfficialProps
> = ({ refetch }) => {
  const [create, { loading }] = useMutation(createOfficialMutation)
  const { message } = App.useApp()
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  const createOfficial = async (values: UserInfo) => {
    const { data } = await create({
      variables: {
        props: {
          users_name: values.users_name,
          users_login: values.users_login,
          users_phoneNumber: values.users_phoneNumber,
          users_identificationNumber: values.users_identificationNumber,
          users_password: values.users_password,
        },
      },
    })

    const status = data?.official?.officials?.add?.status

    if (status.message === 'Error') {
      await message.error(status.description ?? 'Wystąpił błąd')
    } else {
      await message.success('Udało się dodać urzędnika')
      setIsModalOpen(false)
    }

    await refetch()
  }

  const formNode = (
    <Form onSubmit={createOfficial} validate={validateOfficialInfo}>
      {({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <Divider orientation="left" orientationMargin={0}>
            Dane personalne
          </Divider>
          <Input name="users_name" placeholder="Imię i nazwisko" type="text" />
          <Input
            name="users_identificationNumber"
            placeholder="PESEL"
            type="text"
          />
          <Input
            name="users_phoneNumber"
            placeholder="Numer telefonu"
            type="text"
          />
          <Divider orientation="left" orientationMargin={0}>
            Dane do logowania
          </Divider>
          <Input name="users_login" placeholder="E-mail" type="text" />
          <Input name="users_password" placeholder="Hasło" type="password" />
          <Input name="confirm" placeholder="Powtórz hasło" type="password" />
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button htmlType="submit" type="primary" loading={loading}>
              Dodaj urzędnika do gminy
            </Button>
          </div>
        </form>
      )}
    </Form>
  )

  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
      <FormModal
        popupTitle={'Dodawanie urzędnika do gminy'}
        formNode={formNode}
        buttonType="primary"
        buttonContent={
          <span style={{ display: 'flex', gap: '8px' }}>
            <PlusOutlined />
            Dodaj urzędnika do gminy
          </span>
        }
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </div>
  )
}
