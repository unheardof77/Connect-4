import { jsx } from "@emotion/react";
import { useState, MouseEvent, useReducer } from "react";
import {BsFillCircleFill} from "react-icons/bs"
import './Board.css'
let boardPieces: string[][] = [[], [], [], [], [], [], []];

export default function Board() {
    const [playerTurn, setTurn] = useState(true);
    const [ignored, forceUpdate] = useReducer(x => x + 1, 0);
    const [inProgress, setInProgress] = useState(false);

    const regexTest = (testString: string) => {
        const regexColX = /xxxx/;
        const regexColO = /OOOO/;
        if (regexColX.test(testString)) {
            // boardPieces = [[], [], [], [], [], [], []];
            window.location.assign(`/#/gameOver/Player_One`);
        } else if (regexColO.test(testString)) {
            // boardPieces = [[], [], [], [], [], [], []];
            window.location.assign(`/#/gameOver/Player_Two`);
        };
    };

    const checkColWin = () => {
        boardPieces.forEach((col, index) => {
            const stringCol = col.join('');
            regexTest(stringCol)
        });
    };

    const checkRowWin = () => {
        for (let i = 0; i < 6; i++) {
            const stringRow = boardPieces.map((col) => col[i] || ' ').join('');
            regexTest(stringRow)
        };
    };

    const checkDiagonalWin = () => {
        for (let i = 3; i < 6; i++) {
            let westDiagonal: string = '';
            for (let j = 0; j < 6; j++) {
                if (boardPieces[j][i - j]) {
                    westDiagonal += boardPieces[0 + j][i - j]
                } else {
                    westDiagonal += ' '
                };
            };
            regexTest(westDiagonal);
        };

        for (let i=1; i<4; i++) {
            let northWestDiagonal:string = '';
            for (let j=0; j<6; j++) {
                if (boardPieces?.[i+j]?.[5-j]) {
                    northWestDiagonal += boardPieces[i+j][5-j];
                } else {
                    northWestDiagonal += ' '
                };
            };
            regexTest(northWestDiagonal);
        };

        for (let i = 3; i < 6; i++) {
            let northEastDiagonal: string = '';
            for (let j = 0; j < 6; j++) {
                if (boardPieces?.[i - j]?.[5 - j]) {
                    northEastDiagonal += boardPieces[i - j][5 - j];
                } else {
                    northEastDiagonal += ' ';
                };
            };
            regexTest(northEastDiagonal);
        };

        for (let i = 5; i > 2; i--) {
            let eastDiagonal: string = '';
            for (let j = 0; j < 6; j++) {
                if (boardPieces[6 - j][i - j]) {
                    eastDiagonal += boardPieces[6 - j][i - j];
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
        const initialLength = boardPieces[index].length;
        for (let i:number=5; i>=initialLength; i--) {
            const ArrayToConcat: string[] = Array(i-initialLength).fill("null");
            playerTurn ? boardPieces[index]=[...boardPieces[index], ...ArrayToConcat, "x"] : boardPieces[index]=[...boardPieces[index], ...ArrayToConcat, "O"];
            forceUpdate();
            console.log(i);
            console.log(boardPieces[index]);
            await new Promise(resolve => setTimeout(resolve, 150));
            boardPieces[index].splice(initialLength, 6);
            forceUpdate();
        }
        console.log(boardPieces[index]);

        if (playerTurn && boardPieces[index].length < 6) {
            boardPieces[index].push('x');
            setTurn(false);
            setInProgress(false);
            didWin();
        } else if (!playerTurn && boardPieces[index].length < 6) {
            boardPieces[index].push('O');
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
                <td key={`col:${columnIndex}-cell:${j}`} className="boardCell"><BsFillCircleFill size="85px" color={renderColor(boardPieces[columnIndex][j])}/></td>
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