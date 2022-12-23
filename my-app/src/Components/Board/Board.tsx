import './Board.css';
import { Box, Button } from '@mui/material';
import { useState, MouseEvent, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { BsFillCircleFill } from "react-icons/bs";
import { useModalContext } from "../../utils/statemanagment/globalstate";



export default function Board() {
    const [playerTurn, setTurn] = useState(true);
    const [inProgress, setInProgress] = useState(false);
    const [playAgain, setPlayAgain] = useState(false);
    const [gameBoard, setGameBoard] = useState<string[][]>([[], [], [], [], [], [], []]);;
    const { updateModalState, modalState } = useModalContext();

    const [ignored, forceUpdate] = useReducer(x => x + 1, 0);
    const navigate = useNavigate();

    const updateBoard = (index: number, piece: string) => {
        const newGameBoard = [...gameBoard];
        newGameBoard[index].push(piece);
        setGameBoard(newGameBoard);
    };

    const regexTest = (testString: string) => {
        const regexColX = /xxxx/;
        const regexColO = /OOOO/;
        const regexDraw = /6666666/;
        if (regexColX.test(testString)) {
            updateModalState({ type: 'showWinnerModal', whoWon:"Player 1 Won!" })
            setPlayAgain(true);
        } else if (regexColO.test(testString)) {
            updateModalState({ type: 'showWinnerModal', whoWon:"Player 2 Won!" })
            setPlayAgain(true);
        } else if (regexDraw.test(testString)) {
            updateModalState({ type: 'showWinnerModal', whoWon:"Its a draw, both players won!" })
            setPlayAgain(true);
        }
    };

    const checkColWin = () => {
        
        gameBoard.forEach((col) => {
            const stringCol = col.join('');
            regexTest(stringCol)
        });
    };

    const checkRowWin = () => {
        for (let i = 0; i < 6; i++) {
            const stringRow = gameBoard.map((col) => col[i] || ' ').join('');
            regexTest(stringRow)
        };
    };

    const checkDiagonalWin = () => {
        for (let i = 3; i < 6; i++) {
            let westDiagonal: string = '';
            for (let j = 0; j < 6; j++) {
                if (gameBoard[j][i - j]) {
                    westDiagonal += gameBoard[0 + j][i - j]
                } else {
                    westDiagonal += ' '
                };
            };
            regexTest(westDiagonal);
        };

        for (let i = 1; i < 4; i++) {
            let northWestDiagonal: string = '';
            for (let j = 0; j < 6; j++) {
                if (gameBoard?.[i + j]?.[5 - j]) {
                    northWestDiagonal += gameBoard[i + j][5 - j];
                } else {
                    northWestDiagonal += ' '
                };
            };
            regexTest(northWestDiagonal);
        };

        for (let i = 3; i < 6; i++) {
            let northEastDiagonal: string = '';
            for (let j = 0; j < 6; j++) {
                if (gameBoard?.[i - j]?.[5 - j]) {
                    northEastDiagonal += gameBoard[i - j][5 - j];
                } else {
                    northEastDiagonal += ' ';
                };
            };
            regexTest(northEastDiagonal);
        };

        for (let i = 5; i > 2; i--) {
            let eastDiagonal: string = '';
            for (let j = 0; j < 6; j++) {
                if (gameBoard[6 - j][i - j]) {
                    eastDiagonal += gameBoard[6 - j][i - j];
                } else {
                    eastDiagonal += ' ';
                };
            };
            regexTest(eastDiagonal);
        };
    };

    function checkDraw(): void {
        const arrayOfNum: number[] = [];
        gameBoard.forEach((arr) => {
            arrayOfNum.push(arr.length);
        });
        regexTest(arrayOfNum.join(''));
    };

    function didWin() {
        checkColWin();
        checkRowWin();
        checkDiagonalWin();
        checkDraw();
    };

    async function whatPositionPicked(e: MouseEvent<HTMLTableRowElement>) {
        if (inProgress || playAgain) return;

        setInProgress(true);
        const index = Number(e.currentTarget.getAttribute('data-index'))

        //programatic changes to board pieces array of arrays to mock falling "animation"
        const initialLength = gameBoard[index].length;
        const newGameBoard = [...gameBoard]
        for (let i: number = 5; i >= initialLength; i--) {
            const ArrayToConcat: string[] = Array(i - initialLength).fill("null");
            newGameBoard[index] = playerTurn ? [...newGameBoard[index], ...ArrayToConcat, "x"] : [...newGameBoard[index], ...ArrayToConcat, "O"];
            setGameBoard(newGameBoard);
            forceUpdate();
            await new Promise(resolve => setTimeout(resolve, 125));
            newGameBoard[index].splice(initialLength, 6);
            setGameBoard(newGameBoard);
            forceUpdate();
        }

        if (playerTurn && gameBoard[index].length < 6) {
            updateBoard(index, 'x');
            setTurn(false);
            setInProgress(false);
            didWin();
        } else if (!playerTurn && gameBoard[index].length < 6) {
            updateBoard(index, 'O');
            setTurn(true);
            setInProgress(false)
            didWin();
        };
    };

    function renderColor(boardCell: string): string {
        switch (boardCell) {
            case "x": return "#b69f34";
            case "O": return "#c93030";
            default: return "#121212";
        }
    }

    function renderCells(columnIndex: number) {
        const cellArray = [];
        for (let j: number = 0; j < 6; j++) {
            cellArray.push(
                <td key={`col:${columnIndex}-cell:${j}`} className={playAgain ? "boardCell" : "boardCell hover"}><BsFillCircleFill size="85px" color={renderColor(gameBoard[columnIndex][j])} /></td>
            )
        }
        return cellArray;
    }

    function renderBoard() {
        const colsArray = []
        for (let i: number = 0; i < 7; i++) {
            colsArray.push(
                <tr key={`col:${i}`} style={{ margin: "20px" }} data-index={i} onClick={whatPositionPicked} className="boardCell-wrapper">
                    {renderCells(i)}
                </tr>
            )
        }
        return colsArray;
    }

    const handlePlayAgain = () => {
        setGameBoard([[], [], [], [], [], [], []]);
        setTurn(true);
        setPlayAgain(false);
    };

    const handleLeaveGame = () => {
        setGameBoard([[], [], [], [], [], [], []]);
        navigate('/');
    }

    return (
        <div className="gameboard-wrapper">
            {playAgain ?
                <Box sx={{ width: "17%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                    <h1 style={{ color: "lightgray", textAlign: "center", margin: "0", fontSize: "3em" }}>
                        Game Over!
                    </h1>
                    <h2 style={{ color: "gray", textAlign: "center", margin: "0 0 4% 0" }}>
                        {modalState.whoWon} Won
                    </h2>
                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                        <Button variant="outlined" onClick={handlePlayAgain}>Play again?</Button>
                    </Box>
                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                        <Button variant="outlined" onClick={handleLeaveGame}>Leave Game</Button>
                    </Box>
                </Box>
                :
                <>
                    <h1 style={playerTurn ? { color: "lightgray" } : { display: "none" }}>Player <span className="player-turn-1">One's</span> Turn</h1>
                    <h1 style={playerTurn ? { display: "none" } : { color: "lightgray" }}>Player <span className="player-turn-2">Two's</span> Turn</h1>
                </>
            }
            <table style={{ margin: "0px 50px 0px 50px" }}>
                <tbody style={{ transform: "rotate(-90deg)" }}>
                    {renderBoard()}
                </tbody>
            </table>
        </div>
    );
};