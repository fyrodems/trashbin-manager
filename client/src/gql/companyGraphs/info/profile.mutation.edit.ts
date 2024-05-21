import { type TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core'
import { type Exact, type Scalars } from '@/gql/graphql'
import { type StatusType } from '@/gql/commonTypes'

// PROFILE DATA
export interface CompanyInfoProfileMutationProps {
  name?: Scalars['String']
  email?: Scalars['String']
  phoneNumber?: Scalars['String']
}

export type CompanyProfileUpdateMutationVariables = Exact<{
  props: CompanyInfoProfileMutationProps
}>

export interface CompanyProfileUpdateMutation {
  __typename?: 'Mutation'
  company?: {
    __typename?: 'CompanyMutation'
    info?: {
      __typename?: 'CompanyMutation'
      profile: {
        __typename?: 'MutationResponseType'
        status: StatusType
      }
    } | null
  } | null
}

export const CompanyProfileUpdateDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'CompanyProfileUpdate' },
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
              name: { kind: 'Name', value: 'CompanyInfoProfileMutationProps' },
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
                  name: { kind: 'Name', value: 'info' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'profile' },
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
  CompanyProfileUpdateMutation,
  CompanyProfileUpdateMutationVariables
>
