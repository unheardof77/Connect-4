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

            <Box sx={{display: 'flex', justifyContent:'center', marginBottom: {xs: '3%', md: "1%"},  flexShrink:'3',}}>
                <Box component='img' src={Logo} sx={{margin:{xs: '7%', md: '2%'},  display:'flex', width: {xs: "70%", sm: "60%", lg: "50%"}}}></Box>
            </Box>
            <Box component='section'>
                <Box sx={{ display: 'flex', width: '100%', flexDirection:{xs:'column', md:'row'}, alignItems:{xs:'center', md: 'start'}, marginBottom: {xs: "10%", md: "0"} }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', width: {xs: "70%", md: "50%"}, alignItems: 'center' }}>
                        <Box sx={{width:{xs:'100%', md:'65%'}, marginBottom:{xs: '10%', md: '3%'}}}>
                            <Typography component="h2" sx={{color:'lightgray', fontSize:'3em'}} >Local Multiplayer</Typography>
                            <Typography component="p" sx={smallTextStyles} >Compete with your friends in a local game.</Typography>
                            <Button sx={{marginTop:'2%'}} variant="outlined" onClick={() => navigate('/local')}>Local game</Button>
                        </Box>
                        <Box sx={{width:{xs:'100%', md:'65%'}, marginBottom:{xs: '14%', md: '3%'}}}>

                            <Typography component="h2" sx={{color:'lightgray', fontSize:'3em'}} >Online Multiplayer</Typography>
                            <Typography component='p' sx={{color:'gray', fontSize:'1.5em', marginBottom:'2%'}}>Compete with your friends in an online game. One player must create and host a game, then the other may join that game.</Typography>

                            {Auth.loggedIn() ?
                                <>
                                    <Button sx={{marginRight:'3%'}} onClick={() => updateModalState({ type: 'showLobbyModal' })} variant="outlined">Create Game</Button>
                                    <Button onClick={() => updateModalState({ type: 'showJoinModal' })} variant="outlined">Join Game</Button>
                                </>
                                :
                                <>
                                    <Typography component='p' sx={{color:'gray', fontSize:'1em', margin:'2% 0%'}}>Log in to play online.</Typography>
                                    <Button sx={{marginRight:'3%'}} variant='outlined' onClick={() => updateModalState({ type: 'showLogin' })}>Log In</Button>
                                    <Button variant='outlined' onClick={() => updateModalState({ type: 'showSignup' })}>Sign up</Button>
                                </>
                            }
                        </Box>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column', width: {xs: "70%", md: "50%"}, alignItems: 'center', justifyContent:'center' }}>
                        <Box sx={{ width: {xs:'100%', md:'65%'}, display:'flex', flexDirection:'column' }}>
                            <Typography sx={{color:'lightgray', fontSize:'3em'}}>How to play</Typography>
                            <Typography sx={smallTextStyles}>Connect four in a row to win.</Typography>
                            <Box component='div' sx={{ display: 'flex', margin: '2% 0%' }}>
                                <Box sx={smallBoardStyles}><BsFillCircleFill size='40px' color="#b69f34" /></Box>
                                <Box sx={smallBoardStyles}><BsFillCircleFill size='40px' color="#b69f34" /></Box>
                                <Box sx={smallBoardStyles}><BsFillCircleFill size='40px' color="#b69f34" /></Box>
                                <Box sx={smallBoardStyles}><BsFillCircleFill size='40px' color="#b69f34" /></Box>
                            </Box>
                            <Typography sx={smallTextStyles} >&#9724; Players will take turns dropping pieces on the board.</Typography>
                            <Typography sx={smallTextStyles} >&#9724; When a column is clicked, one of your pieces will drop to the bottom of that column.</Typography>
                            <Typography sx={smallTextStyles} >&#9724; After a piece is dropped, players switch turns.</Typography>
                            <Typography sx={smallTextStyles} >&#9724; This pattern repeats until a win is achieved.</Typography>
                            <Typography sx={smallTextStyles} >&#9724; A win is achieved when a player connects four in a row, either diagonally, horizontally, or vertically.</Typography>
                            <Typography sx={smallTextStyles} >&#9724; In the event that the board is filled up and no player achieves a win, it is a draw.</Typography>
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
