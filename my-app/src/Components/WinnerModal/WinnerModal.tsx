import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { forwardRef } from 'react';
import { useModalContext } from "../../utils/statemanagment/globalstate";

const Transition = forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="down" ref={ref} {...props} />;
});

interface winnerState {
    winner: string
}

export default function WinnerModal({ winner }: winnerState) {
    const { modalState, updateModalState } = useModalContext();

    const handleClose = () => {
        updateModalState({type: "hideWinnerModal"});
    };

    return (
        <Dialog
            open={modalState.winner}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
            fullWidth
        >
            <DialogTitle>{winner} Won!</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    Congratulations
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Close</Button>
            </DialogActions>
        </Dialog>
    );
}