import { gql } from "graphql-tag";

const CREATE_AUTHOR = gql`
  mutation CreateAuthor($name: String!) {
    createAuthor(name: $name) {
      id
      name
    }
  }
`;

export default CREATE_AUTHOR;
