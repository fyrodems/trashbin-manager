import { type TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core'
import { type CardsBulkOrderType } from '@/gql/commonTypes'

export interface FindCompanyCardsQuery {
  __typename?: 'Query'
  company?: {
    __typename?: 'CompanyQuery'
    cards?: {
      __typename?: 'CompanyCardsQuery'
      get?: CardsBulkOrderType[] | null
    } | null
  } | null
}

export const CompanyCardsGetDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'CompanyCardsGet' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'company' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'cards' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'get' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: {
                                kind: 'Name',
                                value: 'cardsBulkOrder_ID',
                              },
                            },
                            {
                              kind: 'Field',
                              name: {
                                kind: 'Name',
                                value: 'cardsBulkOrder_userID',
                              },
                            },
                            {
                              kind: 'Field',
                              name: {
                                kind: 'Name',
                                value: 'cardsBulkOrder_numOfCards',
                              },
                            },
                            {
                              kind: 'Field',
                              name: {
                                kind: 'Name',
                                value: 'cardsBulkOrder_statusID',
                              },
                            },
                            {
                              kind: 'Field',
                              name: {
                                kind: 'Name',
                                value: 'cardsBulkOrder_orderDate',
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<FindCompanyCardsQuery>
