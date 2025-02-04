import { gql } from "graphql-tag";

const UPDATE_AUTHOR = gql`
  mutation UpdateAuthor($id: ID!, $name: NonEmptyString!) {
    updateAuthor(id: $id, name: $name) {
      id
      name
    }
  }
`;

export default UPDATE_AUTHOR;
