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
        messages: [Message]!
        isGameFinished: Boolean
    }
    type Message {
        _id: ID
        name: String
        message: String
        formattedTime: String
    }
    type Checkout {
        session: ID
    }

    type Mutation {
        login(username:String!, password:String!): Auth
        signup(username:String!, password:String!): Auth
        createGameLobby(name: String!): GameLobby
        deleteGameLobby(GameLobby_id: ID!): GameLobby
        updateGameLobby(gameboard: [[String]!], lobbyName: String!, isGameFinished: Boolean): GameLobby
        sendMessage(message:String!, GameLobby_id:ID!): GameLobby
    }
    type Query {
        checkout(donationAmount:Int): Checkout
    }
    type Subscription {
        gameLobbyChanged(lobbyName: String!): GameLobby
    }
`;

export default typeDefs;