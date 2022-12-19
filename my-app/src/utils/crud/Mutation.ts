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

export const CREATELOBBY = gql`
mutation Mutation($name: String!) {
  createGameLobby(name: $name) {
    _id
    gameboard
    members {
      username
      _id
    }
    name
    lobbyIsFull
  }
}
`;

export const DELETELOBBY = gql`
mutation DeleteGameLobby($GameLobby_id: ID!) {
  deleteGameLobby(GameLobby_id: $GameLobby_id) {
    _id
    lobbyIsFull
    name
    gameboard
    members {
      _id
      username
    }
  }
}

`;

export const UPDATELOBBY = gql`
mutation UpdateGameLobby($lobbyName: String!, $gameboard: [[String]!], $isGameFinished: Boolean) {
  updateGameLobby(lobbyName: $lobbyName, gameboard: $gameboard, isGameFinished: $isGameFinished) {
    _id
    gameboard
    lobbyIsFull
    name
    isGameFinished
    members {
      _id
      username
    }
  }
}
`;

export const SENDMESSAGE = gql`
mutation SendMessage( $message: String!, $GameLobby_id: ID!) {
  sendMessage( message: $message, GameLobby_id: $GameLobby_id) {
    gameboard
    _id
    lobbyIsFull
    name
    messages {
      _id
      formattedTime
      message
      name
    }
  }
}
`;