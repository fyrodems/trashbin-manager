import { Input as AntdInput } from 'antd'
import { Field, useField } from 'react-final-form'
import classNames from 'classnames'
import { ValidationError } from '../ValidationError/ValidationError'
import styles from './Input.module.scss'
import { type InputProps } from './interface'
import {
  composeValidators,
  tooLongLogin,
  requiredField,
} from '@/utils/validations'

export const TextInput: React.FC<InputProps> = ({
  name,
  placeholder,
  withGradient,
  required,
}) => {
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
      validate={composeValidators(
        required ? requiredField : undefined,
        tooLongLogin
      )}
    >
      {({ input, meta }) => {
        const foundError =
          Boolean(meta.error && meta.touched) ||
          Boolean(meta.submitError && !meta.dirtySinceLastSubmit)

        return (
          <>
            <div
              className={classNames(
                styles.container,
                styles.gInput,
                withGradient ? styles.withGradient : ''
              )}
            >
              <AntdInput
                className={styles.input}
                {...input}
                status={foundError ? 'error' : undefined}
                type="text"
                placeholder={''}
                autoComplete="off"
                required={false}
              />

              {placeholder && (
                <label className={styles.label}>{placeholder}</label>
              )}
              <ValidationError
                error={error}
                className={styles.validationError}
              />
            </div>
          </>
        )
      }}
    </Field>
  )
}
