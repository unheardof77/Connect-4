import { gql } from "@apollo/client";

export const GAMELOBBYSUB = gql`
subscription Subscription {
  gameLobbyChanged {
    _id
    gameboard
    lobbyIsFull
    name
  }
}
`;