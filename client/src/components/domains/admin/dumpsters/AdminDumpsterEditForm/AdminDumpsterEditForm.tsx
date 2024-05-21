import { Button, Modal } from 'antd'
import { Form } from 'react-final-form'
import { useMutation } from '@apollo/client'
import {
  type AdminDumpsterEditFormProps,
  type AdminEditDumpsterValues,
} from '../adminDumpstersInterfaces'
import { Input } from '@/components/domains/common/Input'
import { graphql } from '@/gql'

const editDumpsterMutation = graphql(`
  mutation AdminDumpstersEdit($props: AdminDumpstersEditMutationProps!) {
    admin {
      dumpsters {
        edit(props: $props) {
          status {
            message
          }
        }
      }
    }
  }
`)

export const AdminDumpsterEditForm: React.FC<AdminDumpsterEditFormProps> = ({
  open,
  setOpen,
  dumpsterData,
}) => {
  const [update, { loading }] = useMutation(editDumpsterMutation)
  const initialValues: AdminEditDumpsterValues = {
    dumpster_name: dumpsterData.dumpster_name,
    dumpster_description: dumpsterData.dumpster_description,
    dumpster_street: dumpsterData.dumpster_street,
    dumpster_city: dumpsterData.dumpster_city,
    dumpster_postCode: dumpsterData.dumpster_postCode,
    dumpster_communityID: dumpsterData.dumpster_communityID,
    dumpster_houseNumbers: dumpsterData.dumpster_houseNumbers,
  }

  const onSubmit = async (values: AdminEditDumpsterValues) => {
    await update({
      variables: {
        props: {
          ...values,
          dumpster_ID: dumpsterData.dumpster_ID,
          dumpster_communityID: values.dumpster_communityID,
          dumpster_hasError: dumpsterData.dumpster_hasError,
        },
      },
    })

    setOpen(false)
  }

  return (
    <Modal
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
            form="adminDumpsterData"
            htmlType="submit"
            type="primary"
            loading={loading}
          >
            Zedytuj altanę
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
          <form id="adminDumpsterData" onSubmit={handleSubmit}>
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
          </form>
        )}
      </Form>
    </Modal>
  )
}
