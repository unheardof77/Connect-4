import { RenderGameBoardProps } from "../../utils/types/types";
import { BsFillCircleFill } from "react-icons/bs";
import { Skeleton, Box } from '@mui/material'

export default function RenderGameBoard({ playAgain, gameBoard, whatPositionPicked, data, playerType }: RenderGameBoardProps) {
    const boardCellStyle = {

    }

    function renderColor(boardCell: string): string {
        switch (boardCell) {
            case "x": return "#b69f34";
            case "O": return "#c93030";
            default: return "#121212";
        }
    }

    function renderCells(columnIndex: number) {
        if (playerType) {
            const cellArray = [];
            for (let j: number = 0; j < 6; j++) {
                cellArray.push(
                    ((data && data.gameLobbyChanged.lobbyIsFull) || playerType === "sub") ?
                        <Box key={`col:${columnIndex}-cell:${j}`} sx={{ width: { xs: "50px", sm: "65px", md: "90px", lg: "110px" }, height: { xs: "50px", sm: "65px", md: "90px", lg: "110px" } }} className={playAgain ? "boardCell" : "boardCell hover"}>
                            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", width: { xs: "39px", sm: "50px", md: "69px", lg: "85px" }, height: { xs: "39px", sm: "50px", md: "69px", lg: "85px" } }}>
                                <BsFillCircleFill size="100%" color={renderColor(gameBoard[columnIndex][j])} />
                            </Box>
                        </Box>
                        :
                        <Skeleton key={`skel-col:${columnIndex}-cell:${j}`} variant="rectangular" width={110} height={110} sx={{ margin: "0px 10px" }} />
                )
            }
            return cellArray;

        } else {
            const cellArray = [];
            for (let j: number = 0; j < 6; j++) {
                cellArray.push(
                    <Box key={`col:${columnIndex}-cell:${j}`} sx={{ width: { xs: "50px", sm: "65px", md: "90px", lg: "110px" }, height: { xs: "50px", sm: "65px", md: "90px", lg: "110px" } }} className={playAgain ? "boardCell" : "boardCell hover"}>
                        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", width: { xs: "39px", sm: "50px", md: "69px", lg: "85px" }, height: { xs: "39px", sm: "50px", md: "69px", lg: "85px" } }}>
                            <BsFillCircleFill size="100%" color={renderColor(gameBoard[columnIndex][j])} />
                        </Box>
                    </Box>
                )
            }
            return cellArray;
        }

    }

    function renderBoard() {
        const colsArray = []
        for (let i: number = 0; i < 7; i++) {
            colsArray.push(
                <Box key={`col:${i}`} sx={{ margin: "20px", display: "flex" }} data-index={i} onClick={whatPositionPicked}>
                    {renderCells(i)}
                </Box>
            )
        }
        return colsArray;
    }

    return (
        <Box sx={{ margin: "0px 50px 0px 50px" }}>
            <Box sx={{ transform: "rotate(-90deg)" }}>
                {renderBoard()}
            </Box>
        </Box>
    )
};