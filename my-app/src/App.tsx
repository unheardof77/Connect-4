import Board from "./Components/Board/Board";
import GameOver from "./Pages/GameOver";
import { Route, Routes, HashRouter as Router, } from 'react-router-dom'
import { useState } from 'react';
import {GameProvider} from './utils/statemanagment/globalstate';
function App() {

  return (
    <div className="App">
      <GameProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Board/>}/>
            <Route path="/gameOver/:player" element={<GameOver />}/>
            <Route/>
          </Routes>
        </Router>
      </GameProvider>
    </div>
  );
}

export default App;