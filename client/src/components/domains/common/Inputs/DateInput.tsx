/* eslint-disable import/no-unassigned-import */
/* eslint-disable import/no-extraneous-dependencies */
import { DatePicker } from 'antd'
import type { DatePickerProps } from 'antd'
import { Field, useField } from 'react-final-form'
import classNames from 'classnames'
import { useState } from 'react'
import dayjs from 'dayjs'
import 'dayjs/locale/pl'
import pl_PL from 'antd/locale/pl_PL'
import { ValidationError } from '../ValidationError/ValidationError'
import type { InputProps } from './interface'
import styles from './Input.module.scss'

dayjs.locale('pl')

export const DateInput: React.FC<InputProps> = ({
  name,
  placeholder,
  className,
  showLabel = true,
}) => {
  const { meta } = useField<string>(name)
  const [selectedDate, setSelectedDate] = useState<string>('')

  const locale = {
    ...pl_PL.DatePicker,
    lang: {
      ...pl_PL.DatePicker.lang,
      monthFormat: 'MMMM',
    },
  }

  const showError = Boolean(meta.error) && meta.touched
  const showSubmitError =
    Boolean(meta.submitError) && !meta.dirtySinceLastSubmit

  const error: string[] | null = showSubmitError
    ? (meta.submitError as string[])
    : showError
    ? (meta.error as string[])
    : null

  return (
    <>
      <Field name={name}>
        {({ meta, input }) => {
          const onChange: DatePickerProps['onChange'] = (date, dateString) => {
            const convertedDate = dateString
              .split('-')
              .map((part, index, array) =>
                index === 0 ? array[1] : index === 1 ? array[0] : part
              )
              .join('-')

            setSelectedDate(convertedDate)
            input.onChange(convertedDate)
          }

          const foundError =
            Boolean(meta.error && meta.touched) ||
            Boolean(meta.submitError && !meta.dirtySinceLastSubmit)

          return (
            <div
              className={classNames(
                className,
                styles.container,
                styles.dateInput
              )}
            >
              <DatePicker
                locale={locale}
                name={name}
                className={styles.input}
                value={selectedDate ? dayjs(selectedDate) : null}
                format={'DD-MM-YYYY'}
                onChange={(date, dateString) => {
                  onChange?.(date, dateString)
                }}
                status={foundError ? 'error' : undefined}
                placeholder={showLabel ? 'dd-mm-yyyy' : placeholder?.toString()}
                showToday={false}
              />

              <ValidationError
                error={error}
                className={styles.validationError}
              />
            </div>
          )
        }}
      </Field>
    </>
  )
}
