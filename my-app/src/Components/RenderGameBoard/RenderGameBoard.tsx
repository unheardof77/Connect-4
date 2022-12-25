import { RenderGameBoardProps } from "../../utils/types/types";
import { BsFillCircleFill } from "react-icons/bs";
import { Skeleton, Box } from '@mui/material'

export default function RenderGameBoard({playAgain, gameBoard, whatPositionPicked, data, playerType}:RenderGameBoardProps){

    function renderColor(boardCell: string): string {
        switch (boardCell) {
            case "x": return "#b69f34";
            case "O": return "#c93030";
            default: return "#121212";
        }
    }

    function renderCells(columnIndex: number) {
        if(playerType){
            const cellArray = [];
            for (let j: number = 0; j < 6; j++) {
                cellArray.push(
                    ((data && data.gameLobbyChanged.lobbyIsFull) || playerType === "sub") ?
                        <td key={`col:${columnIndex}-cell:${j}`} className={playAgain ? "boardCell" : "boardCell hover"}><BsFillCircleFill size="85px" color={renderColor(gameBoard[columnIndex][j])} /></td>
                        :
                        <Skeleton key={`skel-col:${columnIndex}-cell:${j}`} variant="rectangular" width={110} height={110} sx={{ margin: "0px 10px" }} />
                )
            }
            return cellArray;

        }else{
            const cellArray = [];
            for (let j: number = 0; j < 6; j++) {
                cellArray.push(
                    <td key={`col:${columnIndex}-cell:${j}`} className={playAgain ? "boardCell" : "boardCell hover"}><BsFillCircleFill size="85px" color={renderColor(gameBoard[columnIndex][j])} /></td>
                )
            }
            return cellArray;
        }

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

    return(
        <table style={{ margin: "0px 50px 0px 50px" }}>
            <tbody style={{ transform: "rotate(-90deg)" }}>
            {renderBoard()}
            </tbody>
        </table>
    )
};