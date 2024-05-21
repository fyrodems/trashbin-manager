import { useState } from 'react'
import { Input as AntdInput } from 'antd'
import { Field, useField } from 'react-final-form'
import classNames from 'classnames'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import { ValidationError } from '../ValidationError/ValidationError'
import styles from './Input.module.scss'
import { type InputProps } from './interface'
import {
  composeValidators,
  requiredField,
  validatePassword,
} from '@/utils/validations'

export const PasswordInput: React.FC<InputProps> = ({
  name,
  placeholder,
  className,
  withGradient,
  showLabel = true,
}) => {
  const [showPassword, setShowPassword] = useState(false)
  const { meta } = useField<string>(name)

  const showError = Boolean(meta.error) && meta.touched
  const showSubmitError =
    Boolean(meta.submitError) && !meta.dirtySinceLastSubmit

  const error: string[] | null = showSubmitError
    ? (meta.submitError as string[])
    : showError
    ? (meta.error as string[])
    : null

  return (
    <Field
      name={name}
      validate={composeValidators(requiredField, validatePassword)}
    >
      {({ input, meta }) => {
        const foundError =
          Boolean(meta.error && meta.touched) ||
          Boolean(meta.submitError && !meta.dirtySinceLastSubmit)

        return (
          <div
            className={classNames(
              className,
              styles.container,
              styles.gInput,
              withGradient ? styles.withGradient : '',
              styles.passwordInput
            )}
          >
            <AntdInput
              className={styles.input}
              {...input}
              name={name}
              status={foundError ? 'error' : undefined}
              type={showPassword ? 'text' : 'password'}
              placeholder={showLabel ? ' ' : placeholder?.toString()}
              autoComplete="off"
              required={false}
            />
            {placeholder && showLabel && (
              <label className={styles.label}>{placeholder}</label>
            )}
            <span
              onClick={() => {
                setShowPassword((prev) => !prev)
              }}
            >
              {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
            </span>
            <ValidationError error={error} className={styles.validationError} />
          </div>
        )
      }}
    </Field>
  )
}
