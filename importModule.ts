import { createModule } from 'graphql-modules';
import { importSchema } from './importSchema.schema';
import { importResolver } from './importResolver';

const importModule = createModule({
  id: 'importModule',
  dirname: __dirname,
  typeDefs: [importSchema],
  resolvers: [importResolver],
});

export { importModule, importResolver, importSchema };
