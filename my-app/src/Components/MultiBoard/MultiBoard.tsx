import '../Board/Board.css';
import { useState, MouseEvent, useReducer, useEffect } from "react";
import { BsFillCircleFill } from "react-icons/bs";
import { Skeleton, Button, Box } from "@mui/material/";
import { useModalContext } from "../../utils/statemanagment/globalstate";
import { useMutation, useSubscription } from "@apollo/client";
import { UPDATELOBBY, SENDMESSAGE } from "../../utils/crud/Mutation";
import { GAMELOBBYSUB } from "../../utils/crud/Subscription";
import Auth from "../../utils/auth/auth"
import { useNavigate } from "react-router-dom";
import ChatBox from "../ChatBox/ChatBox";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { MultiBoardProps } from '../../utils/types/types';




export default function MultiBoard({ playerType }: MultiBoardProps) {
    const [playerTurn, setTurn] = useState(playerType === 'host');//sets initial state value for the player turn if there host they go first
    const [inProgress, setInProgress] = useState(false); //this is the state for the animation when a piece is dropped from the top
    const [localGameBoard, dispatch] = useState<string[][]>([[], [], [], [], [], [], []]);//local state for the game board
    const [sentMessage, setSendMessage] = useState("");//state representing the value of the message they can send;
    const [playAgain, setPlayAgain] = useState(false);
    const [chatMessages, setChatMessages] = useState([]);
    const [showClipMessage, setShowClipMessage] = useState(false);

    const navigate = useNavigate();

    const { updateModalState } = useModalContext();// this is the dispatch action for the modals
    const [ignored, forceUpdate] = useReducer(x => x + 1, 0);// gives us access to force rerender the game board, used when animated the pieces falling

    //these two lines of code get the id and name of the game lobby and parse it
    const gameId = JSON.parse(localStorage.getItem('GameBoard') || '')._id;
    const name = JSON.parse(localStorage.getItem('GameBoard') || '').name;
    const username = Auth.getProfile()?.data.username;
    let opponentUsername: string = "";


    //mutation for sending a message
    const [sendMessage] = useMutation(SENDMESSAGE);

    //mutation for updating the lobby ie mutation thats used whenever a move is made
    const [updateLobby] = useMutation(UPDATELOBBY);

    //subscription that listens for updated lobby data
    const { data, loading } = useSubscription(GAMELOBBYSUB, { variables: { lobbyName: name } });

    //this use effect runs whenever data changes the if condition checks if the subscription is loading.  If it is not loading the local state gets updated to the newest gameboard and the turn is set to the opposite of what it was originally
    useEffect(() => {
        if (!loading) {
            let didBoardChange: boolean | undefined;
            let indexOfChange: number | undefined;
            const newLocalGameBoard: string[][] = [...localGameBoard]
            newLocalGameBoard.forEach((column: string[], index: number) => {
                if (column.length !== data.gameLobbyChanged.gameboard[index].length) {
                    didBoardChange = true;
                    indexOfChange = index;
                }
            })
            setPlayAgain(data.gameLobbyChanged.isGameFinished);
            setChatMessages(data.gameLobbyChanged.messages);
            if (didBoardChange && indexOfChange !== undefined) {
                renderAnimation(newLocalGameBoard, indexOfChange, "opponentMove", () => {
                    dispatch(data.gameLobbyChanged.gameboard);
                    setTurn(!playerTurn);
                });
            }
        }
    }, [data]);

    useEffect(() => {
        if (!Auth.loggedIn()) {
            navigate("/");
        }
    }, []);

    // retrieve username of opponent
    if (!loading && playerType === "host") {
        opponentUsername = data.gameLobbyChanged.members[1].username;
    } else {
        opponentUsername = JSON.parse(localStorage.getItem('GameBoard') || '').members[0].username;
    }

    //this use effect runs whenever the player turn changes this allows the board to be checked for wins after data is recieved from the subscription
    useEffect(() => {
        didWin();
    }, [playerTurn]);

    //sets the value of the sentMessage state 
    const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSendMessage(e.currentTarget.value);
    };

    //when the message is sent(form is submitted) it prevents a refresh and uses the sendMessage mutation to update the game lobby model in the mongodb 
    const handleMessageSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await sendMessage({ variables: { message: sentMessage, GameLobby_id: gameId } });
            setSendMessage("");
        } catch (err) {
            console.error(err);
        }
    };

    // this checks if they are the host.  If they are they are represented with an x if not an O
    const piece = (playerType === 'host') ? 'x' : 'O';

    //creates a new state then pushes either an x or O to the column that was clicked on 
    const updateBoard = async (index: number) => {
        const newLocalGameBoard = [...localGameBoard];
        newLocalGameBoard[index].push(piece);
        dispatch(newLocalGameBoard);
        setTurn(!playerTurn);
        await updateLobby({ variables: { gameboard: newLocalGameBoard, lobbyName: name } }); //uses the updateLobby mutation to update the gameboard in mongodb
    };

    //this function takes in a string to test and uses regex to see if there are four x or O next to each other in the string
    const regexTest = async (testString: string) => {
        const regexColX = /xxxx/;
        const regexColO = /OOOO/;
        if (regexColX.test(testString)) {// the .test returns a boolean, if its true that means x has gotten four in a row
            updateModalState({ type: 'showWinnerModal', whoWon: `${data.gameLobbyChanged.members[0].username} Won!` })//updates the global modal state to display the winner modal;
            await updateLobby({ variables: { gameboard: localGameBoard, lobbyName: name, isGameFinished: true } });
        } else if (regexColO.test(testString)) {// if this test returns true then O has gotten four in a row
            updateModalState({ type: 'showWinnerModal', whoWon:`${data.gameLobbyChanged.members[1].username} Won!` });
            await updateLobby({ variables: { gameboard: localGameBoard, lobbyName: name, isGameFinished: true } });
        };
    };

    //this function looks at the gameboard state and for each array in it, it joins them into a string then runs the regexTest function on it
    const checkColWin = async () => {
        let isFull = true;
        localGameBoard.forEach((col) => {
            const stringCol = col.join('');
            regexTest(stringCol);
            if(col.length < 6){
                isFull = false
            };
        });
        if(isFull){
            updateModalState({type:'showWinnerModal', whoWon:'Its a draw, both players won!'});
            await updateLobby({ variables: { gameboard: localGameBoard, lobbyName: name, isGameFinished: true } });
        }
    };

    //this function uses a for loop that represents the height of the board to check row wins for each row;
    const checkRowWin = () => {
        for (let i = 0; i < 6; i++) {//6 is the maximum length for each column in our game board
            const stringRow = localGameBoard.map((col) => col[i] || ' ').join('');//maps over the gameboard array and then if a piece exist it returns it otherwise it returns a space it then joins it into a string
            regexTest(stringRow)//test each string representing rows
        };
    };

    const checkDiagonalWin = () => {
        for (let i = 3; i < 6; i++) {
            let westDiagonal: string = '';
            for (let j = 0; j < 6; j++) {
                if (localGameBoard[j][i - j]) {
                    westDiagonal += localGameBoard[0 + j][i - j]
                } else {
                    westDiagonal += ' '
                };
            };
            regexTest(westDiagonal);
        };

        for (let i = 1; i < 4; i++) {
            let northWestDiagonal: string = '';
            for (let j = 0; j < 6; j++) {
                if (localGameBoard?.[i + j]?.[5 - j]) {
                    northWestDiagonal += localGameBoard[i + j][5 - j];
                } else {
                    northWestDiagonal += ' '
                };
            };
            regexTest(northWestDiagonal);
        };

        for (let i = 3; i < 6; i++) {
            let northEastDiagonal: string = '';
            for (let j = 0; j < 6; j++) {
                if (localGameBoard?.[i - j]?.[5 - j]) {
                    northEastDiagonal += localGameBoard[i - j][5 - j];
                } else {
                    northEastDiagonal += ' ';
                };
            };
            regexTest(northEastDiagonal);
        };

        for (let i = 5; i > 2; i--) {
            let eastDiagonal: string = '';
            for (let j = 0; j < 6; j++) {
                if (localGameBoard[6 - j][i - j]) {
                    eastDiagonal += localGameBoard[6 - j][i - j];
                } else {
                    eastDiagonal += ' ';
                };
            };
            regexTest(eastDiagonal);
        };
    };

    //this function acts as a controller making it quick to run every test
    function didWin() {
        checkColWin();
        checkRowWin();
        checkDiagonalWin();
    };

    const renderAnimation = async function (newLocalGameBoard: string[][], index: number, moveType: string, cb?: () => void) {
        const initialLength = newLocalGameBoard[index].length;
        for (let i: number = 5; i >= initialLength; i--) {
            const ArrayToConcat: string[] = Array(i - initialLength).fill("null");
            if (moveType === "hostMove") {
                newLocalGameBoard[index] = piece === 'x' ? [...newLocalGameBoard[index], ...ArrayToConcat, "x"] : [...newLocalGameBoard[index], ...ArrayToConcat, "O"];
            } else {
                newLocalGameBoard[index] = piece === 'x' ? [...newLocalGameBoard[index], ...ArrayToConcat, "O"] : [...newLocalGameBoard[index], ...ArrayToConcat, "x"];
            }
            dispatch(newLocalGameBoard);
            forceUpdate();
            await new Promise(resolve => setTimeout(resolve, 125));
            newLocalGameBoard[index].splice(initialLength, 6);
            dispatch(newLocalGameBoard);
            forceUpdate();
        }
        if (cb) {
            cb();
        }
    }

    async function whatPositionPicked(e: MouseEvent<HTMLTableRowElement>) {
        const index = Number(e.currentTarget.getAttribute('data-index'))

        if (inProgress || !playerTurn || playAgain || !data || localGameBoard[index].length === 6) return;

        setInProgress(true);
        let newLocalGameBoard = [...localGameBoard];

        await renderAnimation(newLocalGameBoard, index, "hostMove");

        if (playerTurn && newLocalGameBoard[index].length < 6) {
            updateBoard(index);
            setInProgress(false);
        }
    };

    function handleCopyToClipboard() {
        if (showClipMessage) return;

        navigator.clipboard.writeText(name);
        setShowClipMessage(true);
        setTimeout(()=>{
            setShowClipMessage(false);
        }, 3000)
    }

    const handlePlayAgain = async () => {
        await updateLobby({ variables: { gameboard: [[], [], [], [], [], [], []], lobbyName: name, isGameFinished: false } });
    };

    const handleLeaveGame = async () => {
        navigate('/');
    }

    function renderColor(boardCell: string) {
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
                ((data && data.gameLobbyChanged.lobbyIsFull) || playerType === "sub") ?
                    <td key={`col:${columnIndex}-cell:${j}`} className={playAgain ? "boardCell" : "boardCell hover"}><BsFillCircleFill size="85px" color={renderColor(localGameBoard[columnIndex][j])} /></td>
                    :
                    <Skeleton key={`skel-col:${columnIndex}-cell:${j}`} variant="rectangular" width={110} height={110} sx={{ margin: "0px 10px" }} />
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


    return (
        <>
            <div className="gameboard-wrapper">
                {((data && data.gameLobbyChanged.lobbyIsFull) || playerType === "sub") ?
                    <>
                        {playAgain ?
                            <Box sx={{width: "17%", display: "flex", flexDirection: "column", justifyContent: "center"}}>
                                <h1 style={{ color: "lightgray", textAlign: "center" }}>
                                    Game Over
                                </h1>
                                <Box sx={{ display: "flex", justifyContent: "center" }}>
                                    <Button variant="outlined" onClick={handlePlayAgain}>Play again?</Button>
                                </Box>
                                <Box sx={{ display: "flex", justifyContent: "center" }}>
                                    <Button variant="outlined" onClick={handleLeaveGame}>Leave Game</Button>
                                </Box>
                            </Box>
                        :
                            <>
                                <h1 style={playerTurn ? { color: "lightgray", width: "17%", textAlign: "center" } : { display: "none" }}>
                                    <span className={playerType === "host" ? "player-turn-1" : "player-turn-2"}>Your</span> Turn
                                </h1>
                                <h1 style={playerTurn ? { display: "none" } : { color: "lightgray", width: "17%", textAlign: "center" }}>
                                    <span className={playerType === "host" ? "player-turn-2" : "player-turn-1"}>{opponentUsername}'s</span> Turn
                                </h1>
                            </>
                        }
                    </>
                    :
                    <h1 style={{ visibility: "visible", color: "lightgray", width: "17%", textAlign: "center" }}>Waiting for Opponent</h1>
                }
                <table style={{ margin: "0px 50px 0px 50px" }}>
                    <tbody style={{ transform: "rotate(-90deg)" }}>
                        {renderBoard()}
                    </tbody>
                </table>
                <div>
                    <div  style={{display: "flex", justifyContent: "center", margin: "0", alignItems: "center"}}>
                        <h2 style={{color: "gray", margin: "0"}}>Lobby:</h2>
                        <h2 onClick={handleCopyToClipboard} style={{color: "white", margin: "0 0 0 3%", cursor: "pointer"}}>{name}</h2>
                        <ContentCopyIcon onClick={handleCopyToClipboard} style={{color: "#8ac1eb", marginLeft: "1.2%", cursor: "pointer"}}/>
                    </div>
                    <h4 style={{textAlign: "center", margin: "0 0 2% 0", color: "#444444", visibility: (showClipMessage) ? "visible": "hidden"}}>&#10003; Copied to clipboard</h4>
                    <ChatBox data={data} username={username} piece={piece} handleMessageSubmit={handleMessageSubmit} chatMessages={chatMessages} sentMessage={sentMessage} handleMessageChange={handleMessageChange} />
                </div>
            </div>
        </>
    );
};