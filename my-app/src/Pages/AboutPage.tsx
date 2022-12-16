import {Box, Typography, Divider} from '@mui/material';
import Header from '../Components/Header/Header';
import LoginModal from '../Components/LoginModal/LoginModal';
import SignupModal from '../Components/SignupModal/SignupModal';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from '../Components/CheckoutForm/CheckoutForm';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import { getCheckout } from '../utils/crud/Query';
import { useLazyQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const stripePromise = loadStripe('pk_test_51MF246FhLt5A8AbKPxxbzKomjN1l6ggWollsfH66RgVcL9sQrObPHh1kOuZL1b7W7Q7IsO8SjIvh6TUNuiDZr96M006pbFiehi')

export default function AboutPage(){
    const [donationAmount, setDonationAmount] = useState('');

    const [ createCheckout, {data: checkoutData}] = useLazyQuery(getCheckout);

    useEffect(()=>{
        if(checkoutData){
            stripePromise.then((res)=>{
                res?.redirectToCheckout({sessionId: checkoutData.checkout.session})
            })
        }
    }, [checkoutData]);

    const handleDonationChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setDonationAmount(e.target.value)
    }

    const handleDonationSubmit = async (e:React.FormEvent) =>{
        e.preventDefault();
        try{
            await createCheckout({variables: { donationAmount: parseInt(donationAmount) }})
        }catch(err){
            console.error(err);
        }
    }

    return(
        <>
            <Header/>
            <Box component='div' sx={{width:"100%", height: "300px", display: 'flex', justifyContent:'center', alignItems:'center' }}>
                <Typography variant='h1' component='h1'>Meet the Developers</Typography>
            </Box>
            <Box component='section' sx={{width:"100%", display:'flex', flexDirection:'column', alignItems:'center'}}>
                <Box component='article' sx={{width: "50%"}} >
                    <Typography variant='h2' component='h2' sx={{fontSize: "3em", color: "lightgray", marginBottom: "20px"}}>Morgan Tolman</Typography>
                    <Typography variant='h2' component='h2' sx={{fontSize: "1.5em", color: "gray", marginBottom: "20px"}}> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore assumenda aut dolor a accusantium alias sequi ratione sunt dignissimos esse dicta deleniti, consequuntur voluptatibus quo voluptates! Perspiciatis corrupti accusamus cupiditate! </Typography>
                    <Box sx={{marginBottom: "20px"}}>
                        <GitHubIcon sx={{fontSize: "3em", color: 'gray', marginRight: "10px"}}/>
                        <LinkedInIcon sx={{fontSize: "3em", color: 'gray', marginRight: "10px"}}/>
                        <BusinessCenterIcon sx={{fontSize: "3em", color: 'gray', marginRight: "10px"}}/>
                    </Box>
                    <Divider light sx={{width: "100%"}}/>
                </Box>
                <Box component='article' sx={{width: "50%"}} >
                    <Typography variant='h2' component='h2' sx={{fontSize: "3em", textAlign: "end", color: "gray"}}>Toacin Patwary</Typography>
                    <Divider light sx={{width: "100%"}}/>
                </Box>
                <Divider />
                <Box component='article' sx={{width: "50%"}} >
                    <Typography variant='h2' component='h2' sx={{fontSize: "3em", color: "gray"}}>History</Typography>
                    <Divider />
                </Box>
                <Box component='article' sx={{width: "50%"}} >
                    <Typography variant='h2' component='h2' sx={{fontSize: "3em", textAlign: "end", color: "gray"}}>Connect4 in the news</Typography>
                    <Divider />
                </Box>
                <Box component='article' sx={{width: "50%"}} >
                    <Typography variant='h2' component='h2' sx={{fontSize: "3em", color: "gray"}}>Content & Engagement</Typography>
                    <Divider />
                </Box>
            </Box>
            <form onSubmit={handleDonationSubmit}>
                <input type='number'  value={donationAmount} onChange={handleDonationChange}></input>
                <button type='submit'>submit</button>
            </form>
            <LoginModal/>
            <SignupModal/>
            {/* <Elements stripe={stripePromise}>
                <CheckoutForm/>
            </Elements> */}
        </>
    )
};