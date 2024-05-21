import { type TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core'
import { type NewAddressType } from '@/gql/commonTypes'
import { type Exact } from '@/gql/graphql'

export interface OfficialApplicationsDumpstersQueryProps {
  users_data?: string
}

export type OfficialApplicationsDumpstersQueryVariables = Exact<{
  props: OfficialApplicationsDumpstersQueryProps
}>

export interface OfficialApplicationsDumpstersQuery {
  __typename?: 'Query'
  official?: {
    __typename?: 'OfficialQuery'
    applications?: {
      __typename?: 'OfficialApplicationsQuery'
      dumpsters?: {
        __typename?: 'OfficialApplicationsDumpstersQuery'
        get?: NewAddressType[] | null
      } | null
    } | null
  } | null
}

export const OfficialDumpstersApplicationGetDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'OfficialDumpstersApplicationGet' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'props' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: {
                kind: 'Name',
                value: 'OfficialApplicationsDumpstersQueryProps',
              },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'official' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'applications' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'dumpsters' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'get' },
                              arguments: [
                                {
                                  kind: 'Argument',
                                  name: { kind: 'Name', value: 'props' },
                                  value: {
                                    kind: 'Variable',
                                    name: { kind: 'Name', value: 'props' },
                                  },
                                },
                              ],
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: {
                                      kind: 'Name',
                                      value: 'dumpstersApplications_ID',
                                    },
                                  },
                                  {
                                    kind: 'Field',
                                    name: {
                                      kind: 'Name',
                                      value: 'dumpstersApplications_dateAdded',
                                    },
                                  },
                                  {
                                    kind: 'Field',
                                    name: {
                                      kind: 'Name',
                                      value:
                                        'dumpstersApplications_dateReviewed',
                                    },
                                  },
                                  {
                                    kind: 'Field',
                                    name: {
                                      kind: 'Name',
                                      value: 'dumpstersApplications_typeID',
                                    },
                                  },
                                  {
                                    kind: 'Field',
                                    name: {
                                      kind: 'Name',
                                      value: 'dumpstersApplications_reviewedBy',
                                    },
                                  },
                                  {
                                    kind: 'Field',
                                    name: {
                                      kind: 'Name',
                                      value: 'dumpstersApplications_userID',
                                    },
                                  },
                                  {
                                    kind: 'Field',
                                    name: {
                                      kind: 'Name',
                                      value: 'dumpstersApplications_dumpsterID',
                                    },
                                  },
                                  {
                                    kind: 'Field',
                                    name: {
                                      kind: 'Name',
                                      value: 'dumpstersApplications_statusID',
                                    },
                                  },
                                  {
                                    kind: 'Field',
                                    name: {
                                      kind: 'Name',
                                      value: 'dumpstersApplications_cardID',
                                    },
                                  },
                                  {
                                    kind: 'Field',
                                    name: {
                                      kind: 'Name',
                                      value: 'dumpstersApplications_userName',
                                    },
                                  },
                                  {
                                    kind: 'Field',
                                    name: {
                                      kind: 'Name',
                                      value: 'dumpstersApplications_cardNumber',
                                    },
                                  },
                                  {
                                    kind: 'Field',
                                    name: {
                                      kind: 'Name',
                                      value:
                                        'dumpstersApplications_dumpsterName',
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
      },
    },
  ],
} as unknown as DocumentNode<
  OfficialApplicationsDumpstersQuery,
  OfficialApplicationsDumpstersQueryVariables
>
