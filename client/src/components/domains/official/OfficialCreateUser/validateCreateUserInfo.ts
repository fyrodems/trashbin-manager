import useValidateForms from '../../guest/hooks/useValidateForms'
import { type UserInfo } from './interfaces'
import { validationMessages } from '@/utils/validationMessages'

export const validateUserInfo = (values: Partial<UserInfo>) => {
  const {
    required,
    wrongPESEL,
    wrongPhoneNumber,
    wrongEmail,
    wrongPassword,
    passwordsDontMatch,
    wrongPostCode,
  } = validationMessages

  const { checkPESEL, checkPhone, checkEmail, checkPassword, checkPostCode } =
    useValidateForms()

  const errors: Partial<Record<keyof UserInfo, string>> = {
    users_name: values.users_name ? undefined : required,
    users_identificationNumber:
      values.users_identificationNumber &&
      checkPESEL(values.users_identificationNumber)
        ? undefined
        : wrongPESEL || required,
    users_phoneNumber: checkPhone(values.users_phoneNumber)
      ? undefined
      : wrongPhoneNumber,
    users_login: checkEmail(values.users_login) ? undefined : wrongEmail,
    users_password: values.users_password
      ? checkPassword(values.users_password)
        ? undefined
        : wrongPassword
      : required,
    confirm:
      values.users_password === values.confirm ? undefined : passwordsDontMatch,
    usersAddress_street: values.usersAddress_street ? undefined : required,
    usersAddress_houseNumber: values.usersAddress_houseNumber
      ? undefined
      : required,
    usersAddress_postCode: checkPostCode(values.usersAddress_postCode)
      ? undefined
      : wrongPostCode,
    usersAddress_city: values.usersAddress_city ? undefined : required,
    usersAddress_communityID: values.usersAddress_communityID
      ? undefined
      : required,
    voivodeship: values.voivodeship ? undefined : required,
    municipality: values.municipality ? undefined : required,
  }

  return errors
}
