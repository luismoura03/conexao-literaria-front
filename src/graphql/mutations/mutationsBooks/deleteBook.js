import { gql } from "graphql-tag";

const DELETE_BOOK = gql`
  mutation DeleteBook($id: ID!){
    deleteBook($id: ID!){
      id
    }
  }
`;

export default DELETE_BOOK;
