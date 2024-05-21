import { type UserInfo } from '../superOfficialInterfaces'
import { validationMessages } from '@/utils/validationMessages'
import useValidateForms from '@/components/domains/guest/hooks/useValidateForms'

export const validateOfficialInfo = (values: Partial<UserInfo>) => {
  const {
    required,
    wrongPESEL,
    wrongEmail,
    wrongPassword,
    passwordsDontMatch,
  } = validationMessages

  const { checkPESEL, checkEmail, checkPassword } = useValidateForms()

  const errors: Partial<Record<keyof UserInfo, string>> = {
    users_name: values.users_name ? undefined : required,
    users_identificationNumber: checkPESEL(values.users_identificationNumber)
      ? undefined
      : wrongPESEL,
    users_login: checkEmail(values.users_login) ? undefined : wrongEmail,
    users_password: values.users_password
      ? checkPassword(values.users_password)
        ? undefined
        : wrongPassword
      : required,
    confirm:
      values.users_password === values.confirm ? undefined : passwordsDontMatch,
  }

  return errors
}
