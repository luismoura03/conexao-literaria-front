// Exemplo em Vue / Apollo Client
import { gql } from "@apollo/client/core"

export const GET_AUTHOR_BOOKS = gql`
  query GetAuthorBooks($name: String!) {
    author(name: $name) {
      id
      name
      books {
        id
        title
      }
    }
  }
`