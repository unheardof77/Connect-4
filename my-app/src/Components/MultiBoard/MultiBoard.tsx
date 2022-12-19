import { useState, MouseEvent, Dispatch, SetStateAction, useReducer, useEffect } from "react";
import {BsFillCircleFill} from "react-icons/bs";
import { Skeleton } from "@mui/material/";
import { useModalContext } from "../../utils/statemanagment/globalstate";
import '../Board/Board.css';
import { useMutation, useSubscription } from "@apollo/client";
import { UPDATELOBBY, SENDMESSAGE } from "../../utils/crud/Mutation";
import { GAMELOBBYSUB } from "../../utils/crud/Subscription";
import Auth from "../../utils/auth/auth"


interface Props {
    winner: string;
    setWinner: Dispatch<SetStateAction<string>>;
    playerType: string;
}

interface ProfileData {
    friends: [];
    username: string;
    _id: string;
}

interface Profile {
    data: ProfileData;
    exp: number;
    iat: number;
}

export default function MultiBoard({winner, setWinner, playerType}:Props) {
    const [playerTurn, setTurn] = useState(playerType === 'host');//sets initial state value for the player turn if there host they go first
    const [inProgress, setInProgress] = useState(false); //this is the state for the animation when a piece is dropped from the top
    const [state, dispatch] = useState<string[][]>([[],[],[],[],[],[],[]]);//local state for the game board
    const [sentMessage, setSendMessage] = useState("");//state representing the value of the message they can send;

    const { updateModalState } = useModalContext();// this is the dispatch action for the modals
    const [ignored, forceUpdate] = useReducer(x=> x+ 1, 0);// gives us access to force rerender the game board, used when animated the pieces falling

    //these two lines of code get the id and name of the game lobby and parse it
    const gameId = JSON.parse(localStorage.getItem('GameBoard') || '')._id;
    const name = JSON.parse(localStorage.getItem('GameBoard') || '').name;
    const profile = Auth.getProfile() as Profile;
    const username = profile.data.username;
    let opponentUsername: string = "";


    //mutation for sending a message
    const [sendMessage] = useMutation(SENDMESSAGE);

    //mutation for updating the lobby ie mutation thats used whenever a move is made
    const [updateLobby] = useMutation(UPDATELOBBY);

    //subscription that listens for updated lobby data
    const { data, loading } = useSubscription(GAMELOBBYSUB, {variables:{lobbyName:name}});

    //this use effect runs whenever data changes the if condition checks if the subscription is loading.  If it is not loading the local state gets updated to the newest gameboard and the turn is set to the opposite of what it was originally
    useEffect(()=>{
        if(!loading){
            console.log(data)
            console.log(data.gameLobbyChanged.members[1].username)
            let didBoardChange: boolean | undefined;
            let indexOfChange: number | undefined;
            const newState: string[][] = [...state]
            newState.forEach((column: string[], index: number) => {
                if (column.length !== data.gameLobbyChanged.gameboard[index].length) {
                    didBoardChange = true;
                    indexOfChange = index;
                    console.log("detected change")
                }
            })
            // const renderAnimationUE = async function() {
            //     console.log("AnimationStarted")
            //     await renderAnimation(newState, indexOfChange)
            //     console.log("Animation Completed")
            // }
            if (didBoardChange && indexOfChange !== undefined) {
                renderAnimation(newState, indexOfChange, "opponentMove", () => {
                    console.log("beyond animation function")
                    dispatch(data.gameLobbyChanged.gameboard);
                    setTurn(!playerTurn);
                });
            }
        }
    }, [data]);

    if (!loading && playerType === "host") {
        opponentUsername = data.gameLobbyChanged.members[1].username;
    } else {
        opponentUsername = JSON.parse(localStorage.getItem('GameBoard') || '').members[0].username;
    }

    //this use effect runs whenever the player turn changes this allows the board to be checked for wins after data is recieved from the subscription
    useEffect(()=>{
        didWin();
    }, [playerTurn]);

    //sets the value of the sentMessage state 
    const handleMessageChange = (e:React.ChangeEvent<HTMLInputElement>) =>{
        setSendMessage(e.currentTarget.value);
    };

    //when the message is sent(form is submitted) it prevents a refresh and uses the sendMessage mutation to update the game lobby model in the mongodb 
    const handleMessageSubmit = async (e:React.FormEvent)=>{
        e.preventDefault();
        try{
            await sendMessage({variables:{message: sentMessage, GameLobby_id: gameId}});
        }catch(err){
            console.error(err);
        }
    };

    // this checks if they are the host.  If they are they are represented with an x if not an O
    const piece = (playerType === 'host') ? 'x' : 'O';

    //creates a new state then pushes either an x or O to the column that was clicked on 
    const updateBoard = async (index:number) =>{
        const newState = [...state];
        newState[index].push(piece);
        // const promisedSetState = (newState: string[][]) => new Promise(resolve => dispatch(newState, resolve)); //updates the gameboard local state to the new one
        dispatch(newState);
        setTurn(!playerTurn);
        await updateLobby({variables:{gameboard: newState, lobbyName:name }}); //uses the updateLobby mutation to update the gameboard in mongodb
    };

    //this function takes in a string to test and uses regex to see if there are four x or O next to each other in the string
    const regexTest = (testString: string) => {
        const regexColX = /xxxx/;
        const regexColO = /OOOO/;
        if (regexColX.test(testString)) {// the .test returns a boolean, if its true that means x has gotten four in a row
            setWinner("Player 1");
            updateModalState({type:'showWinnerModal'})//updates the global modal state to display the winner modal;
        } else if (regexColO.test(testString)) {// if this test returns true then O has gotten four in a row
            setWinner("Player 2");
            updateModalState({type:'showWinnerModal'})
        };
    };

    //this function looks at the gameboard state and for each array in it, it joins them into a string then runs the regexTest function on it
    const checkColWin = () => {
        state.forEach((col) => {
            const stringCol = col.join('');
            regexTest(stringCol)
        });
    };

    //this function uses a for loop that represents the height of the board to check row wins for each row;
    const checkRowWin = () => {
        for (let i = 0; i < 6; i++) {//6 is the maximum length for each column in our game board
            const stringRow = state.map((col) => col[i] || ' ').join('');//maps over the gameboard array and then if a piece exist it returns it otherwise it returns a space it then joins it into a string
            regexTest(stringRow)//test each string representing rows
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

    //this function acts as a controller making it quick to run every test
    function didWin() {
        checkColWin();
        checkRowWin();
        checkDiagonalWin();
    };

    const renderAnimation = async function(newState: string[][], index: number, moveType: string, cb?: ()=>void) {
        const initialLength = newState[index].length;
        for (let i:number=5; i>=initialLength; i--) {
            const ArrayToConcat: string[] = Array(i-initialLength).fill("null");
            if (moveType === "hostMove") {
                newState[index] = piece === 'x' ? [...newState[index], ...ArrayToConcat, "x"] : [...newState[index], ...ArrayToConcat, "O"];
            } else {
                newState[index] = piece === 'x' ? [...newState[index], ...ArrayToConcat, "O"] : [...newState[index], ...ArrayToConcat, "x"];
            }
            dispatch(newState);
            forceUpdate();
            await new Promise(resolve => setTimeout(resolve, 125));
            newState[index].splice(initialLength, 6);
            dispatch(newState);
            forceUpdate();
        }
        if (cb) {
            cb();
        }
    }

    async function whatPositionPicked(e: MouseEvent<HTMLTableRowElement>) {
        if (inProgress || !playerTurn) return;

        setInProgress(true);
        const index = Number(e.currentTarget.getAttribute('data-index'))
        let newState = [...state];

        await renderAnimation(newState, index, "hostMove");

        if (playerTurn && newState[index].length < 6) {
            updateBoard(index);
            setInProgress(false);
        }
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
                ((data && data.gameLobbyChanged.lobbyIsFull) || playerType === "sub") ?
                    <td key={`col:${columnIndex}-cell:${j}`} className="boardCell"><BsFillCircleFill size="85px" color={renderColor(state[columnIndex][j])}/></td>
                :
                    <Skeleton variant="rectangular" width={110} height={110} sx={{margin: "0px 10px"}}/>
            )
        }
        return cellArray;
    }

    function renderBoard() {
        const colsArray = []
        for (let i:number=0; i<7; i++) {
            colsArray.push(
                <tr key={`col:${i}`} style={{margin: "20px"}} data-index={i} onClick={whatPositionPicked} className="boardCell-wrapper">
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
                <h1 style={playerTurn ? {visibility: "visible", color: "lightgray"} : {visibility: "hidden"}}>
                    <span className={playerType ==="host" ? "player-turn-1" : "player-turn-2"}>{username}'s</span> Turn
                </h1>
            :
                <h1 style={{visibility: "visible", color: "lightgray"}}>Opponent Joining</h1>
            }
                <table style={{margin: "0px 50px 0px 50px"}}>
                    <tbody style={{transform: "rotate(-90deg)"}}>
                        {renderBoard()}
                    </tbody>
                </table>
                <h1 style={playerTurn ? {visibility: "hidden"} : {visibility: "visible", color: "lightgray"}}>
                    <span className={playerType ==="host" ? "player-turn-2" : "player-turn-1"}>{opponentUsername}'s</span> Turn
                </h1>
            </div>
            <form onSubmit={handleMessageSubmit}>
                <input value={sentMessage} onChange={handleMessageChange} ></input>
                <button type="submit">SendMessage</button>
            </form>
        </>
    );
};