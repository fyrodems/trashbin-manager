import { type TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core'
import { type Exact, type Scalars } from '../graphql'
import { type StatusType } from '../commonTypes'

export interface AdminNewOfficialsAddMutationProps {
  users_login: Scalars['String']
  users_password: Scalars['String']
  users_name: Scalars['String']
  users_identificationNumber: Scalars['String']
  users_phoneNumber: Scalars['String']
  usersAddress_street: Scalars['String']
  usersAddress_houseNumber?: Scalars['String']
  usersAddress_apartamentNumber: Scalars['String']
  usersAddress_postCode: Scalars['String']
  usersAddress_city: Scalars['String']
  usersAddress_communityID: Scalars['Int']
  users_typeID?: Scalars['Int']
}

export type AdminOfficialsAddMutationVariables = Exact<{
  props: AdminNewOfficialsAddMutationProps
}>

export interface AdminOfficialsAddMutation {
  __typename?: 'Mutation'
  admin?: {
    __typename?: 'AdminMutation'
    officials?: {
      __typename?: 'AdminOfficialsMutation'
      add?: {
        __typename?: 'MutationResponseType'
        status: StatusType
      } | null
    } | null
  } | null
}

export const AdminOfficialsAddDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'AdminOfficialsAdd' },
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
                value: 'AdminNewOfficialAddMutationProps',
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
                        name: { kind: 'Name', value: 'add' },
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
                                  {
                                    kind: 'Field',
                                    name: {
                                      kind: 'Name',
                                      value: 'description',
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
  AdminOfficialsAddMutation,
  AdminOfficialsAddMutationVariables
>
