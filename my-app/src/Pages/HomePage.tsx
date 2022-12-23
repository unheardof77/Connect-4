import './PageStyles/HomePage.css'
import LoginModal from "../Components/LoginModal/LoginModal";
import SignupModal from "../Components/SignupModal/SignupModal";
import Header from "../Components/Header/Header";
import LobbyModal from "../Components/CreateLobbyModal/CreateLobbyModal";
import JoinGameModal from "../Components/JoinGameModal/JoinGameModal";
import { useModalContext } from '../utils/statemanagment/globalstate';
import { Box, Typography, Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import Auth from '../utils/auth/auth'


export default function HomePage(){
    const {updateModalState} = useModalContext();
    const navigate = useNavigate();
    return(
        <>
            <Header/>

            <Box component='section'>
                <Box>{/**Logo image below header */}</Box>
                <Box sx={{display:'flex'}}>
                    <Box sx={{display:'flex', flexDirection:'column'}}>
                        <Box>
                            <Typography component="h2" >Single player</Typography>
                            <Typography component="p">Compete with your friends in a competitive local game.</Typography>
                            <Button variant="outlined" onClick={()=> navigate('/local')}>Single player</Button>
                        </Box>
                        <Box>
                        <Typography component="h2" >MultipLayer</Typography>
                        <Typography component='p'>Compete online with your friends by logging into your accounts then creating a game and sending them the game name.</Typography>

                        {Auth.loggedIn()?<>
                            <Button onClick={()=>updateModalState({type: 'showLobbyModal'})} variant="outlined">Create Game</Button>
                            <Button onClick={()=>updateModalState({type: 'showJoinModal'})} variant="outlined">Join Game</Button>
                        </> :
                        <>
                            <Typography component='p'>Log in to play online.</Typography>
                            <Button variant='outlined' onClick={()=> updateModalState({type: 'showLogin'})}>Log In</Button>
                            <Button variant='outlined' onClick={()=> updateModalState({type: 'showSignup'})}>Sign up</Button>
                        </>
                            }
                        </Box>
                    </Box>
                    <Box sx={{display:'flex', flexDirection:'column'}}>

                    </Box>
                </Box>
            </Box>

            <LoginModal/>
            <SignupModal/>
            <LobbyModal/>
            <JoinGameModal/>
        </>
    )
};
