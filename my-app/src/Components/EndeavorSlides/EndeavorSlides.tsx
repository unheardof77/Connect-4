import {useState} from 'react';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import MobileStepper from '@mui/material/MobileStepper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import Vintage from '../../assets/Vintage.jpg'
import Modern2 from '../../assets/Modern2.jpg'
import InverseLogo from '../../assets/InverseLogo.jpg'
import { SlideInfo } from '../../utils/types/types';


const steps: SlideInfo[] = [
    {
        label: 'History',
        description: `"Connect 4, as you know it today, is the game that was trademarked and released by Milton Bradley in 1974. If you have a Connect 4 game that was bought after 1974, then you have the original Milton Bradley version of the game. Milton Bradley was actually a game company that was started by Milton Bradley in Massachusetts in 1860." -Gamesver Team`,
        image: Vintage,
        alt:'Vintage picture of the connect four board game.'
    },
    {
        label: 'Contemporary Connect Four',
        description: `"Connect 4 is a game that has come a long way over the years and that has not been stagnant by any means. Right now, Connect 4 is still making history as more versions of it are created and released." -Gamesver Team`,
        image: Modern2,
        alt:'Modern connect 4 board made out of wood.'
    },
    {
        label: 'Our Mission',
        description: `Morgan and I (Toacin) were sitting in a discord call one day, many miles apart, wishing we can get together to play a game of connect four. With no great alternative online, we decided to make a multiplayer connect four clone, and after some work, we made it happen!`,
        image: InverseLogo,
        alt:'Our connect four logo.'
    }
];

export default function EndeavorSlides() {
    const theme = useTheme();
    const [activeStep, setActiveStep] = useState(0);
    const maxSteps = steps.length;

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    return (
        <Box sx={{ width: "100%", flexGrow: 1 }}>
            <Box sx={{ display: "flex", marginBottom: "60px", alignItems: "center", flexDirection: {xs: "column", lg: "row", justifyContent: "space-between"}}}>
                <Box sx={{ width: {xs: "100%", lg: "50%"} }}>
                    <Typography variant='h2' component='h2' sx={{ fontSize: "2em", color: "lightgray", marginBottom: "20px", textAlign: {xs: "center", lg: "start"}}}>{steps[activeStep].label}</Typography>
                    <Typography variant='h2' component='h2' sx={{ fontSize: "1.5em", color: "gray", marginBottom: "20px", width: "100%" }}> {steps[activeStep].description} </Typography>
                </Box>
                <Box sx={{ width: {xs: "100%", lg: "40%"}, display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <Box component="img" alt={steps[activeStep].alt} src={steps[activeStep].image} sx={{ height: {xs: "400px", lg: "100%"}, width: {xs: "400px", lg: "100%"}, marginLeft: "4%", borderRadius: "5px" }} />
                </Box>
            </Box>
            <Box sx={{ width: "100%", display: "flex", justifyContent: "center"}}>
                <MobileStepper
                    steps={maxSteps}
                    position="static"
                    activeStep={activeStep}
                    nextButton={
                        <Button
                            size="small"
                            onClick={handleNext}
                            disabled={activeStep === maxSteps - 1}
                        >
                            Next
                            {theme.direction === 'rtl' ? (
                                <KeyboardArrowLeft />
                            ) : (
                                <KeyboardArrowRight />
                            )}
                        </Button>
                    }
                    backButton={
                        <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                            {theme.direction === 'rtl' ? (
                                <KeyboardArrowRight />
                            ) : (
                                <KeyboardArrowLeft />
                            )}
                            Back
                        </Button>
                    }
                    sx={{
                        width: {xs: "80%", sm: "80%", lg: "40%"}
                    }}
                />
            </Box>
        </Box>
    );
}