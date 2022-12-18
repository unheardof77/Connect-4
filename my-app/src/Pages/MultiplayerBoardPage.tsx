import {useState} from 'react'
import { useParams } from 'react-router-dom';
import Header from "../Components/Header/Header";
import MultiBoard from "../Components/MultiBoard/MultiBoard";
import WinnerModal from "../Components/WinnerModal/WinnerModal";


export default function MultiBoardPage(){
    const { playerType } = useParams();
    const [winner, setWinner] = useState('');
    
    return (
        <>
            <Header/>
            <MultiBoard winner={winner} setWinner={setWinner} />
            <WinnerModal winner={winner} />
        </>
    )
};