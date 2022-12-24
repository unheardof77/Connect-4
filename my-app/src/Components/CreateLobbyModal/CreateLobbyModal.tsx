import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
import Typography from '@mui/material/Typography';
import { TransitionProps } from '@mui/material/transitions';
import { TextField, Box } from '@mui/material';
import { forwardRef, useState, FormEvent, ChangeEvent, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { useModalContext } from '../../utils/statemanagment/globalstate';
import { CREATELOBBY } from '../../utils/crud/Mutation';
import { useNavigate } from 'react-router-dom';
import { GameLobbyError } from '../../utils/types/types';

const Transition = forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="down" ref={ref} {...props} />;
});

export default function LobbyModal() {
    const { modalState, updateModalState } = useModalContext();
    const [gameName, setGameName] = useState("");
    const [gameLobbyStatus, setGameLobbyStatus] = useState<GameLobbyError>({ status: false, message: '' });
    const [createLobby] = useMutation(CREATELOBBY);
    const navigate = useNavigate();

    const handleClose = () => {
        setGameName("");
        setGameLobbyStatus({ status: false, message: '' });
        updateModalState({ type: 'hideLobbyModal' });
    };

    const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
        console.log('insubmit')
        e.preventDefault();
        if (gameName.length > 15) return;
        try {
            const { data } = await createLobby({ variables: { name: gameName } });
            localStorage.setItem('GameBoard', JSON.stringify(data.createGameLobby));
            handleClose();
            navigate('/multiplayer/host');
        } catch (err: any) {
            const newError = { ...err }
            console.log(newError.message);
            console.log(/E11000/.test(newError.message))
            switch (true) {
                case /E11000/.test(newError.message):
                    newError.message = "Lobby Name Currently Taken";
                    break;
                default: break;
            }
            setGameLobbyStatus({ status: true, message: newError.message });
        }
};

    const handleGameNameValue = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setGameName(e.currentTarget.value);
    };

    useEffect(() => {
        if (gameName.length > 15) {
            setGameLobbyStatus({ status: true, message: 'Lobby Name Too Long (Max Length: 15 Characters)' })
        } else {
            setGameLobbyStatus({ status: false, message: '' })
        }
    }, [gameName])

    return (
        <div>
            <Dialog
                open={modalState.createLobby}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
                fullWidth
            >
                <Box component='form' onSubmit={handleFormSubmit} padding={4}>
                    <Typography variant="h4" component="h6" sx={{ margin: "0px 0px 25px 0px" }}>Create Multiplayer Game</Typography>
                    <TextField
                        error={gameLobbyStatus.status}
                        fullWidth
                        name='gameName' value={gameName} onChange={handleGameNameValue} label="Enter Lobby Name"
                        variant="filled"
                        sx={{ margin: "0px 0px 15px 0px" }}
                        required
                    />

                    {gameLobbyStatus.status ? <Typography variant="subtitle1" component="p" sx={{ color: "#f44332", margin: "0px 0px 12px 0px" }}>{gameLobbyStatus.message}</Typography> : null}
                    <Button sx={{ margin: "10px 20px 0px 0px" }} variant="outlined" type='submit'>Create</Button>
                    <Button sx={{ margin: "10px 0px 0px 0px" }} variant="outlined" onClick={handleClose}>Cancel</Button>

                </Box>
            </Dialog>
        </div>
    );
}