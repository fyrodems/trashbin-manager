import { type TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core'
import { type InputMaybe, type Exact, type Scalars } from '../../graphql'
import { type StatusType } from '@/gql/commonTypes'

export interface OfficialAddressInfoAddMutationProps {
  usersAddress_userID: Scalars['Int']
  usersAddress_street: Scalars['String']
  usersAddress_houseNumber: Scalars['String']
  usersAddress_apartamentNumber?: InputMaybe<Scalars['String']>
  usersAddress_postCode: Scalars['String']
  usersAddress_city: Scalars['String']
  usersAddress_typeID: Scalars['Int']
  usersAddress_communityID: Scalars['Int']
}

export type OfficialAddressInfoAddMutationVariables = Exact<{
  props: OfficialAddressInfoAddMutationProps
}>

export interface OfficialAddressInfoAddMutation {
  __typename?: 'Mutation'
  official?: {
    __typename?: 'OfficialMutation'
    address?: {
      __typename?: 'OfficialAddressInfoMutation'
      add?: {
        __typename?: 'MutationResponseType'
        status: StatusType
      } | null
    } | null
  } | null
}

export const OfficialAddressInfoAddDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'OfficialAddressInfoAdd' },
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
                value: 'OfficialAddressInfoAddMutationProps',
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
                  name: { kind: 'Name', value: 'address' },
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
  OfficialAddressInfoAddMutation,
  OfficialAddressInfoAddMutationVariables
>
