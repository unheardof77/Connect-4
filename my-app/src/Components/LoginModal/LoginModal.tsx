import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { FormControl, TextField, Box } from '@mui/material';
import {forwardRef, useState, Dispatch, SetStateAction} from 'react';

interface LoginProps {
    loginModalStatus: boolean;
    setLoginModalStatus: Dispatch<SetStateAction<boolean>>;
}

const Transition = forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function LoginModal({loginModalStatus, setLoginModalStatus}:LoginProps) {
    const [ username, setUsername] = useState();
    const [ password, setPassword] = useState();

    const handleClickOpen = () => {
        setLoginModalStatus(true);
    };

    const handleClose = () => {
        setLoginModalStatus(false);
    };



    return (
        <div>
            <Dialog
                open={loginModalStatus}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
                fullWidth
            >
                <Box component='form' padding={5}>
                    <FormControl>
                        <TextField id="standard-basic" label="UserName" variant="standard" />
                        <FormControl fullWidth>
                            <TextField fullWidth id="standard-basic" label="Password" variant="standard" />
                            <TextField id="standard-basic" label="Confirm Password" variant="standard" />
                        </FormControl>
                    </FormControl>

                </Box>

                <DialogActions>
                    <Button onClick={handleClose}>Disagree</Button>
                    <Button onClick={handleClose}>Agree</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}