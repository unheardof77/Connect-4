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
    type Mutation {
        login(username:String!, password:String!): Auth
        signup(username:String!, password:String!): Auth
    }
    type Query {
        user: User
    }
`;

export default typeDefs;