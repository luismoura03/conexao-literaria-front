import { gql } from "graphql-tag";

export const UPDATE_BOOK = gql`
  mutation UpdateBook($id: ID!, $title: NonEmptyString!, $authorId: ID!) {
    updateBook(id: $id, title: $title, authorId: $authorId) {
      id
      title
      author {
        id
        name
      }
    }
  }
`;
