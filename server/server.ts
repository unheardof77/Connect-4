import express from 'express';
import { ApolloServer } from '@apollo/server';
import path from 'path';
import db from './config/connection';
import typeDefs from './schemas/typeDefs';
import resolvers from './schemas/resolvers';
import { authMiddleware } from './utils/auth';

import { expressMiddleware } from '@apollo/server/express4';
import cors from 'cors';
import { json } from 'body-parser';

import { createServer } from 'http';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';

const PORT = process.env.PORT || 3001;
const app = express();
const schema = makeExecutableSchema({ typeDefs, resolvers });
const httpServer = createServer(app);

const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/graphql',
});

const serverCleanup = useServer({ schema }, wsServer);

const server = new ApolloServer({
    schema,
    plugins:[
        ApolloServerPluginDrainHttpServer({ httpServer }),
        {
            async serverWillStart() {
                return {
                    async drainServer() {
                        await serverCleanup.dispose();
                    },
                };
            },
        },
    ],
});

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../../my-app/build')));
};

app.get('/', (req, res) => {res.sendFile(path.join(__dirname, '../../my-app/build/index.html'));});

const startApolloServer = async ()=>{
    await server.start();
    app.use('/graphql', cors<cors.CorsRequest>(), json(), expressMiddleware(server, {context: authMiddleware}));
    db.once('open', ()=>{
        httpServer.listen(PORT, ()=>{
            console.log(`API server running on port ${PORT}!`);
            console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
        })
    })
};

startApolloServer();