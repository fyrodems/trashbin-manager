import { type TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core'
import { type AdminDumpstersSearchQueryResult } from '../commonTypes'

export interface AdminDumpstersQuery {
  __typename?: 'Query'
  admin?: {
    __typename?: 'AdminQuery'
    dumpsters?: {
      __typename?: 'AdminDumpstersQuery'
      get?: AdminDumpstersSearchQueryResult[]
    } | null
  }
}

export const AdminDumpstersGetDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'AdminDumpstersGet' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'admin' },
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
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: {
                                kind: 'Name',
                                value: 'dumpster_ID',
                              },
                            },
                            {
                              kind: 'Field',
                              name: {
                                kind: 'Name',
                                value: 'dumpster_name',
                              },
                            },
                            {
                              kind: 'Field',
                              name: {
                                kind: 'Name',
                                value: 'dumpster_description',
                              },
                            },
                            {
                              kind: 'Field',
                              name: {
                                kind: 'Name',
                                value: 'dumpster_street',
                              },
                            },
                            {
                              kind: 'Field',
                              name: {
                                kind: 'Name',
                                value: 'dumpster_city',
                              },
                            },
                            {
                              kind: 'Field',
                              name: {
                                kind: 'Name',
                                value: 'dumpster_postCode',
                              },
                            },
                            {
                              kind: 'Field',
                              name: {
                                kind: 'Name',
                                value: 'dumpster_communityID',
                              },
                            },
                            {
                              kind: 'Field',
                              name: {
                                kind: 'Name',
                                value: 'dumpster_houseNumbers',
                              },
                            },
                            {
                              kind: 'Field',
                              name: {
                                kind: 'Name',
                                value: 'dumpster_hasError',
                              },
                            },
                            {
                              kind: 'Field',
                              name: {
                                kind: 'Name',
                                value: 'dumpster_statusID',
                              },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'bins' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: {
                                      kind: 'Name',
                                      value: 'dumpsterBin_ID',
                                    },
                                  },
                                  {
                                    kind: 'Field',
                                    name: {
                                      kind: 'Name',
                                      value: 'dumpsterBin_dumpsterID',
                                    },
                                  },
                                  {
                                    kind: 'Field',
                                    name: {
                                      kind: 'Name',
                                      value: 'dumpsterBin_isFull',
                                    },
                                  },
                                  {
                                    kind: 'Field',
                                    name: {
                                      kind: 'Name',
                                      value: 'dumpsterBin_typeID',
                                    },
                                  },
                                ],
                              },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'owners' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: {
                                      kind: 'Name',
                                      value: 'users_name',
                                    },
                                  },
                                  {
                                    kind: 'Field',
                                    name: {
                                      kind: 'Name',
                                      value: 'users_identificationNumber',
                                    },
                                  },
                                  {
                                    kind: 'Field',
                                    name: {
                                      kind: 'Name',
                                      value: 'users_phoneNumber',
                                    },
                                  },
                                  {
                                    kind: 'Field',
                                    name: {
                                      kind: 'Name',
                                      value: 'users_login',
                                    },
                                  },
                                  {
                                    kind: 'Field',
                                    name: {
                                      kind: 'Name',
                                      value: 'users_statusID',
                                    },
                                  },
                                  {
                                    kind: 'Field',
                                    name: {
                                      kind: 'Name',
                                      value: 'users_ID',
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
} as unknown as DocumentNode<AdminDumpstersQuery>
