import Logo from '../assets/Logo.png';
import LoginModal from "../Components/LoginModal/LoginModal";
import SignupModal from "../Components/SignupModal/SignupModal";
import Header from "../Components/Header/Header";
import LobbyModal from "../Components/CreateLobbyModal/CreateLobbyModal";
import JoinGameModal from "../Components/JoinGameModal/JoinGameModal";
import { useModalContext } from '../utils/statemanagment/globalstate';
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { BsFillCircleFill } from "react-icons/bs";
import Auth from '../utils/auth/auth';

const smallBoardStyles = { height: '50px', width: '50px', margin: '.5%', border: '2px solid #444444', display: 'flex', justifyContent: 'center', alignItems: 'center' };
const smallTextStyles = {color:'gray', fontSize:'1.5em'};

export default function HomePage() {
    const { updateModalState } = useModalContext();
    const navigate = useNavigate();
    return (
        <>
            <Header />

            <Box component='section'>
                <Box sx={{display: 'flex', justifyContent:'center', marginBottom:'1%'}}>
                    <Box component='img' src={Logo} sx={{margin:'2%'}}></Box>
                </Box>
                <Box sx={{ display: 'flex', width: '100%' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', width: '50%', alignItems: 'center' }}>
                        <Box sx={{width:'65%', marginBottom:'2%'}}>
                            <Typography component="h2" sx={{color:'lightgray', fontSize:'3em'}} >Local Multiplayer</Typography>
                            <Typography component="p" sx={smallTextStyles} >Compete with your friends in a competitive local game.</Typography>
                            <Button sx={{marginTop:'2%'}} variant="outlined" onClick={() => navigate('/local')}>Local game</Button>
                        </Box>
                        <Box sx={{width:'65%'}}>

                            <Typography component="h2" sx={{color:'lightgray', fontSize:'3em'}} >Online Multiplayer</Typography>
                            <Typography component='p' sx={{color:'gray', fontSize:'1.5em', marginBottom:'2%'}}>Compete online with your friends by logging into your accounts then creating a game and sending them the game name.</Typography>

                            {Auth.loggedIn() ?
                                <>
                                    <Button sx={{marginRight:'1%'}} onClick={() => updateModalState({ type: 'showLobbyModal' })} variant="outlined">Create Game</Button>
                                    <Button onClick={() => updateModalState({ type: 'showJoinModal' })} variant="outlined">Join Game</Button>
                                </>
                                :
                                <>
                                    <Typography component='p' sx={{color:'gray', fontSize:'1em', marginTop:'2%'}}>Log in to play online.</Typography>
                                    <Button sx={{marginRight:'1%'}} variant='outlined' onClick={() => updateModalState({ type: 'showLogin' })}>Log In</Button>
                                    <Button variant='outlined' onClick={() => updateModalState({ type: 'showSignup' })}>Sign up</Button>
                                </>
                            }
                        </Box>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column', width: '50%', alignItems: 'center', justifyContent:'center' }}>
                        <Box sx={{ width: '65%', display:'flex', flexDirection:'column'  }}>
                            <Typography sx={{color:'lightgray', fontSize:'3em'}}>How to play</Typography>
                            <Typography sx={smallTextStyles}>Connect four in a row to win.</Typography>
                            <Box component='div' sx={{ display: 'flex' }}>
                                <Box sx={smallBoardStyles}><BsFillCircleFill size='40px' color="#b69f34" /></Box>
                                <Box sx={smallBoardStyles}><BsFillCircleFill size='40px' color="#b69f34" /></Box>
                                <Box sx={smallBoardStyles}><BsFillCircleFill size='40px' color="#b69f34" /></Box>
                                <Box sx={smallBoardStyles}><BsFillCircleFill size='40px' color="#b69f34" /></Box>
                            </Box>
                            <Typography sx={smallTextStyles} >This can be done using diagonals, rows, and columns.</Typography>
                            <Typography sx={smallTextStyles} >When a column is clicked, the one of your pieces is dropped at the bottom.</Typography>
                            <Typography sx={smallTextStyles} >After a piece is dropped the turn switches.</Typography>
                            <Typography sx={smallTextStyles} >This pattern repeats until a win is achieved.</Typography>
                            <Typography sx={smallTextStyles} >In the event that the board is filled up and no player achieves a win, it is a draw.</Typography>
                        </Box>
                    </Box>
                </Box>
            </Box>

            <LoginModal />
            <SignupModal />
            <LobbyModal />
            <JoinGameModal />
        </>
    )
};
