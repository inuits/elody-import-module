import { createModule } from "graphql-modules";
import { importSchema } from "./importSchema.schema";
import { importResolver } from "./importResolver";
import { ImportAPI } from "./sources/import";
import { extractParentDirectory } from "./parsers/directories";

declare module "base-graphql" { // Use the actual package name here
  interface DataSources {
    ImportAPI: ImportAPI;
  }
}

const importModule = createModule({
  id: "importModule",
  dirname: __dirname,
  typeDefs: [importSchema],
  resolvers: [importResolver],
});

export { importModule, importResolver, importSchema, ImportAPI, extractParentDirectory };
