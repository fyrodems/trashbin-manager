import { type ReactNode } from 'react'
import { Input as AntdInput, InputNumber as AntdNumberInput } from 'antd'
import { useField } from 'react-final-form'
import classNames from 'classnames'
import { ValidationError } from '../ValidationError/ValidationError'
import styles from './Input.module.scss'

interface InputProps {
  name: string
  type: 'number' | 'text' | 'password' | 'tel' | 'date'
  placeholder: string | ReactNode
  className?: string
  withGradient?: boolean
  autocompleteDisabled?: boolean
  showLabel?: boolean
}

export const Input: React.FC<InputProps> = ({
  name,
  type,
  placeholder,
  className,
  withGradient,
  autocompleteDisabled = true,
  showLabel = true,
}) => {
  const { input, meta } = useField<string>(name)

  const showError = Boolean(meta.error) && meta.touched
  const showSubmitError =
    Boolean(meta.submitError) && !meta.dirtySinceLastSubmit

  let error = null

  if (showSubmitError) {
    error = meta.submitError as string[]
  } else if (showError) {
    error = meta.error as string[]
  }

  return (
    <>
      <div
        className={classNames(
          className,
          styles.container,
          styles.gInput,
          withGradient ? styles.withGradient : ''
        )}
      >
        {type === 'number' ? (
          <AntdNumberInput
            className={classNames(styles.inputNumber)}
            status={error ? 'error' : undefined}
            onChange={input.onChange}
            value={input.value}
            name={name}
            type={type}
            placeholder={showLabel ? ' ' : placeholder?.toString()}
            autoComplete={autocompleteDisabled ? 'new-password' : undefined}
            required={false}
            controls={false}
          />
        ) : (
          <AntdInput
            className={styles.input}
            status={error ? 'error' : undefined}
            onChange={input.onChange}
            value={input.value}
            name={name}
            type={type}
            placeholder={showLabel ? ' ' : placeholder?.toString()}
            autoComplete={autocompleteDisabled ? 'new-password' : undefined}
            required={false}
          />
        )}
        {placeholder && showLabel && (
          <label className={styles.label}>{placeholder}</label>
        )}

        <ValidationError error={error} />
      </div>
    </>
  )
}
