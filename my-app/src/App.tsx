import BoardPage from "./Pages/BoardPage";
import GameOver from "./Pages/GameOver";
import { Route, Routes, HashRouter as Router, } from 'react-router-dom'
import {GameProvider} from './utils/statemanagment/globalstate';
// import './utils/reset/reset.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {

  return (
    <div className="App">
      <GameProvider>
        <ThemeProvider theme={darkTheme}>
        <CssBaseline />
            <Router>
              <Routes>
                <Route path="/" element={<BoardPage/>}/>
                <Route path="/gameOver/:player" element={<GameOver />}/>
                <Route/>
              </Routes>
            </Router>
          </ThemeProvider>
      </GameProvider>
    </div>
  );
}

export default App;