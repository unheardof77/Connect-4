import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
import Typography from '@mui/material/Typography';
import { TransitionProps } from '@mui/material/transitions';
import { TextField, Box } from '@mui/material';
import { forwardRef, useState, useEffect, FormEvent, ChangeEvent, ReactElement, Ref } from 'react';
import { useMutation } from '@apollo/client';
import { useModalContext } from '../../utils/statemanagment/globalstate';
import { UPDATELOBBY } from '../../utils/crud/Mutation';
import {  useNavigate } from 'react-router-dom';
import { GameLobbyError } from '../../utils/types/types';

const Transition = forwardRef(function Transition(
    props: TransitionProps & {
        children: ReactElement<any, any>;
    },
    ref: Ref<unknown>,
) {
    return <Slide direction="down" ref={ref} {...props} />;
});

export default function JoinGameModal() {
    const { modalState, updateModalState } = useModalContext();
    const [gameName, setGameName] = useState("");
    const [gameLobbyStatus, setGameLobbyStatus] = useState<GameLobbyError>({status:false, message:''});
    const [createLobby] = useMutation(UPDATELOBBY);
    const navigate = useNavigate();

    const handleClose = () => {
        setGameName("");
        setGameLobbyStatus({status:false, message:''});
        updateModalState({ type: 'hideJoinModal' });
    };

    const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (gameName.length>15) return;
        try {
            const { data } = await createLobby({ variables: { lobbyName: gameName} });
            localStorage.setItem('GameBoard', JSON.stringify(data.updateGameLobby));
            handleClose();
            navigate('/multiplayer/sub');
        } catch (err:any) {
            const newError = {...err}
            setGameLobbyStatus({status:true, message: newError.message});
        }
    };

    const handleGameNameValue = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setGameName(e.currentTarget.value);
    };

    useEffect(()=>{
        if (gameName.length > 15) {
            setGameLobbyStatus({status: true, message: 'Lobby name too long (max length: 15 characters)'})
        } else {
            setGameLobbyStatus({status: false, message: ''})
        }
    }, [gameName])

    return (
            <Dialog
                open={modalState.joinModal}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
                fullWidth
            >
                <Box component='form' onSubmit={handleFormSubmit} padding={4}>
                    <Typography variant="h4" component="h6" sx={{ margin: "0px 0px 25px 0px" }}>Join Multiplayer Game</Typography>
                    <TextField
                        error={gameLobbyStatus.status}
                        fullWidth
                        name='gameName' value={gameName} onChange={handleGameNameValue} label="Enter Lobby Name"
                        variant="filled"
                        sx={{ margin: "0px 0px 15px 0px" }}
                        required
                    />
                    
                    {gameLobbyStatus.status ? <Typography variant="subtitle1" component="p" sx={{ color: "#f44332", margin: "0px 0px 12px 0px" }}>{gameLobbyStatus.message}</Typography> : null}
                    <Button sx={{ margin: "10px 20px 0px 0px" }} variant="outlined" type='submit'>Join</Button>
                    <Button sx={{ margin: "10px 0px 0px 0px" }} variant="outlined" onClick={handleClose}>Cancel</Button>
                    
                </Box>
            </Dialog>
    );
}