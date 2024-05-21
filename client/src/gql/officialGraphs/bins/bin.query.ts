import { type TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core'
import { type Exact, type Scalars } from '../../graphql'
import { type DumpsterBinType } from '@/gql/commonTypes'

export interface OfficialBinGetQueryProps {
  dumpsterBin_ID: Scalars['Int']
}

export type OfficialBinVariables = Exact<{
  props: OfficialBinGetQueryProps
}>

export interface OfficialBinQuery {
  __typename?: 'Query'
  official?: {
    __typename?: 'OfficialQuery'
    bins?: {
      __typename?: 'OfficialBinsQuery'
      get?: DumpsterBinType | null
    } | null
  } | null
}

export const OfficialBinGetDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'OfficialBinGet' },
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
                  name: { kind: 'Name', value: 'bins' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'get' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: {
                                kind: 'Name',
                                value: 'dumpsterBin_ID',
                              },
                            },
                            {
                              kind: 'Field',
                              name: {
                                kind: 'Name',
                                value: 'dumpsterBin_dumpsterID',
                              },
                            },
                            {
                              kind: 'Field',
                              name: {
                                kind: 'Name',
                                value: 'dumpsterBin_isFull',
                              },
                            },
                            {
                              kind: 'Field',
                              name: {
                                kind: 'Name',
                                value: 'dumpsterBin_typeID',
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
} as unknown as DocumentNode<OfficialBinQuery, OfficialBinVariables>
