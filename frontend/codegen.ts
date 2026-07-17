import type { CodegenConfig } from "@graphql-codegen/cli";

const TYPES_PATH = "./src/graphql/types.ts";

const config: CodegenConfig = {
  schema: "./schema.graphql",
  documents: "./src/**/*.graphql",
  generates: {
    [TYPES_PATH]: {
      plugins: ["typescript"],
      hooks: {
        afterOneFileWrite: ["prettier --write"],
      },
    },
    "./": {
      preset: "near-operation-file",
      presetConfig: {
        extension: ".generated.ts",
        baseTypesPath: TYPES_PATH,
      },
      plugins: ["typescript-operations", "typescript-react-apollo"],
    },
  },
  config: {
    scalars: {
      Decimal: "number",
    },
  },
};

export default config;
