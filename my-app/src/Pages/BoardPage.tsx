import Board from "../Components/Board/Board";
import Header from "../Components/Header/Header";
import WinnerModal from "../Components/WinnerModal/WinnerModal";
import LoginModal from "../Components/LoginModal/LoginModal";
import SignupModal from "../Components/SignupModal/SignupModal";
import { useState } from "react";


export default function BoardPage() {
    const [winner, setWinner] = useState("");
    const [winnerModalOpen, setWinnerModalOpen] = useState(false);
    const [loginModalStatus, setLoginModalStatus] = useState(false);
    const [signupModalStatus, setSignupModalStatus] = useState(false);
    return (
        <>
            <Header setLoginModalStatus={setLoginModalStatus}/>
            <Board winner={winner} setWinner={setWinner} setWinnerModalOpen={setWinnerModalOpen}/>
            <WinnerModal winnerModalOpen={winnerModalOpen} setWinnerModalOpen={setWinnerModalOpen} winner={winner}/>
            <LoginModal setSignupModalStatus={setSignupModalStatus} loginModalStatus={loginModalStatus} setLoginModalStatus={setLoginModalStatus}/>
            <SignupModal setLoginModalStatus={setLoginModalStatus} setSignupModalStatus={setSignupModalStatus} signupModalStatus={signupModalStatus} />
        </>
    )
}