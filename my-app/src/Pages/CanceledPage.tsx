import Header from "../Components/Header/Header";
import { Box, Typography, Button } from "@mui/material";
import SignupModal from "../Components/SignupModal/SignupModal";
import LoginModal from "../Components/LoginModal/LoginModal";
import { Link } from "react-router-dom";

export default function CanceledPage(){

    return (
        <>
            <Header/>
            <Box width='100%' component='section' sx={{ display: 'flex', justifyContent: 'center', alignItems:'center'}}>
                <Box component='section' sx={{ display: 'flex', flexDirection: 'column',  }}>
                    <Typography variant='h2' >Your payment has been canceled.</Typography>
                    <Typography variant="subtitle1" >Click<Link to='/'><Button>here</Button></Link>to return to home page.</Typography>
                </Box>
            </Box>
            <SignupModal/>
            <LoginModal/>
        </>
    )
};