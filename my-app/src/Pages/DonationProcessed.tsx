import { Box, Typography } from "@mui/material";
import CircularProgress, { CircularProgressProps } from '@mui/material/CircularProgress';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import CancelIcon from '@mui/icons-material/Cancel';

import Logo from "../assets/Logo.png";

function CircularProgressWithLabel(
    props: CircularProgressProps & { value: number },
) {
    return (
        <Box sx={{ position: 'relative', display: 'inline-flex' }}>
            <CircularProgress variant="determinate" {...props} />
            <Box
                sx={{
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    position: 'absolute',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Typography
                    variant="caption"
                    component="div"
                    color="text.secondary"
                    sx={{fontSize: "2.4em"}}
                >{props.value===100 ? "✓": null}</Typography>
            </Box>
        </Box>
    );
}

export default function DonationProcessed() {
    const [progress, setProgress] = useState(0);
    const { responseType } = useParams();
    const navigate = useNavigate();
    async function progressIncreaser() {
            await new Promise(resolve => setTimeout(resolve, 10));
            if (progress === 100) {
                return
            }
            setProgress(progress+1);
    }
    progressIncreaser();

    useEffect(()=>{
        setTimeout(()=>{
            navigate('/')
        }, 3500)
    }, [])

    return (
        <Box component="div" sx={{ width: "100%", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
            <img src={Logo} style={{ marginLeft: "2%", marginBottom: ".4%" }} />
            <Typography variant='h2' component='h2' sx={{ color: "lightgray", marginBottom: ".5%" }}>Donation {responseType === "success" ? "Processed" : "Cancelled"}</Typography>
            {responseType === "success" ?
                <Typography variant='h4' component='h4' sx={{ color: "gray", marginBottom: "1.1%"}}>Thank you so much!</Typography> 
            :
                <Typography variant='h5' component='h5' sx={{ color: "gray", marginBottom: "1.1%"}}>Don't worry, we still like you &#x1F609;</Typography>
            }
            {responseType === "success" ? <CircularProgressWithLabel value={progress} size="80px"/> : <CancelIcon sx={{color: "#c93030", fontSize: "4em"}}/>}
        </Box>
    )
}