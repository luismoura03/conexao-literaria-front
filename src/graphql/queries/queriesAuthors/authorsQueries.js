import { gql } from "@apollo/client/core";

export const GET_AUTHORS = gql`
  query {
    authors {
      id
      name
    }
  }
`;
