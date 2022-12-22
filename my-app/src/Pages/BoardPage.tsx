import Board from "../Components/Board/Board";
import Header from "../Components/Header/Header";
import WinnerModal from "../Components/WinnerModal/WinnerModal";
import LoginModal from "../Components/LoginModal/LoginModal";
import SignupModal from "../Components/SignupModal/SignupModal";
import { useState } from "react";


export default function BoardPage() {
    const [winner, setWinner] = useState("");
    return (
        <>
            <Header/>
            <Board setWinner={setWinner} winner={winner}/>
            <WinnerModal winner={winner}/>
            <LoginModal/>
            <SignupModal/>
        </>
    )
}