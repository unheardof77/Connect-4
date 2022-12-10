import BoardPage from "./Pages/BoardPage";
import GameOver from "./Pages/GameOver";
import { Route, Routes, HashRouter as Router, } from 'react-router-dom'
import {GameProvider} from './utils/statemanagment/globalstate';
import './utils/reset/reset.css';
function App() {

  return (
    <div className="App">
      <GameProvider>
        <Router>
          <Routes>
            <Route path="/" element={<BoardPage/>}/>
            <Route path="/gameOver/:player" element={<GameOver />}/>
            <Route/>
          </Routes>
        </Router>
      </GameProvider>
    </div>
  );
}

export default App;