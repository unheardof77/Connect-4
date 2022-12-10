import { useState, MouseEvent } from "react";
import {BsFillCircleFill} from "react-icons/bs"
import './Board.css'
let boardPieces: string[][] = [[], [], [], [], [], [], []];

export default function Board() {
    const [playerTurn, setTurn] = useState(true);

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

    function whatPositionPicked(e: MouseEvent<HTMLTableRowElement>) {
        const index = Number(e.currentTarget.getAttribute('data-index'))
        if (playerTurn && boardPieces[index].length < 6) {
            console.log('whatRan')
            boardPieces[index].push('x')
            setTurn(false);
            didWin();
        } else if (!playerTurn && boardPieces[index].length < 6) {
            console.log('whatRan')
            boardPieces[index].push('O')
            setTurn(true);
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
    return (
        <>
            {/* <table style={{ transform: 'rotate(-90deg)', margin: 500 }}>
                <tbody>
                    {boardPieces.map((col, index) => <tr data-index={index} onClick={whatPositionPicked} key={`column #${index}`}>{boardPieces[index].map((piece, ind) => <td key={`col #${index} row #${ind}`}>{piece}</td>)}</tr>)}
                </tbody>
            </table> */}
            <div className="gameboard-wrapper">
                <h1 className="player-turn-1" style={playerTurn ? {visibility: "visible"} : {visibility: "hidden"}}>Player one's turn</h1>
                <table style={{margin: "0px 50px 0px 50px"}}>
                    <tbody style={{transform: "rotate(-90deg)"}}>
                        <tr data-index={0} onClick={whatPositionPicked} className="boardCell-wrapper">
                            <div className="boardCell"><BsFillCircleFill size="85px" color={renderColor(boardPieces[0][0])}/></div>
                            <div className="boardCell"><BsFillCircleFill size="85px" color={renderColor(boardPieces[0][1])}/></div>
                            <div className="boardCell"><BsFillCircleFill size="85px" color={renderColor(boardPieces[0][2])}/></div>
                            <div className="boardCell"><BsFillCircleFill size="85px" color={renderColor(boardPieces[0][3])}/></div>
                            <div className="boardCell"><BsFillCircleFill size="85px" color={renderColor(boardPieces[0][4])}/></div>
                            <div className="boardCell"><BsFillCircleFill size="85px" color={renderColor(boardPieces[0][5])}/></div>
                        </tr>
                        <tr data-index={1} onClick={whatPositionPicked} className="boardCell-wrapper">
                            <div className="boardCell"><BsFillCircleFill size="85px" color={renderColor(boardPieces[1][0])}/></div>
                            <div className="boardCell"><BsFillCircleFill size="85px" color={renderColor(boardPieces[1][1])}/></div>
                            <div className="boardCell"><BsFillCircleFill size="85px" color={renderColor(boardPieces[1][2])}/></div>
                            <div className="boardCell"><BsFillCircleFill size="85px" color={renderColor(boardPieces[1][3])}/></div>
                            <div className="boardCell"><BsFillCircleFill size="85px" color={renderColor(boardPieces[1][4])}/></div>
                            <div className="boardCell"><BsFillCircleFill size="85px" color={renderColor(boardPieces[1][5])}/></div>
                        </tr>
                        <tr data-index={2} onClick={whatPositionPicked} className="boardCell-wrapper">
                            <div className="boardCell"><BsFillCircleFill size="85px" color={renderColor(boardPieces[2][0])}/></div>
                            <div className="boardCell"><BsFillCircleFill size="85px" color={renderColor(boardPieces[2][1])}/></div>
                            <div className="boardCell"><BsFillCircleFill size="85px" color={renderColor(boardPieces[2][2])}/></div>
                            <div className="boardCell"><BsFillCircleFill size="85px" color={renderColor(boardPieces[2][3])}/></div>
                            <div className="boardCell"><BsFillCircleFill size="85px" color={renderColor(boardPieces[2][4])}/></div>
                            <div className="boardCell"><BsFillCircleFill size="85px" color={renderColor(boardPieces[2][5])}/></div>
                        </tr>
                        <tr data-index={3} onClick={whatPositionPicked} className="boardCell-wrapper">
                            <div className="boardCell"><BsFillCircleFill size="85px" color={renderColor(boardPieces[3][0])}/></div>
                            <div className="boardCell"><BsFillCircleFill size="85px" color={renderColor(boardPieces[3][1])}/></div>
                            <div className="boardCell"><BsFillCircleFill size="85px" color={renderColor(boardPieces[3][2])}/></div>
                            <div className="boardCell"><BsFillCircleFill size="85px" color={renderColor(boardPieces[3][3])}/></div>
                            <div className="boardCell"><BsFillCircleFill size="85px" color={renderColor(boardPieces[3][4])}/></div>
                            <div className="boardCell"><BsFillCircleFill size="85px" color={renderColor(boardPieces[3][5])}/></div>
                        </tr>
                        <tr data-index={4} onClick={whatPositionPicked} className="boardCell-wrapper">
                            <div className="boardCell"><BsFillCircleFill size="85px" color={renderColor(boardPieces[4][0])}/></div>
                            <div className="boardCell"><BsFillCircleFill size="85px" color={renderColor(boardPieces[4][1])}/></div>
                            <div className="boardCell"><BsFillCircleFill size="85px" color={renderColor(boardPieces[4][2])}/></div>
                            <div className="boardCell"><BsFillCircleFill size="85px" color={renderColor(boardPieces[4][3])}/></div>
                            <div className="boardCell"><BsFillCircleFill size="85px" color={renderColor(boardPieces[4][4])}/></div>
                            <div className="boardCell"><BsFillCircleFill size="85px" color={renderColor(boardPieces[4][5])}/></div>
                        </tr>
                        <tr data-index={5} onClick={whatPositionPicked} className="boardCell-wrapper">
                            <div className="boardCell"><BsFillCircleFill size="85px" color={renderColor(boardPieces[5][0])}/></div>
                            <div className="boardCell"><BsFillCircleFill size="85px" color={renderColor(boardPieces[5][1])}/></div>
                            <div className="boardCell"><BsFillCircleFill size="85px" color={renderColor(boardPieces[5][2])}/></div>
                            <div className="boardCell"><BsFillCircleFill size="85px" color={renderColor(boardPieces[5][3])}/></div>
                            <div className="boardCell"><BsFillCircleFill size="85px" color={renderColor(boardPieces[5][4])}/></div>
                            <div className="boardCell"><BsFillCircleFill size="85px" color={renderColor(boardPieces[5][5])}/></div>
                        </tr>
                        <tr data-index={6} onClick={whatPositionPicked} className="boardCell-wrapper">
                            <div className="boardCell"><BsFillCircleFill size="85px" color={renderColor(boardPieces[6][0])}/></div>
                            <div className="boardCell"><BsFillCircleFill size="85px" color={renderColor(boardPieces[6][1])}/></div>
                            <div className="boardCell"><BsFillCircleFill size="85px" color={renderColor(boardPieces[6][2])}/></div>
                            <div className="boardCell"><BsFillCircleFill size="85px" color={renderColor(boardPieces[6][3])}/></div>
                            <div className="boardCell"><BsFillCircleFill size="85px" color={renderColor(boardPieces[6][4])}/></div>
                            <div className="boardCell"><BsFillCircleFill size="85px" color={renderColor(boardPieces[6][5])}/></div>
                        </tr>
                    </tbody>
                </table>
                <h1 className="player-turn-2" style={playerTurn ? {visibility: "hidden"} : {visibility: "visible"}}>Player two's turn</h1>
            </div>
        </>
    );
};