import { Button, App } from 'antd'
import { Form } from 'react-final-form'
import { useMutation } from '@apollo/client'
import { PlusOutlined } from '@ant-design/icons'
import {
  type NewDumpsterValues,
  type AdminDumpsterCreateFormProps,
} from '../adminDumpstersInterfaces'
import { Input } from '@/components/domains/common/Input'
import { validationMessages } from '@/utils/validationMessages'
import { graphql } from '@/gql'
import { FormModal } from '@/components/domains/common/FormModal'

const createDumpsterMutation = graphql(`
  mutation AdminDumpstersAdd($props: AdminDumpstersAddMutationProps!) {
    admin {
      dumpsters {
        add(props: $props) {
          status {
            message
          }
        }
      }
    }
  }
`)

export const AdminDumpsterCreateForm: React.FC<
  AdminDumpsterCreateFormProps
> = ({ isModalOpen, setIsModalOpen }) => {
  const [create, { loading }] = useMutation(createDumpsterMutation)
  const { message } = App.useApp()

  const validateDumpsterInfo = (values: NewDumpsterValues) => {
    const requiredError = validationMessages.required

    const errors: Partial<Record<keyof NewDumpsterValues, string>> = {
      dumpster_name: values.dumpster_name ? undefined : requiredError,
      dumpster_street: values.dumpster_street ? undefined : requiredError,
      dumpster_city: values.dumpster_city ? undefined : requiredError,
      dumpster_postCode: values.dumpster_postCode ? undefined : requiredError,
      dumpster_communityID: values.dumpster_communityID
        ? undefined
        : requiredError,
      dumpster_houseNumbers: values.dumpster_houseNumbers
        ? undefined
        : requiredError,
      paper_binsNumber: values.paper_binsNumber ? undefined : requiredError,
      bio_binsNumber: values.bio_binsNumber ? undefined : requiredError,
      plastic_binsNumber: values.plastic_binsNumber ? undefined : requiredError,
      glass_binsNumber: values.glass_binsNumber ? undefined : requiredError,
      mixed_binsNumber: values.mixed_binsNumber ? undefined : requiredError,
    }
    return errors
  }

  const createDumpster = async (values: NewDumpsterValues) => {
    const { data } = await create({
      variables: {
        props: {
          dumpster_name: values.dumpster_name,
          dumpster_description: values.dumpster_description,
          dumpster_street: values.dumpster_street,
          dumpster_city: values.dumpster_city,
          dumpster_postCode: values.dumpster_postCode,
          dumpster_communityID: values.dumpster_communityID,
          dumpster_houseNumbers: values.dumpster_houseNumbers,
          paper_binsNumber: values.paper_binsNumber,
          bio_binsNumber: values.bio_binsNumber,
          plastic_binsNumber: values.plastic_binsNumber,
          glass_binsNumber: values.glass_binsNumber,
          mixed_binsNumber: values.mixed_binsNumber,
        },
      },
    })

    const status = data?.admin?.dumpsters?.add?.status

    if (status?.message === 'Error') {
      await message.error('Wystąpił błąd')
      return
    }

    await message.success('Udało się dodać altanę!')
  }

  const formNode = (
    <Form onSubmit={createDumpster} validate={validateDumpsterInfo}>
      {({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <div>
            <Input
              name="dumpster_name"
              placeholder="dumpster_name"
              type="text"
            />
            <Input
              name="dumpster_description"
              placeholder="dumpster_description"
              type="text"
            />
            <Input
              name="dumpster_street"
              placeholder="dumpster_street"
              type="text"
            />
            <Input
              name="dumpster_city"
              placeholder="dumpster_city"
              type="text"
            />
            <Input
              name="dumpster_postCode"
              placeholder="dumpster_postCode"
              type="text"
            />
            <Input
              name="dumpster_communityID"
              placeholder="dumpster_communityID"
              type="number"
            />
            <Input
              name="dumpster_houseNumbers"
              placeholder="dumpster_houseNumbers"
              type="text"
            />
            <Input
              name="paper_binsNumber"
              placeholder="paper_binsNumber"
              type="number"
            />
            <Input
              name="bio_binsNumber"
              placeholder="bio_binsNumber"
              type="number"
            />
            <Input
              name="plastic_binsNumber"
              placeholder="plastic_binsNumber"
              type="number"
            />
            <Input
              name="glass_binsNumber"
              placeholder="glass_binsNumber"
              type="number"
            />
            <Input
              name="mixed_binsNumber"
              placeholder="mixed_binsNumber"
              type="number"
            />
          </div>
          <Button htmlType="submit" type="primary" loading={loading}>
            Dodaj altanę
          </Button>
        </form>
      )}
    </Form>
  )

  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
      <FormModal
        popupTitle={'Tworzenie konta'}
        formNode={formNode}
        buttonType="primary"
        buttonContent={
          <span style={{ display: 'flex', gap: '8px' }}>
            <PlusOutlined />
            Dodaj altanę
          </span>
        }
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </div>
  )
}
