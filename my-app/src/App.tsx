import Board from "./Components/Board/Board";
import GameOver from "./Pages/GameOver";
import { Route, Routes, HashRouter as Router, } from 'react-router-dom'
import { useState } from 'react';
function App() {
  const [gameState, setGameState] = useState(true);
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Board/>}/>
          <Route path="/gameOver/:player" element={<GameOver />}/>
          <Route/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
