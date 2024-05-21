type ValidationFunction = (...args: any[]) => boolean

const useValidateForms = (): Record<string, ValidationFunction> => {
  // 11 cyfr
  const peselRegex = /^\d{11}$/

  // 9 cyfr
  const phoneRegex = /^\d{9}$/

  // @, jeden znak, kropka, co najmniej dwa znaki
  const emailRegex = /^[\w.%+-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/

  // minimum 8 znaków, w tym 1 cyfra
  const passwordRegex = /^(?=.*\d).{8,}$/

  const postCodeRegex = /^\d{2}-\d{3}$/

  const checkValidity = (regex: RegExp, value: any): boolean =>
    regex.test(value)

  const checkPESEL: ValidationFunction = (pesel): boolean =>
    checkValidity(peselRegex, pesel)

  const checkPhone: ValidationFunction = (phone): boolean =>
    checkValidity(phoneRegex, phone)

  const checkEmail: ValidationFunction = (email): boolean =>
    checkValidity(emailRegex, email)

  const checkPassword: ValidationFunction = (password): boolean =>
    checkValidity(passwordRegex, password)

  const checkRepeatedPassword: ValidationFunction = (
    password,
    repeatedPassword
  ): boolean => password === repeatedPassword

  const checkPostCode: ValidationFunction = (postcode): boolean =>
    checkValidity(postCodeRegex, postcode)

  const checkDateOrder: ValidationFunction = (
    startDate: string,
    endDate: string
  ): boolean => {
    if (!startDate || !endDate) return false
    const [startMonth, startDay, startYear] = startDate.split('-').map(Number)
    const [endMonth, endDay, endYear] = endDate.split('-').map(Number)

    const startDateObj = new Date(startYear, startMonth - 1, startDay)
    const endDateObj = new Date(endYear, endMonth - 1, endDay)

    return startDateObj < endDateObj
  }

  return {
    checkPESEL,
    checkPhone,
    checkEmail,
    checkPassword,
    checkRepeatedPassword,
    checkPostCode,
    checkDateOrder,
  }
}

export default useValidateForms
