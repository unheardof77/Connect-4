import BoardPage from "./Pages/BoardPage";
import { Route, Routes, HashRouter as Router, } from 'react-router-dom'
import {GameProvider, ModalStateProvider} from './utils/statemanagment/globalstate';
import AboutPage from "./Pages/AboutPage";
import CanceledPage from "./Pages/CanceledPage";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MultiBoardPage from "./Pages/MultiplayerBoardPage";
import LoginModal from "./Components/CreateLobbyModal/CreateLobbyModal";
import SignupModal from "./Components/SignupModal/SignupModal";
import JoinGameModal from "./Components/JoinGameModal/JoinGameModal";
import LobbyModal from "./Components/CreateLobbyModal/CreateLobbyModal";

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';

import { split, HttpLink } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';


const httpLink = new HttpLink({
  uri: '/graphql'
});

const wsLink = new GraphQLWsLink(createClient({
  url: 'ws://localhost:3001/graphql',
}));

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(splitLink),
  cache: new InMemoryCache()
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {

  return (
    <div className="App">
      <ApolloProvider client={client}>
        <GameProvider>
          <ModalStateProvider>
            <ThemeProvider theme={darkTheme}>
            <CssBaseline />
                <Router>
                  <Routes>
                    <Route path="/" element={<BoardPage/>}/>
                    <Route path="/aboutUs" element={<AboutPage/>}/>
                    <Route path="/canceled" element={<CanceledPage/>} />
                    <Route path="/multiplayer/:playerType" element={<MultiBoardPage/>}/>
                  </Routes>
                  <LobbyModal/>
                  <LoginModal/>
                  <SignupModal/>
                  <JoinGameModal/>
                </Router>
              </ThemeProvider>
          </ModalStateProvider>
        </GameProvider>
      </ApolloProvider>
    </div>
  );
}

export default App;