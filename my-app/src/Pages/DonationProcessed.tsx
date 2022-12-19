import { Box, Typography } from "@mui/material";
import CircularProgress, { CircularProgressProps } from '@mui/material/CircularProgress';
import { useEffect, useState, useReducer } from 'react'

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
    // const [ignored, forceUpdate] = useReducer(x=> x+ 1, 0);
    // let progress = 0;

    // useEffect(() => {
    //     const timer = setInterval(() => {
    //         if (progress<100) {
    //             setProgress((prevProgress) => ( prevProgress + 1));
    //         }
    //     }, 50);
    //     if(progress==100) {
    //         clearInterval(timer);
    //     }
    //     // return () => {
    //     //     clearInterval(timer);
    //     // };
    // }, []);
    // useEffect(()=> {
    // })
    async function progressIncreaser() {
            await new Promise(resolve => setTimeout(resolve, 10));
            if (progress === 100) {
                return
            }
            setProgress(progress+1);
    }
    progressIncreaser();


    return (
        <Box component="div" sx={{ width: "100%", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
            <img src={Logo} style={{ marginLeft: "2%", marginBottom: "1%" }} />
            <Typography variant='h2' component='h2' sx={{ color: "lightgray", marginBottom: "2%" }}>Donation Processed</Typography>
            <CircularProgressWithLabel value={progress} size="80px"/>
        </Box>
    )
}
