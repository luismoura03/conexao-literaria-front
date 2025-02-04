import { gql } from "graphql-tag";

export const CREATE_BOOK = gql`
  mutation CreateBook($title: NonEmptyString!, $authorId: ID!) {
    createBook(title: $title, authorId: $authorId) {
      id
      title
      author {
        id
        name
      }
    }
  }
`;
