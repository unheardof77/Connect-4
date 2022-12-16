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
    type Checkout {
        session: ID
    }
    type Mutation {
        login(username:String!, password:String!): Auth
        signup(username:String!, password:String!): Auth
        
    }
    type Query {
        user: User
        checkout(donationAmount:Int): Checkout
    }
`;

export default typeDefs;