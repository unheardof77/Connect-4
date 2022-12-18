import { gql } from "apollo-server-express";

const typeDefs = gql`
    type Auth {
        token: ID
        user: User
    }
    type User {
        _id: ID
        username: String
        password: String
        friends: [User]!
    }
    type GameLobby {
        _id: ID
        name: String
        gameboard: [[String]!]!
        members: [User]!
        lobbyIsFull: Boolean
    }
    type Checkout {
        session: ID
    }
    type Mutation {
        login(username:String!, password:String!): Auth
        signup(username:String!, password:String!): Auth
        createGameLobby(name: String!): GameLobby
        deleteGameLobby(GameLobby_id: ID!): GameLobby
        updateGameLobby(gameboard: [[String]!], lobbyName: String!): GameLobby
    }
    type Query {
        user: User
        checkout(donationAmount:Int): Checkout
    }
    type Subscription {
        gameLobbyChanged(lobbyName: String!): GameLobby
    }
`;

export default typeDefs;