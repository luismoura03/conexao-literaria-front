import { gql } from "graphql-tag";

export const CREATE_BOOK = gql`
  mutation CreateBook($title: String!, $authorId: ID!) {
    createBook(title: $title, authorId: $authorId) {
      title
      author {
        id
        name
      }
    }
  }
`;
