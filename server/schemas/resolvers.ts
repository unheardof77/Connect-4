import { AuthenticationError } from 'apollo-server-express';
import { Context, LoginSignup, CheckoutArgs, GameNameArgs } from '../utils/types';
import { signToken } from '../utils/auth';
import User from '../models/User';
import GameLobby from '../models/Lobby';
import { PubSub, withFilter } from 'graphql-subscriptions';

import * as dotenv from 'dotenv'
dotenv.config()

const stripe = require('stripe')(process.env.STRIPEKEY);
const pubSub = new PubSub();



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
        createGameLobby:async (_: any, args: GameNameArgs, context: Context) => {
            const gameLobby = await GameLobby.create(args);
            const updatedGameLobby = await GameLobby.findOneAndUpdate({_id: gameLobby._id}, {$push: {members: context.user._id}}, {new: true}).populate("members")

            return updatedGameLobby;
        },
        deleteGameLobby:async (_: any, args: any) => {
            return await GameLobby.findOneAndDelete({_id: args.GameLobby_id})
        },
        updateGameLobby:async (_: any, args: any, context: Context) => {
            const lobby = await GameLobby.findOne({name: args.lobbyName});
            if (Object.keys(args).length>1) { // update the gameboard
                const updatedLobby = await GameLobby.findOneAndUpdate({name: args.lobbyName}, {gameboard: args.gameboard}, {new: true}).populate('members');
                await pubSub.publish('UPDATED_LOBBY', {gameLobbyChanged: updatedLobby});
                return updatedLobby;
            } else { // add member to game lobby
                if (lobby && !lobby.lobbyIsFull) {
                    return await GameLobby.findOneAndUpdate({name: args.lobbyName}, {$push: {members: context.user._id}}, {new: true}).populate('members');
                } else if (!lobby) {
                    throw new AuthenticationError('Lobby doesn\'t exist');
                } else {
                    throw new AuthenticationError('Lobby is full')
                }
            }
        }

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
    }, 
    Subscription: {
        gameLobbyChanged:{
            subscribe: 
                ()=>pubSub.asyncIterator(['UPDATED_LOBBY'])

        }
    }
};

export default resolvers;