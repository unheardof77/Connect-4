import {Box, Typography} from '@mui/material';
import Header from '../Components/Header/Header';
import LoginModal from '../Components/LoginModal/LoginModal';
import SignupModal from '../Components/SignupModal/SignupModal';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from '../Components/CheckoutForm/CheckoutForm';
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