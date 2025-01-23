import { gql } from "@apollo/client/core";

export const GET_BOOKS = gql`
  query {
    books {
      id
      title
      author {
        id
        name
      }
    }
  }
`;
