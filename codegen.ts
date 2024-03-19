import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: `https://bsp-backend-dev-c06d81727232.herokuapp.com/graphql`,
  documents: ["src/**/*.tsx", "src/**/*.ts"],
  generates: {
    "./src/__generated__/": {
      preset: "client",
      plugins: [],
      presetConfig: {
        gqlTagName: "gql",
      },
    },
  },
  ignoreNoDocuments: true,
};

export default config;
