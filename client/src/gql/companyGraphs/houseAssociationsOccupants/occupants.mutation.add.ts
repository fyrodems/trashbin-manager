import { type TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core'
import { type Exact, type Scalars, type StatusEnum } from '../../graphql'

export interface CompanyOccupantsAddMutationProps {
  company_ID: Scalars['Int']
  occupant_ID: Scalars['Int']
}

export type CompanyOccupantsAddMutationVariables = Exact<{
  props: CompanyOccupantsAddMutationProps
}>

export interface CompanyOccupantsAddMutation {
  __typename?: 'Mutation'
  company?: {
    __typename?: 'CompanyMutation'
    occupants?: {
      __typename?: 'CompanyOccupantsMutation'
      add?: {
        __typename?: 'MutationResponseType'
        status: { __typename?: 'StatusType'; message: StatusEnum }
      } | null
    } | null
  } | null
}

export const CompanyOccupantsAddDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'CompanyOccupantsAdd' },
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
                value: 'CompanyOccupantsAddMutationProps',
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
                  name: { kind: 'Name', value: 'occupants' },
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
  CompanyOccupantsAddMutation,
  CompanyOccupantsAddMutationVariables
>
