import { gql } from "@apollo/client";

export const GAMELOBBYSUB = gql`
subscription Subscription($gameLobbyId: ID!) {
  gameLobbyChanged(GameLobby_id: $gameLobbyId) {
    gameboard
    members {
      _id
      username
    }
  }
}
`;