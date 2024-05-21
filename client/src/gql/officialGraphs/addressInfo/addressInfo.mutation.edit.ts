import { type TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core'
import { type InputMaybe, type Exact, type Scalars } from '../../graphql'
import { type StatusType } from '@/gql/commonTypes'

export interface OfficialAddressInfoEditMutationProps {
  usersAddress_ID: Scalars['Int']
  usersAddress_street: Scalars['String']
  usersAddress_houseNumber: Scalars['String']
  usersAddress_apartamentNumber?: InputMaybe<Scalars['String']>
  usersAddress_postCode: Scalars['String']
  usersAddress_city: Scalars['String']
  usersAddress_typeID: Scalars['Int']
  usersAddress_communityID: Scalars['Int']
}

export type OfficialAddressInfoEditMutationVariables = Exact<{
  props: OfficialAddressInfoEditMutationProps
}>

export interface OfficialAddressInfoEditMutation {
  __typename?: 'Mutation'
  official?: {
    __typename?: 'OfficialMutation'
    address?: {
      __typename?: 'OfficialAddressInfoMutation'
      edit?: {
        __typename?: 'MutationResponseType'
        status: StatusType
      } | null
    } | null
  } | null
}

export const OfficialAddressInfoEditDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'OfficialAddressInfoEdit' },
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
                value: 'OfficialAddressInfoEditMutationProps',
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
  OfficialAddressInfoEditMutation,
  OfficialAddressInfoEditMutationVariables
>
