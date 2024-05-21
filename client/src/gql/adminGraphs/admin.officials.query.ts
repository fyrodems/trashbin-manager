import { type TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core'
import { type Maybe } from '../graphql'
import { type AdminUserInfoType } from '../commonTypes'

export interface AdminOfficialsQuery {
  __typename?: 'Query'
  admin?: {
    __typename?: 'AdminQuery'
    officials?: {
      __typename?: 'AdminOfficialsQuery'
      get?: Maybe<AdminUserInfoType[]>
    } | null
  } | null
}

export const AdminOfficialsGetDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'AdminOfficialsGet' },
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
                  name: { kind: 'Name', value: 'officials' },
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
                                value: 'users_ID',
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
                                value: 'users_typeID',
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
                              name: { kind: 'Name', value: 'addresses' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: {
                                      kind: 'Name',
                                      value: 'usersAddress_ID',
                                    },
                                  },
                                  {
                                    kind: 'Field',
                                    name: {
                                      kind: 'Name',
                                      value: 'usersAddress_userID',
                                    },
                                  },
                                  {
                                    kind: 'Field',
                                    name: {
                                      kind: 'Name',
                                      value: 'usersAddress_street',
                                    },
                                  },
                                  {
                                    kind: 'Field',
                                    name: {
                                      kind: 'Name',
                                      value: 'usersAddress_houseNumber',
                                    },
                                  },
                                  {
                                    kind: 'Field',
                                    name: {
                                      kind: 'Name',
                                      value: 'usersAddress_apartamentNumber',
                                    },
                                  },
                                  {
                                    kind: 'Field',
                                    name: {
                                      kind: 'Name',
                                      value: 'usersAddress_postCode',
                                    },
                                  },
                                  {
                                    kind: 'Field',
                                    name: {
                                      kind: 'Name',
                                      value: 'usersAddress_city',
                                    },
                                  },
                                  {
                                    kind: 'Field',
                                    name: {
                                      kind: 'Name',
                                      value: 'usersAddress_typeID',
                                    },
                                  },
                                  {
                                    kind: 'Field',
                                    name: {
                                      kind: 'Name',
                                      value: 'usersAddress_communityID',
                                    },
                                  },
                                  {
                                    kind: 'Field',
                                    name: {
                                      kind: 'Name',
                                      value: 'usersAddress_statusID',
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
} as unknown as DocumentNode<AdminOfficialsQuery>
