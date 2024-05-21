import { type TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core'
import { type Exact, type Scalars, type StatusEnum } from '../../graphql'

export interface OfficialUserContractsAddMutationProps {
  usersContract_userID: Scalars['Int']
  usersContract_number: Scalars['String']
  usersContract_dateFrom: Scalars['String']
  usersContract_dateTo: Scalars['String']
  usersContract_statusID: Scalars['Int']
  usersContract_communityID: Scalars['Int']
  usersContract_ratePaper: Scalars['Float']
  usersContract_ratePlastic: Scalars['Float']
  usersContract_rateGlass: Scalars['Float']
  usersContract_rateBio: Scalars['Float']
  usersContract_rateMixed: Scalars['Float']
}

export type OfficialUserContractsAddMutationVariables = Exact<{
  props: OfficialUserContractsAddMutationProps
}>

export interface OfficialUserContractsAddMutation {
  __typename?: 'Mutation'
  official?: {
    __typename?: 'OfficialMutation'
    userContracts?: {
      __typename?: 'OfficialUserContractsMutation'
      add?: {
        __typename?: 'MutationResponseType'
        status: { __typename?: 'StatusType'; message: StatusEnum }
      } | null
    } | null
  } | null
}

export const OfficialUserContractsAddDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'OfficialUserContractsAdd' },
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
                value: 'OfficialUserContractsAddMutationProps',
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
  OfficialUserContractsAddMutation,
  OfficialUserContractsAddMutationVariables
>
