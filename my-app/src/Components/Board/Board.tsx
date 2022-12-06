import { useState, MouseEvent } from "react";

const boardPieces = [['x'],['x', 'x', null],['x'],['x'],['x'],['x'],['x']];

export default function Board(){
    const [playerTurn, setTurn] = useState(true);

    const checkColWin = () => {
        const regexColX =/xxxx/;
        const regexColO =/OOOO/;
        boardPieces.forEach((col, index) => {
            const stringCol = col.join('');
            console.log(stringCol)
            if(regexColX.test(stringCol)){
                window.location.assign(`/#/gameOver/Player_One`);
            }else if(regexColO.test(stringCol)){
                window.location.assign(`/#/gameOver/Player_Two`);
            }
        });
    };

    function didWin() {
        checkColWin();
        
    };
    function whatPositionPicked(e:MouseEvent<HTMLTableRowElement>){
        if(playerTurn){
            console.log('whatRan')
            const arrayPosition:number  = Number(e.currentTarget.getAttribute('data-index'))
            boardPieces[arrayPosition].push('x')
            setTurn(false);
        }else{
            console.log('whatRan')
            const arrayPosition:number  = Number(e.currentTarget.getAttribute('data-index'))
            boardPieces[arrayPosition].push('O')
            setTurn(true);
        };
        didWin();
    };
    return (
        <>
        {playerTurn? <h1>Player one's turn</h1>:<h1>Player two's turn</h1>}
        <table style={{transform:'rotate(-90deg)', margin: 500}}>
            <tbody>
                {boardPieces.map((col, index) =><tr data-index={index} onClick={whatPositionPicked} key={`column #${index}`}>{boardPieces[index].map((piece, ind)=> <td key={`col #${index} row #${ind}`}>{piece}</td>)}</tr>)}
            </tbody>
        </table>
        </>
    );
};