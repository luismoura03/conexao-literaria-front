import { gql } from "graphql-tag";

export const LOGIN_USER = gql`
  mutation LoginUser($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      user {
        id
        username
      }
    }
  }
`
export const REGISTER_USER = gql`
  mutation RegisterUserInput($input: RegisterUserInput!) {
    register(input: $input) {
      id
      username
      email
      firstName
      lastName
    }
  }
`

export const LOGOUT_USER = gql`
  mutation Logout {
    logout 
  }
`