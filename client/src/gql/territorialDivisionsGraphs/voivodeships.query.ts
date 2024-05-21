import { type TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core'
import { type VoivodeshipInfoType } from '../commonTypes'

export interface TerritorialDivisionVoivodeshipsQuery {
  __typename?: 'Query'
  territorialDivision?: {
    __typename?: 'TerritorialDivisionQuery'
    voivodeships?: {
      __typename?: 'TerritorialVoivodeshipsQuery'
      get?: VoivodeshipInfoType | null
    } | null
  } | null
}

export const TerritorialDivisonVoivodeshipsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'TerritorialDivisonVoivodeships' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'territorialDivision' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'voivodeships' },
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
                                value: 'voivodeship_ID',
                              },
                            },
                            {
                              kind: 'Field',
                              name: {
                                kind: 'Name',
                                value: 'voivodeship_name',
                              },
                            },
                            {
                              kind: 'Field',
                              name: {
                                kind: 'Name',
                                value: 'voivodeship_description',
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
} as unknown as DocumentNode<TerritorialDivisionVoivodeshipsQuery>
