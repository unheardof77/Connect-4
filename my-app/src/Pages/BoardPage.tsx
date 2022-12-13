import Board from "../Components/Board/Board";
import Header from "../Components/Header/Header";
import {useState} from "react";
import WinnerModal from "../Components/WinnerModal/WinnerModal";


export default function BoardPage() {
    const [winner, setWinner] = useState("");
    const [winnerModalOpen, setWinnerModalOpen] = useState(false);
    
    return (
        <>
            <Header/>
            <Board winner={winner} setWinner={setWinner} setWinnerModalOpen={setWinnerModalOpen}/>
            <WinnerModal winnerModalOpen={winnerModalOpen} setWinnerModalOpen={setWinnerModalOpen} winner={winner}/>
        </>
    )
}