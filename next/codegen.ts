/* eslint-disable pii/no-ip */
import { CodegenConfig } from '@graphql-codegen/cli'

const codegenConfig: CodegenConfig = {
  schema: 'http://127.0.0.1:1337/graphql',
  documents: './src/services/graphql/queries/**/*.{gql,graphql}',
  generates: {
    './src/services/graphql/api.ts': {
      plugins: ['typescript', 'typescript-operations', 'typescript-graphql-request'],
      // config: {
      //   enumsAsTypes: true
      // }
    },
  },
}

export default codegenConfig
