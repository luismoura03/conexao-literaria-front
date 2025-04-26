import { gql } from "@apollo/client/core";

export const GET_AUTHOR_BOOKS = gql `
  query Author($authorId: ID!) {
    author(id: $authorId) {
    books {
      id
      title
    }
  }
}
`