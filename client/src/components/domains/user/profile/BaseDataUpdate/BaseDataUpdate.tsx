import { useMutation } from '@apollo/client'
import { Button, Modal, App } from 'antd'
import { Form } from 'react-final-form'
import {
  type BaseDataUpdateProps,
  type BaseDataValues,
} from '../userProfileInterfaces'
import useValidateForms from '../../hooks/useValidateForms'
import styles from './BaseDataUpdate.module.scss'
import { useAuth } from '@/auth/authProvider'
import { Input } from '@/components/domains/common/Input'
import { graphql } from '@/gql'
import { validationMessages } from '@/utils/validationMessages'

const baseDataUpdateMutation = graphql(`
  mutation BaseDataUpdate($props: UserInfoProfileMutationProps!) {
    user {
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

const contactUpdateMutation = graphql(`
  mutation ContactUpdate($props: UserInfoContactsMutationProps!) {
    user {
      info {
        contacts(props: $props) {
          status {
            message
          }
        }
      }
    }
  }
`)

interface FormValues {
  users_name: string
  users_login: string
  users_phoneNumber: string
}

export const BaseDataUpdate: React.FC<BaseDataUpdateProps> = ({
  open,
  setOpen,
}) => {
  const [updateBaseData, { loading: baseDataLoading }] = useMutation(
    baseDataUpdateMutation
  )
  const [updateContactData, { loading: contactDataLoading }] = useMutation(
    contactUpdateMutation
  )
  const { user, refetchUserData } = useAuth()
  const { message } = App.useApp()

  const initialValues = {
    name: user!.basicInfo?.users_name,
    user_ID: user!.basicInfo?.users_ID,
    users_login: user!.basicInfo?.users_login ?? '',
    users_phoneNumber: user!.basicInfo?.users_phoneNumber,
  }

  const onSubmit = async (values: BaseDataValues) => {
    if (values.users_name !== initialValues.name) {
      await updateBaseData({
        variables: {
          props: {
            name: values.users_name,
            user_ID: values.user_ID,
          },
        },
      })
      await message.success('Wysłano wniosek o zmianę danych podstawowych')
    }

    if (
      values.users_login !== initialValues.users_login ||
      values.users_phoneNumber !== initialValues.users_phoneNumber
    ) {
      await updateContactData({
        variables: {
          props: {
            users_login: values.users_login,
            users_phoneNumber: values.users_phoneNumber ?? '',
          },
        },
      })

      await message.success('Zmieniono dane kontaktowe')
    }

    await refetchUserData()
    setOpen(false)
  }

  const validateForm = (values: FormValues) => {
    const { required, wrongEmail, wrongPhoneNumber } = validationMessages
    const { checkEmail, checkPhone } = useValidateForms()

    const errors = {
      users_name: values.users_name ? undefined : required,
      users_phoneNumber: values.users_phoneNumber
        ? checkPhone(values.users_phoneNumber)
          ? undefined
          : wrongPhoneNumber
        : required,
      users_login: values.users_login
        ? checkEmail(values.users_login)
          ? undefined
          : wrongEmail
        : required,
    }

    return errors
  }

  return (
    <Modal
      className={styles.editModal}
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
            form="baseData"
            htmlType="submit"
            type="primary"
            loading={baseDataLoading || contactDataLoading}
          >
            Zmień dane
          </Button>
        </>
      }
      open={open}
      onCancel={() => {
        setOpen(false)
      }}
    >
      <Form
        onSubmit={onSubmit}
        initialValues={initialValues}
        validate={validateForm}
      >
        {({ handleSubmit }) => (
          <form className={styles.form} id="baseData" onSubmit={handleSubmit}>
            <Input
              type="text"
              name="users_name"
              placeholder="Imię i Nazwisko"
            />
            <Input type="text" name="users_login" placeholder="Email" />
            <Input type="text" name="users_phoneNumber" placeholder="Telefon" />
          </form>
        )}
      </Form>
    </Modal>
  )
}
