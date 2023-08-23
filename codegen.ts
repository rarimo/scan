import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  overwrite: true,
  require: ['dotenv/config'],
  schema: process.env.GRAPHQL_URL,
  documents: ['src/**/*.gql'],
  generates: {
    'src/graphql/generated.ts': {
      plugins: ['typescript', 'typescript-operations', 'typescript-document-nodes'],
    },
  },
}

export default config
