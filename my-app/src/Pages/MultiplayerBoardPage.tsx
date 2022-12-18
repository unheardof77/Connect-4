import {useState} from 'react'
import { useParams } from 'react-router-dom';
import Header from "../Components/Header/Header";
import MultiBoard from "../Components/MultiBoard/MultiBoard";
import WinnerModal from "../Components/WinnerModal/WinnerModal";


export default function MultiBoardPage(){
    const param = useParams();
    const playerType = param.playerType || 'host';
    const [winner, setWinner] = useState('');



    return (
        <>
            <Header/>
            <MultiBoard playerType={playerType} winner={winner} setWinner={setWinner} />
            <WinnerModal winner={winner} />
        </>
    )
};