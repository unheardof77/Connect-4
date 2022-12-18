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
mutation DeleteGameLobby($gameLobbyId: ID!) {
  deleteGameLobby(GameLobby_id: $gameLobbyId) {
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
mutation UpdateGameLobby($lobbyName: String!, $gameboard: [[String]!]) {
  updateGameLobby(lobbyName: $lobbyName, gameboard: $gameboard) {
    _id
    gameboard
    lobbyIsFull
    name
    members {
      _id
      username
    }
  }
}
`;