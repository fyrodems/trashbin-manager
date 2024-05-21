type ValidationFunction = (...args: any[]) => boolean

const useValidateForms = (): {
  [key: string]: ValidationFunction
} => {
  // czy pole nie jest puste
  const filledRegex: RegExp = /^(?!\s*$).+/

  // tylko litery (w tym polskie znaki), nie ma białych znaków na początku i końcu, a wewnątrz może zawierać myślniki
  const nameRegex: RegExp = /^(?!.*\s)[A-Za-zĄąĆćĘęŁłŃńÓóŚśŹźŻż-]+$/

  // 11 cyfr
  const peselRegex: RegExp = /^[0-9]{11}$/

  // 9 cyfr
  const phoneRegex: RegExp = /^[0-9]{9}$/

  // @, jeden znak, kropka, co najmniej dwa znaki
  const emailRegex: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

  // minimum 8 znaków, w tym 1 cyfra
  const passwordRegex: RegExp = /^(?=.*\d).{8,}$/

  const postCodeRegex: RegExp = /^\d{2}-\d{3}$/

  const checkValidity = (regex: RegExp, value: any): boolean =>
    regex.test(value)

  const checkFilling: ValidationFunction = (value): boolean =>
    checkValidity(filledRegex, value)

  const checkName: ValidationFunction = (name): boolean =>
    checkValidity(nameRegex, name)

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

  return {
    checkFilling,
    checkName,
    checkPESEL,
    checkPhone,
    checkEmail,
    checkPassword,
    checkRepeatedPassword,
    checkPostCode,
  }
}

export default useValidateForms
