import { Select } from 'antd'
import classNames from 'classnames'
import { useField } from 'react-final-form'
import { ValidationError } from '../ValidationError/ValidationError'
import styles from './SelectMultiple.module.scss'

interface SelectMultipleProps {
  name: string
  label?: string
  className?: string
  placeholder?: string
  onClick?: (e: MouseEvent) => void
  selectOptions?: Array<{ label: string; value: string }>
}

export const SelectMultiple: React.FC<SelectMultipleProps> = ({
  name,
  label,
  className,
  placeholder,
  selectOptions,
}) => {
  const { input, meta } = useField<string>(name)

  const showError = Boolean(meta.error) && meta.touched
  const showSubmitError =
    Boolean(meta.submitError) && !meta.dirtySinceLastSubmit

  const error: string[] | null = showSubmitError
    ? (meta.submitError as string[])
    : showError
    ? (meta.error as string[])
    : null

  const filterOption = (
    input: string,
    option?: { label: string; value: string }
  ) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())

  return (
    <div className={classNames(className, styles.container)}>
      <label className={classNames(className, styles.container)}>
        {label && <div className={styles.label}>{label}:</div>}
        <Select
          className={styles.select}
          showSearch
          placeholder={placeholder}
          status={error ? 'error' : undefined}
          optionFilterProp="children"
          onChange={input.onChange}
          onSearch={() => {}}
          filterOption={filterOption}
          options={selectOptions ?? []}
          mode="multiple"
          allowClear
        />
      </label>

      <ValidationError error={error} className={styles.validationError} />
    </div>
  )
}
