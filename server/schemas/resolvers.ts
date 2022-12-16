import { AuthenticationError } from 'apollo-server-express';
import { Context, LoginSignup, CheckoutArgs } from '../utils/types';
import { signToken } from '../utils/auth';
import User from '../models/User';

import * as dotenv from 'dotenv'
dotenv.config()

const stripe = require('stripe')(process.env.STRIPEKEY);

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

            const correctPw = await user.isCorrectPassword(password);

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
        checkout: async (_:any, args:CheckoutArgs, context:any)=>{
            const url = new URL(context.headers.referer).origin;
            const lineItems = [];

            const stripeDonation = await stripe.products.create({
                name:'Coffee Donation', 
                description: 'Thank you so much!',
                images: ["http://cdn.home-designing.com/wp-content/uploads/2015/10/marbled-ceramic-mug-600x400.jpg"]
        });

            const price = await stripe.prices.create({
                product: stripeDonation.id,
                unit_amount: args.donationAmount * 100,
                currency: 'usd'
            });

            lineItems.push({price:price.id, quantity: 1});

            const session = await stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                line_items: lineItems,
                mode: 'payment',
                success_url: `${url}/#/thankyou`,
                cancel_url: `${url}/#/canceled`
            });

            return { session: session.id}
        }
    }
};

export default resolvers;