export interface NewCardsVerificationValues {
  isVerified: boolean
  cardsBulkOrder_ID: number
  cardsNumbers: string[]
}

export interface OrderValues {
  isVerified: boolean
  cardsBulkOrder_ID: number
}

export interface OrderUpdateProps {
  open: boolean
  setOpen: (state: boolean) => void
  verify: (arg0: VeifyVariables) => Promise<any>
  order: NewOrderType
}

interface VeifyVariables {
  variables: VerifyProps
}

interface VerifyProps {
  props: VerifyPropsValues
}

interface VerifyPropsValues {
  isVerified: boolean
  cardsBulkOrder_ID: number
  cardsNumbers: string[]
}

export interface NewOrderType {
  cardsBulkOrder_ID: number
  cardsBulkOrder_numOfCards: number
  cardsBulkOrder_statusID: number
  cardsBulkOrder_orderDate: string
  user: {
    users_name: string
  }
}

export interface DataType {
  user: string
  numOfCards: number
  key: number
  status: number
  orderDate: string
  order: NewOrderType
}
