import Board from "../Components/Board/Board";
import Header from "../Components/Header/Header";
import WinnerModal from "../Components/WinnerModal/WinnerModal";
import LoginModal from "../Components/LoginModal/LoginModal";
import SignupModal from "../Components/SignupModal/SignupModal";



export default function BoardPage() {
    return (
        <>
            <Header/>
            <Board/>
            <WinnerModal/>
            <LoginModal/>
            <SignupModal/>
        </>
    )
}