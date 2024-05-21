export interface InputProps {
  name: string
  type?: 'number' | 'text' | 'password' | 'tel' | 'date'
  placeholder?: string | React.ReactNode
  className?: string
  withGradient?: boolean
  autocompleteDisabled?: boolean
  required?: boolean
  noFieldLevelErrorDisplay?: boolean
  showLabel?: boolean
}
