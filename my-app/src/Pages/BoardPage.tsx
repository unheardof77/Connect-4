import Board from "../Components/Board/Board"
import Header from "../Components/Header/Header"
import LoginModal from "../Components/LoginModal/LoginModal";
import { useState } from "react";


export default function BoardPage() {
    const [loginModalStatus, setLoginModalStatus] = useState(false);
    return (
        <>
            <Header setLoginModalStatus={setLoginModalStatus}/>
            <Board/>
            <LoginModal loginModalStatus={loginModalStatus} setLoginModalStatus={setLoginModalStatus}/>
        </>
    )
}