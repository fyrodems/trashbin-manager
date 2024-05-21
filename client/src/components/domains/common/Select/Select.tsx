import { Select as AntdSelect } from 'antd'
import classNames from 'classnames'
import { useField } from 'react-final-form'
import { useEffect } from 'react'
import { ValidationError } from '../ValidationError/ValidationError'
import styles from './Select.module.scss'

interface SelectProps {
  name: string
  label?: string
  className?: string
  placeholder?: string
  updateState?: (newState: any) => void
  selectOptions: Array<{ label: string; value: string }>
  defaultValue?: string
  value?: number
}

export const Select: React.FC<SelectProps> = ({
  name,
  label,
  className,
  placeholder,
  updateState,
  selectOptions,
  defaultValue,
  value,
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

  const onSearch = () => {}

  const filterOption = (
    input: string,
    option?: { label: string; value: string }
  ) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())

  useEffect(() => {
    if (typeof updateState === 'function') {
      updateState(Number(input.value))
    }
  }, [input.value, updateState])

  return (
    <div className={classNames(className, styles.container)}>
      <label>
        {label && <div className={styles.label}>{label}:</div>}
        <AntdSelect
          key={defaultValue}
          className={styles.select}
          showSearch
          placeholder={placeholder}
          status={error ? 'error' : undefined}
          optionFilterProp="children"
          onChange={input.onChange}
          onSearch={onSearch}
          filterOption={filterOption}
          options={selectOptions && selectOptions}
          defaultValue={defaultValue}
          value={
            selectOptions && selectOptions?.length > 0
              ? selectOptions[value - 1]
              : null
          }
        />
      </label>
      <ValidationError error={error} className={styles.validationError} />
    </div>
  )
}
