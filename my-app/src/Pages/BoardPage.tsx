import Board from "../Components/Board/Board"
import Header from "../Components/Header/Header"
import LoginModal from "../Components/LoginModal/LoginModal";
import SignupModal from "../Components/SignupModal/SignupModal";
import { useState } from "react";


export default function BoardPage() {
    const [loginModalStatus, setLoginModalStatus] = useState(false);
    const [signupModalStatus, setSignupModalStatus] = useState(false);
    return (
        <>
            <Header setLoginModalStatus={setLoginModalStatus}/>
            <Board/>
            <LoginModal setSignupModalStatus={setSignupModalStatus} loginModalStatus={loginModalStatus} setLoginModalStatus={setLoginModalStatus}/>
            <SignupModal setLoginModalStatus={setLoginModalStatus} setSignupModalStatus={setSignupModalStatus} signupModalStatus={signupModalStatus} />
        </>
    )
}