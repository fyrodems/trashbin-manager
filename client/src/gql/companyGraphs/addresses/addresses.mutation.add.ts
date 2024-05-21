import { type TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core'
import { type Exact, type Scalars, type StatusEnum } from '../../graphql'

export interface CompanyAddressAddMutationProps {
  usersAddress_userID: Scalars['Int']
  usersAddress_street: Scalars['String']
  usersAddress_houseNumber: Scalars['String']
  usersAddress_apartamentNumber?: Scalars['String']
  usersAddress_postCode: Scalars['String']
  usersAddress_city: Scalars['String']
  usersAddress_typeID: Scalars['Int']
  usersAddress_communityID: Scalars['Int']
}

export type CompanyAddressAddMutationVariables = Exact<{
  props: CompanyAddressAddMutationProps
}>

export interface CompanyAddressAddMutation {
  __typename?: 'Mutation'
  company?: {
    __typename?: 'CompanyMutation'
    addresses?: {
      __typename?: 'CompanyAddressMutation'
      add?: {
        __typename?: 'MutationResponseType'
        status: { __typename?: 'StatusType'; message: StatusEnum }
      } | null
    } | null
  } | null
}

export const CompanyAddressAddDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'CompanyAddressAdd' },
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
                value: 'CompanyAddressAddMutationProps',
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
            name: { kind: 'Name', value: 'company' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'addresses' },
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
  CompanyAddressAddMutation,
  CompanyAddressAddMutationVariables
>
