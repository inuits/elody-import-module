import { Resolvers } from '../../type-defs';
import { ContextValue } from '../../types';

export const importResolver: Resolvers<ContextValue> = {
  Query: {
    Directories: async (_source, { dir }, { dataSources }) => {
      return dataSources.ImportAPI.getDirectories(dir || '');
    },
  },
  Mutation: {
    postStartImport: async (_source, { folder }, { dataSources }) => {
      return dataSources.ImportAPI.startImport(folder);
    },
  },
};
