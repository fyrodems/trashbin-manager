import { type TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core'
import { type Exact, type Scalars, type StatusEnum } from '../graphql'

export interface AdminDumpstersBinEditMutationProps {
  dumpsterBin_ID: Scalars['Int']
  dumpsterBin_typeID: Scalars['Int']
}

export type AdminDumpstersBinEditMutationVariables = Exact<{
  props: AdminDumpstersBinEditMutationProps
}>

export interface AdminDumpstersBinEditMutation {
  __typename?: 'Mutation'
  admin?: {
    __typename?: 'AdminMutation'
    dumpsters?: {
      __typename?: 'AdminDumpstersMutation'
      bin?: {
        __typename?: 'MutationResponseType'
        status: { __typename?: 'StatusType'; message: StatusEnum }
      } | null
    } | null
  } | null
}

export const AdminDumpstersBinEditDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'AdminDumpstersBinEdit' },
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
                value: 'AdminDumpstersBinEditMutationProps',
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
            name: { kind: 'Name', value: 'admin' },
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
                        name: { kind: 'Name', value: 'bin' },
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
  AdminDumpstersBinEditMutation,
  AdminDumpstersBinEditMutationVariables
>
