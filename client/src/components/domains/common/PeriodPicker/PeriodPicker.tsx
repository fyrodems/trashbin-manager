import React from 'react'
import { Button } from 'antd'
import { Form } from 'react-final-form'
import { type FetchDateType } from '../../user/statistics/interfaces/StatisticInterfaces'
import { DateInput } from '../Inputs/DateInput'
import useValidateForms from '../../user/hooks/useValidateForms'
import styles from './PeriodPicker.module.scss'
import { validationMessages } from '@/utils/validationMessages'

export interface SearchFormValues {
  startDate?: string
  endDate?: string
}

interface PeriodPickerProps {
  setDate: (date: FetchDateType) => void
  loading: boolean
}

const validate = (values: SearchFormValues) => {
  const { required, wrongDateOrder } = validationMessages

  const { checkDateOrder } = useValidateForms()

  const errors: Partial<Record<keyof SearchFormValues, string>> = {
    startDate: values.startDate ? undefined : required,
    endDate: values.endDate
      ? checkDateOrder(values.startDate, values.endDate)
        ? undefined
        : wrongDateOrder
      : required,
  }
  return errors
}

export const PeriodPicker: React.FC<PeriodPickerProps> = ({
  setDate,
  loading,
}) => {
  const handleSearch = ({ startDate, endDate }: SearchFormValues) => {
    if (!startDate || !endDate) return

    setDate({ startDate, endDate })
  }

  return (
    <Form onSubmit={handleSearch} validate={validate}>
      {({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <div className={styles.inputsWrapper}>
            <div>
              <div className={styles.dateInputLabel}>Od</div>
              <DateInput name={'startDate'} placeholder={'Od'} />
            </div>
            <div>
              <div className={styles.dateInputLabel}>Do</div>
              <DateInput name={'endDate'} placeholder={'Do'} />
            </div>
          </div>
          <div className={styles.buttonWrapper}>
            <Button type="primary" htmlType="submit" loading={loading}>
              Szukaj
            </Button>
          </div>
        </form>
      )}
    </Form>
  )
}
