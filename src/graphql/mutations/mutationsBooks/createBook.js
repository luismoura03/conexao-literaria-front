import { gql } from "graphql-tag";

const CREATE_BOOK = gql`
  mutation CreateBook($title: String!, $authorId: ID!) {
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

export default CREATE_BOOK;
