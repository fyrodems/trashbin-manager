type ValidatorType = (value: any) => string | undefined

export const composeValidators =
  (...validators: Array<ValidatorType | undefined>) =>
  (value: any): string | undefined => {
    for (const validator of validators) {
      if (validator) {
        const error = validator(value)
        if (error) {
          return error
        }
      }
    }

    return undefined
  }

// Real time validators ----------------------------------------------
export const requiredField = (value: string | number) => {
  if (value === 0) return

  return value ? undefined : 'Pole wymagane'
}

export const validatePassword = (password: string) => {
  if (
    password.length < 8 ||
    !/[A-Z]/.test(password) ||
    !/[a-z]/.test(password) ||
    !/\d/.test(password) ||
    !/[!@#$%^&*(),.?":{}|<>]/.test(password)
  ) {
    return 'Hasło musi zawierać co najmniej 8 znaków, dużą i małą literę, cyfrę oraz znak specjalny.'
  }

  return undefined
}

export const tooLongLogin = (value: string) =>
  value.length > 254 ? 'Twój adres email jest zbyt długi' : undefined

// On form submit validators ---------------------
export const toShortLogin = (value: string) =>
  value.length < 4 ? 'Twój adres email jest zbyt krótki' : undefined

export const includeAtSignChar = (value: string) =>
  value.includes('@') ? undefined : 'Twój adres nie zawiera znaku @'
