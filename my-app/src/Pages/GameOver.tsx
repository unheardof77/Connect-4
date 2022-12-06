
import { Link, useParams } from 'react-router-dom';

type pageParams = {
    player:string;
}


export default function GameOver(){
    const {player} = useParams<pageParams>();
    const editedString = player?.split('_') || [];
    const finalString = editedString.join(' ');
    return (
        <div>
            <h1>Congrats for winning, {finalString}!!</h1>
            <Link to='/'>Play Again?</Link>
        </div>
    )
}