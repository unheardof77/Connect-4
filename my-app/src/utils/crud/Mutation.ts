import { gql } from "@apollo/client";

export const login = gql`
mutation Mutation($username: String!, $password: String!) {
  login(username: $username, password: $password) {
    token
    user {
      _id
      password
      username
      friends {
        _id
        username
      }
    }
  }
}
`;

export const signup = gql`
mutation Mutation($username: String!, $password: String!) {
  signup(username: $username, password: $password) {
    token
    user {
      _id
      username
    }
  }
}
`;