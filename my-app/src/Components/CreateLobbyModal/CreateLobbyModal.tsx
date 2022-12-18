import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
import Typography from '@mui/material/Typography';
import FilledInput from '@mui/material/FilledInput';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { TransitionProps } from '@mui/material/transitions';
import { TextField, Box } from '@mui/material';
import { forwardRef, useState, FormEvent, ChangeEvent, MouseEvent } from 'react';
import { useMutation } from '@apollo/client';
import { login } from '../../utils/crud/Mutation';
import { useModalContext } from '../../utils/statemanagment/globalstate';
import Auth from '../../utils/auth/auth';
import { CREATELOBBY } from '../../utils/crud/Mutation';
import { useNavigate } from 'react-router-dom';

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
    const [gameLobbyStatus, setGameLobbyStatus] = useState(false);
    const [createLobby] = useMutation(CREATELOBBY);
    const navigate = useNavigate();

    const handleClose = () => {
        setGameName("");
        setGameLobbyStatus(false);
        updateModalState({ type: 'hideLobbyModal' });
    };

    const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
        console.log('insubmit')
        e.preventDefault();
        if (!gameName) {
            console.log('empty')
        } else {
            try {
                const { data } = await createLobby({ variables: { name: gameName} });
                localStorage.setItem('GameBoard', JSON.stringify(data.createGameLobby));
                handleClose();
                navigate('/multiplayer/host');
            } catch (err) {
                console.error(err);
                setGameLobbyStatus(true);
            }
        }
    };

    const handleGameNameValue = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setGameName(e.currentTarget.value);
    };

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
                    <Typography variant="h4" component="h6" sx={{ margin: "0px 0px 25px 0px" }}>Create Game</Typography>
                    <TextField
                        error={gameLobbyStatus}
                        fullWidth
                        id="standard-basic" name='gameName' value={gameName} onChange={handleGameNameValue} label="Enter Lobby Name"
                        variant="filled"
                        sx={{ margin: "0px 0px 15px 0px" }}
                        required
                    />
                    
                    {gameLobbyStatus ? <Typography variant="subtitle1" component="p" sx={{ color: "#f44332", margin: "0px 0px 12px 0px" }}>Oops, something went wrong.</Typography> : null}
                    <Button sx={{ margin: "10px 20px 0px 0px" }} variant="outlined" type='submit'>Create</Button>
                    <Button sx={{ margin: "10px 0px 0px 0px" }} variant="outlined" onClick={handleClose}>Cancel</Button>
                    
                </Box>
            </Dialog>
        </div>
    );
}