import { type TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core'
import { type Exact, type Scalars, type StatusEnum } from '../../graphql'

export interface CompanyCardsRentAddMutationProps {
  cardID: Scalars['Int']
  userID: Scalars['Int']
}

export type CompanyCardsRentAddMutationVariables = Exact<{
  props: CompanyCardsRentAddMutationProps
}>

export interface CompanyCardsRentAddMutation {
  __typename?: 'Mutation'
  company?: {
    __typename?: 'CompanyMutation'
    cardsRent?: {
      __typename?: 'CompanyCardsRentMutation'
      add?: {
        __typename?: 'MutationResponseType'
        status: { __typename?: 'StatusType'; message: StatusEnum }
      } | null
    } | null
  } | null
}

export const CompanyCardsRentAddDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'CompanyCardsRentAdd' },
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
              name: { kind: 'Name', value: 'CompanyCardsRentAddMutationProps' },
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
                  name: { kind: 'Name', value: 'cardsRent' },
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
  CompanyCardsRentAddMutation,
  CompanyCardsRentAddMutationVariables
>
