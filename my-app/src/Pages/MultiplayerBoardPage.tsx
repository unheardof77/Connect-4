
import { useParams } from 'react-router-dom';
import Header from "../Components/Header/Header";
import MultiBoard from "../Components/MultiBoard/MultiBoard";
import WinnerModal from "../Components/WinnerModal/WinnerModal";


export default function MultiBoardPage(){
    const param = useParams();
    const playerType = param.playerType || 'host';

    return (
        <>
            <Header/>
            <MultiBoard playerType={playerType} />
            <WinnerModal />
        </>
    )
};