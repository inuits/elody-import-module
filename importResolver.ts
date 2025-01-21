import { Resolvers } from "../../generated-types/type-defs";
import { ContextValue } from "base-graphql";

export const importResolver: Resolvers<ContextValue> = {
  Query: {
    Directories: async (_source, { dir }, { dataSources }) => {
      if (!dataSources.ImportAPI) return [];
      return dataSources.ImportAPI.getDirectories(dir || "");
    },
  },
  Mutation: {
    postStartImport: async (_source, { folder }, { dataSources }) => {
      if (!dataSources.ImportAPI) return {};
      return dataSources.ImportAPI.startImport(folder);
    },

  },
};
