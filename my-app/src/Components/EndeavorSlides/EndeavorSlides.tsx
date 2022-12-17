import * as React from 'react';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import Vintage from '../../assets/Vintage.jpg'
import Modern2 from '../../assets/Modern2.jpg'
import InverseLogo from '../../assets/InverseLogo.jpg'

interface slideInfo {
    label: string;
    description: string;
    image: any;
}

const steps: slideInfo[] = [
    {
        label: 'History',
        description: `Connect 4, as you know it today, is the game that was trademarked and released by Milton Bradley in 1974. If you have a Connect 4 game that was bought after 1974, then you have the original Milton Bradley version of the game. Milton Bradley was actually a game company that was started by Milton Bradley in Massachusetts in 1860.`,
        image: Vintage
    },
    {
        label: 'Contemporary Connect Four',
        description: 'Connect 4 is a game that has come a long way over the years and that has not been stagnant by any means. Right now, Connect 4 is still making history as more versions of it are created and released. ',
        image: Modern2
    },
    {
        label: 'Our Mission',
        description: `Many attribute the earlier concept of the game to one Theodore R. Duncan. Not much is known of this man except that he has a patent in his name for a type of 3D stacking Tic Tac Toe game that involved dropping or stacking in a row. This particular patent was filed on the 6th of August 1946.`,
        image: InverseLogo
    },
];

export default function EndeavorSlides() {
    const theme = useTheme();
    const [activeStep, setActiveStep] = React.useState(0);
    const maxSteps = steps.length;

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    return (
        <Box sx={{ width: "100%", flexGrow: 1 }}>
            <Box sx={{ display: "flex", marginBottom: "40px", alignItems: "center"}}>
                <Box sx={{ width: "50%" }}>
                    <Typography variant='h2' component='h2' sx={{ fontSize: "2em", color: "lightgray", marginBottom: "20px"}}>{steps[activeStep].label}</Typography>
                    <Typography variant='h2' component='h2' sx={{ fontSize: "1.5em", color: "gray", marginBottom: "20px", width: "100%" }}> {steps[activeStep].description} </Typography>
                </Box>
                <Box sx={{ width: "50%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <img src={steps[activeStep].image} style={{ height: "400px", width: "400px", marginLeft: "4%", borderRadius: "5px" }} />
                </Box>
            </Box>
            <MobileStepper
                variant="text"
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
            />
        </Box>
    );
}