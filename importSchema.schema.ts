import { gql } from 'graphql-modules';

export const importSchema = gql`
  #Import
  type Directory {
    id: String
    dir: String
    has_subdirs: Boolean
    parent: String!
  }

  type ImportReturn {
    status: Int
    message_id: String
    count: Int
  }

  type Query {
    Directories(dir: String): [Directory]
    UploadMagazinesWithMets: [String]
    UploadMagazinesWithCsv: [String]
  }

  type Mutation {
    postStartImport(folder: String!): ImportReturn
    startUploadMagazinesWithMets(magazine: String!): [String]
    startUploadMagazinesWithCsv(magazine: String!): [String]
  }
`;
