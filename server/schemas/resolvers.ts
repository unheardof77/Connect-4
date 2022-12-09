import { AuthenticationError } from 'apollo-server-express';
import { Context, LoginSignup } from '../utils/types';
import { signToken } from '../utils/auth';
import User from '../models/User';

const resolvers = {
    Mutation:{
        signup: async (_:any, args:LoginSignup) => {
            const user = await User.create(args);
            const token = signToken(user);
            return { user, token };
        },
        login: async (_:any, { username, password }:LoginSignup) => {
            const user = await User.findOne({ username });

            if (!user) {
                throw new AuthenticationError('No account found.');
            };

            const correctPw = user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            };

            const token = signToken(user);

            return { token, user };
        },
    },
    Query:{
        user: ()=> {
            
        },
    }
};

export default resolvers;