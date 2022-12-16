import {Box, Typography} from '@mui/material';
import Header from '../Components/Header/Header';
import LoginModal from '../Components/LoginModal/LoginModal';
import SignupModal from '../Components/SignupModal/SignupModal';


export default function AboutPage(){

    return(
        <>
            <Header/>
            <Box component='div' sx={{width:"100%", height: 300, display: 'flex', flexDirection:'column', justifyContent:'center', alignContent:'center' }}>
                <Typography variant='h1' component='h1'>Our Team and Goals</Typography>
            </Box>
            <Box component='section' sx={{display:'flex', flexDirection:'column'}}>
                <Box component='article' sx={{display:'flex'}} >
                    <Typography variant='h2' component='h2'>Company</Typography>
                </Box>
                <Box component='article' sx={{display:'flex'}} >
                    <Typography variant='h2' component='h2'>Mission of Connect4</Typography>
                </Box>
                <Box component='article' sx={{display:'flex'}} >
                    <Typography variant='h2' component='h2'>History</Typography>
                </Box>
                <Box component='article' sx={{display:'flex'}} >
                    <Typography variant='h2' component='h2'>Connect4 in the news</Typography>
                </Box>
                <Box component='article' sx={{display:'flex'}} >
                    <Typography variant='h2' component='h2'>Content & Engagement</Typography>
                </Box>
            </Box>
            <LoginModal/>
            <SignupModal/>
        </>
    )
};