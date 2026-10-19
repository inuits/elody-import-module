import { createModule } from "graphql-modules";
import { defineElodyModule, requireSettings } from "base-graphql";
import { importSchema } from "./importSchema.schema";
import { importResolver } from "./importResolver";
import { ImportAPI } from "./sources/import";
import { extractParentDirectory } from "./parsers/directories";

declare module "base-graphql" { // Use the actual package name here
  interface DataSources {
    ImportAPI: ImportAPI;
  }
}

const importModule = defineElodyModule({
  name: "importModule",
  graphqlModule: createModule({
    id: "importModule",
    dirname: __dirname,
    typeDefs: [importSchema],
    resolvers: [importResolver],
  }),
  dataSources: [{ name: "ImportAPI", source: ImportAPI }],
  initialize: (environment) =>
    requireSettings(environment, {
      "api.fileSystemImporterServiceUrl": "FILE_SYSTEM_IMPORTER_URL",
    }),
});

export { importModule, importResolver, importSchema, ImportAPI, extractParentDirectory };
