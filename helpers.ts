import { GraphQLError } from "graphql/error";

export const throwNoImportServiceError = (): void => {
  throw new GraphQLError(
    "Import service has not been setup for this Elody GraphQL instance, please add its URL to the appConfig or .env file"
  );
};
