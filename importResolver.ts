import { Resolvers } from "../../generated-types/type-defs";
import { ContextValue } from "base-graphql";

export const importResolver: Resolvers<ContextValue> = {
  Query: {
    Directories: async (_source, { dir }, { dataSources }) => {
      return dataSources.ImportAPI.getDirectories(dir || "");
    },
    UploadMagazinesWithMets: async (_source, { }, { dataSources }) => {
      return dataSources.ImportAPI.getMagazinesWithMets();
    },
    UploadMagazinesWithCsv: async (_source, { }, { dataSources }) => {
      return dataSources.ImportAPI.getMagazinesWithCsv();
    },
    UploadOcr: async (_source, { }, { dataSources }) => {
      return dataSources.ImportAPI.getOcrFiles();
    },
  },
  Mutation: {
    postStartImport: async (_source, { folder }, { dataSources }) => {
      return dataSources.ImportAPI.startImport(folder);
    },
    startUploadMagazinesWithMets: async (_source, { magazine }, { dataSources }) => {
      return dataSources.ImportAPI.startUploadMagazinesWithMets(magazine);
    },
    startUploadMagazinesWithCsv: async (_source, { magazine }, { dataSources }) => {
      return dataSources.ImportAPI.startUploadMagazinesWithCsv(magazine);
    },
    startUploadOcr: async (_source, { ocrFile }, { dataSources }) => {
      return dataSources.ImportAPI.startUploadOcr(ocrFile);
    },
  },
};
