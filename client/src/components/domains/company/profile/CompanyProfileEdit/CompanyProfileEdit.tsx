import { useMutation } from '@apollo/client'
import { useState } from 'react'
import { Form, type FormRenderProps } from 'react-final-form'
import { App, Button } from 'antd'
import { graphql } from '@/gql'
import { FormModal } from '@/components/domains/common/FormModal'
import { Input } from '@/components/domains/common/Input'
import { useAuth } from '@/auth/authProvider'
import { validationMessages } from '@/utils/validationMessages'
import useValidateForms from '@/components/domains/guest/hooks/useValidateForms'

const editCompanyProfileInfo = graphql(`
  mutation CompanyProfileUpdate($props: CompanyInfoProfileMutationProps!) {
    company {
      info {
        profile(props: $props) {
          status {
            message
          }
        }
      }
    }
  }
`)

interface FormValues {
  name: string
  email: string
  phoneNumber: string
}

export const CompanyProfileEdit: React.FC = () => {
  const [editCompanyProfile] = useMutation(editCompanyProfileInfo)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const { message } = App.useApp()
  const { user, refetchUserData } = useAuth()

  const initialValues: FormValues = {
    name: user?.basicInfo.users_name ?? '',
    email: user?.basicInfo.users_login ?? '',
    phoneNumber: user?.basicInfo.users_phoneNumber ?? '',
  }

  const validateForm = (values: FormValues) => {
    const { required, wrongEmail, wrongPhoneNumber } = validationMessages
    const { checkEmail, checkPhone } = useValidateForms()

    const errors = {
      name: values.name ? undefined : required,
      email: values.email
        ? checkEmail(values.email)
          ? undefined
          : wrongEmail
        : required,
      phoneNumber: values.phoneNumber
        ? checkPhone(values.phoneNumber)
          ? undefined
          : wrongPhoneNumber
        : required,
    }

    return errors
  }

  const onSubmit = async (values: FormValues) => {
    const { data } = await editCompanyProfile({
      variables: {
        props: {
          name: values.name,
          email: values.email,
          phoneNumber: values.phoneNumber,
        },
      },
    })

    setIsModalOpen(false)

    const status = data?.company?.info?.profile?.status?.message
    await (status === 'Success'
      ? message.success('Zaktualizowano informacje')
      : message.error('Wystąpił błąd'))
  }

  const formNode = (
    <Form
      onSubmit={onSubmit}
      initialValues={initialValues}
      validate={validateForm}
      render={({ handleSubmit }: FormRenderProps<FormValues>) => (
        <form onSubmit={handleSubmit}>
          <Input name="name" placeholder="Nazwa" type="text" />
          <Input name="email" placeholder="E-mail" type="text" />
          <Input name="phoneNumber" placeholder="Numer telefonu" type="text" />
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
            <Button type="primary" htmlType="submit" onClick={refetchUserData}>
              Potwierdź zmianę
            </Button>
          </div>
        </form>
      )}
    />
  )

  return (
    <FormModal
      popupTitle={'Edycja danych'}
      formNode={formNode}
      buttonContent={'Edycja danych'}
      isModalOpen={isModalOpen}
      setIsModalOpen={setIsModalOpen}
      isOfficialEditUserAddress={true}
    />
  )
}
