import { useState, MouseEvent } from "react";
import {BsFillCircleFill} from "react-icons/bs";
import { useGameContext } from "../../utils/statemanagment/globalstate";
import './Board.css';


export default function Board() {
    const [playerTurn, setTurn] = useState(true);
    const [inProgress, setInProgress] = useState(false);
    const {state, dispatch} = useGameContext();
    
    const updateBoard = (index:number, piece:string) =>{
        const newState = [...state];
        newState[index].push(piece);
        dispatch({type:'updateBoard', payload: newState});
    };

    const regexTest = (testString: string) => {
        const regexColX = /xxxx/;
        const regexColO = /OOOO/;
        if (regexColX.test(testString)) {
            window.location.assign(`/#/gameOver/Player_One`);
        } else if (regexColO.test(testString)) {
            window.location.assign(`/#/gameOver/Player_Two`);
        };
    };

    const checkColWin = () => {
        state.forEach((col, index) => {
            const stringCol = col.join('');
            regexTest(stringCol)
        });
    };

    const checkRowWin = () => {
        for (let i = 0; i < 6; i++) {
            const stringRow = state.map((col) => col[i] || ' ').join('');
            regexTest(stringRow)
        };
    };

    const checkDiagonalWin = () => {
        for (let i = 3; i < 6; i++) {
            let westDiagonal: string = '';
            for (let j = 0; j < 6; j++) {
                if (state[j][i - j]) {
                    westDiagonal += state[0 + j][i - j]
                } else {
                    westDiagonal += ' '
                };
            };
            regexTest(westDiagonal);
        };

        for (let i=1; i<4; i++) {
            let northWestDiagonal:string = '';
            for (let j=0; j<6; j++) {
                if (state?.[i+j]?.[5-j]) {
                    northWestDiagonal += state[i+j][5-j];
                } else {
                    northWestDiagonal += ' '
                };
            };
            regexTest(northWestDiagonal);
        };

        for (let i = 3; i < 6; i++) {
            let northEastDiagonal: string = '';
            for (let j = 0; j < 6; j++) {
                if (state?.[i - j]?.[5 - j]) {
                    northEastDiagonal += state[i - j][5 - j];
                } else {
                    northEastDiagonal += ' ';
                };
            };
            regexTest(northEastDiagonal);
        };

        for (let i = 5; i > 2; i--) {
            let eastDiagonal: string = '';
            for (let j = 0; j < 6; j++) {
                if (state[6 - j][i - j]) {
                    eastDiagonal += state[6 - j][i - j];
                } else {
                    eastDiagonal += ' ';
                };
            };
            regexTest(eastDiagonal);
        };
    };

    function didWin() {
        checkColWin();
        checkRowWin();
        checkDiagonalWin();
    };

    async function whatPositionPicked(e: MouseEvent<HTMLTableRowElement>) {
        if (inProgress) return;

        setInProgress(true);
        const index = Number(e.currentTarget.getAttribute('data-index'))

        //programatic changes to board pieces array of arrays to mock falling "animation"
        const initialLength = state[index].length;
        for (let i:number=5; i>=initialLength; i--) {
            const ArrayToConcat: string[] = Array(i-initialLength).fill("null");
            state[index] = playerTurn ? [...state[index], ...ArrayToConcat, "x"] : [...state[index], ...ArrayToConcat, "O"];
            dispatch({type:'updateBoard', payload:state});
            await new Promise(resolve => setTimeout(resolve, 150));
            state[index].splice(initialLength, 6);
            dispatch({type:'updateBoard', payload:state});
        }

        if (playerTurn && state[index].length < 6) {
            updateBoard(index,'x');
            setTurn(false);
            setInProgress(false);
            didWin();
        } else if (!playerTurn && state[index].length < 6) {
            updateBoard(index,'O');
            setTurn(true);
            setInProgress(false)
            didWin();
        };
    };

    function renderColor(boardCell: string) {
        switch(boardCell) {
            case "x": return "#b69f34";
            case "O": return "#c93030";
            default: return "#121212";
        }
    }

    function renderCells(columnIndex: number) {
        const cellArray = [];
        for (let j:number=0; j<6; j++) {
            cellArray.push(
                <td key={`col:${columnIndex}-cell:${j}`} className="boardCell"><BsFillCircleFill size="85px" color={renderColor(state[columnIndex][j])}/></td>
            )
        }
        return cellArray;
    }

    function renderBoard() {
        const colsArray = []
        for (let i:number=0; i<7; i++) {
            colsArray.push(
                <tr key={`col:${i}`} data-index={i} onClick={whatPositionPicked} className="boardCell-wrapper">
                    {renderCells(i)}
                </tr>
            )
        }
        return colsArray;
    }

    return (
        <>
            <div className="gameboard-wrapper">
                <h1 style={playerTurn ? {visibility: "visible", color: "lightgray"} : {visibility: "hidden"}}>Player <span className="player-turn-1">One's</span> Turn</h1>
                <table style={{margin: "0px 50px 0px 50px"}}>
                    <tbody style={{transform: "rotate(-90deg)"}}>
                        {renderBoard()}
                    </tbody>
                </table>
                <h1 style={playerTurn ? {visibility: "hidden"} : {visibility: "visible", color: "lightgray"}}>Player <span className="player-turn-2">Two's</span> Turn</h1>
            </div>
        </>
    );
};