import { gql } from "graphql-tag";

const DELETE_AUTHOR = gql`
  mutation DeleteAuthor($id: ID!) {
    deleteAuthor(id: $id) {
      id
    }
  }
`;

export default DELETE_AUTHOR;
