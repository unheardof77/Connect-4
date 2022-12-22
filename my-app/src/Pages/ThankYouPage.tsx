import Header from "../Components/Header/Header";
import { Box, Typography, Button } from "@mui/material";
import SignupModal from "../Components/SignupModal/SignupModal";
import LoginModal from "../Components/LoginModal/LoginModal";
import { Link } from "react-router-dom";


export default function ThankYouPage(){


    return (
        <>
            <Header/>
            <Box component='section'>
            </Box>
            <SignupModal/>
            <LoginModal/>
        </>
    )
};