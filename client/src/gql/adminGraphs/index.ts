import { type TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core'
import {
  type Maybe,
  type LoginMutation,
  type LoginMutationVariables,
  type CreateUserMutation,
  type CreateUserMutationVariables,
  type VerificationCodeQuery,
  type VerificationCodeQueryVariables,
} from '../graphql'
import {
  type MutationResponseType,
  type NewOrderType,
  type AdminDumpstersSearchQueryType,
  type UserInfoType,
} from '../commonTypes'
// eslint-disable-next-line import/no-cycle
export * from './admin.officials.query'
export * from './admin.officials.mutation.delete'
export * from './admin.officials.mutation.add'
export * from './admin.dumpsters.mutation.add'
export * from './admin.dumpsters.mutation.delete'
export * from './admin.owners.mutation.add'
export * from './admin.owners.mutation.delete'
export * from './admin.dumpsters.mutation.edit'
export * from './admin.dumpsters.mutation.editBin'
export * from './admin.dumpsters.query'
export * from './admin.cardsOrders.mutation.verifyAdd'
export * from './admin.cardsOrders.query'

// QUERIES
export interface AdminQuery {
  __typename?: 'AdminQuery'
  officials?: Maybe<AdminOfficialsQuery>
  dumpsters?: Maybe<AdminDumpstersQuery>
  cardsOrders?: Maybe<AdminCardsOrdersQuery>
}

export interface AdminOfficialsQuery {
  __typename?: 'AdminOfficialsQuery'
  get: UserInfoType[]
}

export interface AdminDumpstersQuery {
  __typename?: 'AdminDumpstersQuery'
  get: AdminDumpstersSearchQueryType[]
}
export interface AdminCardsOrdersQuery {
  __typename?: 'AdminCardsOrdersQuery'
  get: NewOrderType[]
}

// MUTATIONS
export interface AdminMutation {
  __typename?: 'AdminMutation'
  officials?: Maybe<AdminOfficialsMutation>
  dumpsters?: Maybe<AdminDumpstersMutation>
  owners?: Maybe<AdminOwnersMutation>
  cardsOrders?: Maybe<AdminCardsOrdersMutation>
}

export interface AdminOfficialsMutation {
  __typename?: 'AdminOfficialsMutation'
  delete?: MutationResponseType
  add?: MutationResponseType
}

export interface AdminDumpstersMutation {
  __typename?: 'AdminDumpstersMutation'
  delete?: MutationResponseType
  add?: MutationResponseType
  edit?: MutationResponseType
  bin?: MutationResponseType
}

export interface AdminOwnersMutation {
  __typename?: 'AdminOwnersMutation'
  delete?: MutationResponseType
  add?: MutationResponseType
}

export interface AdminCardsOrdersMutation {
  __typename?: 'AdminCardsOrdersMutation'
  verifyAdd?: MutationResponseType
}

export const VerificationCodeDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'VerificationCode' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'user' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'info' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'verification' },
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
  VerificationCodeQuery,
  VerificationCodeQueryVariables
>

export const CreateUserDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'CreateUser' },
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
              name: { kind: 'Name', value: 'AuthRegisterMutationProps' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'auth' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'register' },
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
                        name: { kind: 'Name', value: 'status' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'message' },
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
} as unknown as DocumentNode<CreateUserMutation, CreateUserMutationVariables>

export const LoginDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'Login' },
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
              name: { kind: 'Name', value: 'AuthLoginMutationProps' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'auth' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'login' },
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
                        name: { kind: 'Name', value: 'status' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'message' },
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
} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>
