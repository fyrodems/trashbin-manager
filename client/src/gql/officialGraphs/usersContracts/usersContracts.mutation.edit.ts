import { type TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core'
import { type Exact, type Scalars, type StatusEnum } from '../../graphql'

export interface OfficialUserContractsEditMutationProps {
  usersContract_ID: Scalars['Int']
  usersContract_dateFrom: Scalars['String']
  usersContract_dateTo: Scalars['String']
  usersContract_statusID: Scalars['Int']
  usersContract_number: Scalars['String']
  usersContract_ratePaper: Scalars['Float']
  usersContract_ratePlastic: Scalars['Float']
  usersContract_rateGlass: Scalars['Float']
  usersContract_rateBio: Scalars['Float']
  usersContract_rateMixed: Scalars['Float']
}

export type OfficialUserContractsEditMutationVariables = Exact<{
  props: OfficialUserContractsEditMutationProps
}>

export interface OfficialUserContractsEditMutation {
  __typename?: 'Mutation'
  official?: {
    __typename?: 'OfficialMutation'
    userContracts?: {
      __typename?: 'OfficialUserContractsMutation'
      edit?: {
        __typename?: 'MutationResponseType'
        status: { __typename?: 'StatusType'; message: StatusEnum }
      } | null
    } | null
  } | null
}

export const OfficialUserContractsEditDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'OfficialUserContractsEdit' },
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
                value: 'OfficialUserContractsEditMutationProps',
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
                  name: { kind: 'Name', value: 'userContracts' },
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
  OfficialUserContractsEditMutation,
  OfficialUserContractsEditMutationVariables
>
