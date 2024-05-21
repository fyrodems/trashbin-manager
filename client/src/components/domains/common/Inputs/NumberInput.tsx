import { InputNumber } from 'antd'
import { Field } from 'react-final-form'
import styles from './Input.module.scss'
import { type InputProps } from './interface'
import { composeValidators, requiredField } from '@/utils/validations'

export const NumberInput: React.FC<InputProps> = ({
  name,
  placeholder,
  required,
  noFieldLevelErrorDisplay,
}) => {
  return (
    <Field
      name={name}
      validate={composeValidators(required ? requiredField : undefined)}
    >
      {({ input, meta }) => {
        const foundError =
          Boolean(meta.error && meta.touched) ||
          Boolean(meta.submitError && !meta.dirtySinceLastSubmit)
        return (
          <>
            <InputNumber
              className={styles.inputNumber}
              {...input}
              status={foundError ? 'error' : undefined}
              type="number"
              placeholder={''}
              autoComplete="off"
              required={false}
              controls={false}
              min={0}
              max={9}
            />

            {noFieldLevelErrorDisplay ? undefined : (
              <>
                {placeholder && (
                  <label className={styles.label}>{placeholder}</label>
                )}
                {meta.error && meta.touched && (
                  <div className={styles.status}>{meta.error}</div>
                )}
                {meta.submitError && !meta.dirtySinceLastSubmit && (
                  <div className={styles.status}>{meta.submitError}</div>
                )}
              </>
            )}
          </>
        )
      }}
    </Field>
  )
}
