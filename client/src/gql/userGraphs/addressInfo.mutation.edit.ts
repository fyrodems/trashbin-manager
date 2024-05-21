import { type TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core'
import { type InputMaybe, type Exact, type Scalars } from '../graphql'
import { type StatusType } from '../commonTypes'

export interface UserAddressInfoEditMutationProps {
  usersAddress_userID: Scalars['Int']
  usersAddress_street: Scalars['String']
  usersAddress_houseNumber: Scalars['String']
  usersAddress_apartamentNumber?: InputMaybe<Scalars['String']>
  usersAddress_postCode: Scalars['String']
  usersAddress_city: Scalars['String']
  usersAddress_typeID: Scalars['Int']
  usersAddress_communityID: Scalars['Int']
  usersAddress_addressID: Scalars['Int']
}

export type UserAddressInfoEditMutationVariables = Exact<{
  props: UserAddressInfoEditMutationProps
}>

export interface UserAddressInfoEditMutation {
  __typename?: 'Mutation'
  user?: {
    __typename?: 'UserMutation'
    addressInfo?: {
      __typename?: 'UserAddressInfoMutation'
      edit?: {
        __typename?: 'MutationResponseType'
        status: StatusType
      } | null
    } | null
  } | null
}

export const UserAddressInfoEditDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'UserAddressInfoEdit' },
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
                value: 'UserAddressInfoEditMutationProps',
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
            name: { kind: 'Name', value: 'user' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'addressInfo' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'edit' },
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
  UserAddressInfoEditMutation,
  UserAddressInfoEditMutationVariables
>
