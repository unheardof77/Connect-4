import { gql } from "@apollo/client";

export const GAMELOBBYSUB = gql`
subscription Subscription($lobbyName: String!) {
  gameLobbyChanged(lobbyName: $lobbyName) {
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