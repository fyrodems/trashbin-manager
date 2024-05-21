import { Button } from 'antd'
import { Form } from 'react-final-form'
import styles from '../OfficialContracts.module.scss'
import { type OfficialEditContractFormProps } from '../contractsInterfaces'
import { validateContractInfo } from './formValidation'
import { Input } from '@/components/domains/common/Input'
import { FormModal } from '@/components/domains/common/FormModal'

export const OfficialEditContractForm: React.FC<
  OfficialEditContractFormProps
> = ({ onSubmit, initialValues, contract, isModalOpen, setIsModalOpen }) => {
  const formNode = (
    <Form
      onSubmit={onSubmit}
      initialValues={initialValues}
      validate={validateContractInfo}
    >
      {({ handleSubmit }) => (
        <form
          id={`userContractData-${contract.usersContract_ID}`}
          onSubmit={handleSubmit}
        >
          <Input
            name="usersContract_number"
            placeholder="Numer umowy"
            type="text"
          />
          <Input
            name="usersContract_dateFrom"
            placeholder="Obowiązuje od"
            type="date"
          />
          <Input
            name="usersContract_dateTo"
            placeholder="Obowiązuje do"
            type="date"
          />
          <Input
            name="usersContract_ratePaper"
            placeholder="Stawka papier"
            type="number"
          />
          <Input
            name="usersContract_ratePlastic"
            placeholder="Stawka tworzywa sztuczne"
            type="number"
          />
          <Input
            name="usersContract_rateGlass"
            placeholder="Stawka szkło"
            type="number"
          />
          <Input
            name="usersContract_rateBio"
            placeholder="Stawka bio"
            type="number"
          />
          <Input
            name="usersContract_rateMixed"
            placeholder="Stawka zmieszane"
            type="number"
          />
          <div className={styles.contractActions}>
            <Button
              onClick={() => {
                setIsModalOpen(false)
              }}
            >
              Anuluj
            </Button>
            <Button
              form={`userContractData-${contract.usersContract_ID}`}
              htmlType="submit"
              type="primary"
            >
              Zmień
            </Button>
          </div>
        </form>
      )}
    </Form>
  )

  return (
    <FormModal
      popupTitle={`Edycja umowy`}
      buttonContent={'Edytuj'}
      formNode={formNode}
      isModalOpen={isModalOpen}
      setIsModalOpen={setIsModalOpen}
    />
  )
}
