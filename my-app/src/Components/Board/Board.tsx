import { useState, MouseEvent } from "react";

const boardPieces: string[][] = [['x'], ['O'], ['x'], ['O'], ['x'], ['O'], ['x']];

export default function Board() {
    const [playerTurn, setTurn] = useState(true);

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

        for (let i = 1; i < 4; i++) {
            let northWestDiagonal: string = '';
            for (let j = 0; j < 6; j++) {
                if (boardPieces?.[i + j]?.[5 - j]) {
                    // console.log("happened")
                    console.log(boardPieces[i + j][5 - j])
                    northWestDiagonal += boardPieces[i + j][5 - j];
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
    return (
        <>
            {playerTurn ? <h1>Player one's turn</h1> : <h1>Player two's turn</h1>}
            <table style={{ transform: 'rotate(-90deg)', margin: 500 }}>
                <tbody>
                    {boardPieces.map((col, index) => <tr data-index={index} onClick={whatPositionPicked} key={`column #${index}`}>{boardPieces[index].map((piece, ind) => <td key={`col #${index} row #${ind}`}>{piece}</td>)}</tr>)}
                </tbody>
            </table>
        </>
    );
};