import { type TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core'
import { type Exact, type Scalars } from '../graphql'
import { type StatusType } from '../commonTypes'

export interface UserDumpstersDeleteMutationProps {
  card_ID: Scalars['Int']
  dumpster_ID: Scalars['Int']
}

export type UserDumpstersDeleteMutationVariables = Exact<{
  props: UserDumpstersDeleteMutationProps
}>

export interface UserDumpstersDeleteMutation {
  __typename?: 'Mutation'
  user?: {
    __typename?: 'UserMutation'
    dumpsters?: {
      __typename?: 'UserDumpstersMutation'
      delete?: {
        __typename?: 'MutationResponseType'
        status: StatusType
      } | null
    } | null
  } | null
}

export const UserDumpstersDeleteDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'UserDumpstersDelete' },
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
                value: 'UserDumpstersDeleteMutationProps',
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
                  name: { kind: 'Name', value: 'dumpsters' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'delete' },
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
  UserDumpstersDeleteMutation,
  UserDumpstersDeleteMutationVariables
>
