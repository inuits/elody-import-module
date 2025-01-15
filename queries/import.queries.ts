import { gql } from "graphql-modules";

export const importQueries = gql`
  query getUploadMagazinesWithMets {
    UploadMagazinesWithMets
  }

  query getUploadMagazinesWithCsv {
    UploadMagazinesWithCsv
  }

  mutation startUploadMagazinesWithMets($magazine: String!) {
    startUploadMagazinesWithMets(magazine: $magazine)
  }

  mutation startUploadMagazinesWithCsv($magazine: String!) {
    startUploadMagazinesWithCsv(magazine: $magazine)
  }
`;
