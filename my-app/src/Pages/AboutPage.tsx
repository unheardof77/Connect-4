import { Box, Typography, Divider, Stack, Chip } from '@mui/material';
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
import ToacinBio from '../Components/ToacinBio/ToacinBio';
import MorganBio from '../Components/MorganBio/MorganBio';
import EndeavorSlides from '../Components/EndeavorSlides/EndeavorSlides';

const stripePromise = loadStripe('pk_test_51MF246FhLt5A8AbKPxxbzKomjN1l6ggWollsfH66RgVcL9sQrObPHh1kOuZL1b7W7Q7IsO8SjIvh6TUNuiDZr96M006pbFiehi');

export default function AboutPage() {
    const [donationAmount, setDonationAmount] = useState('');

    const [createCheckout, { data: checkoutData }] = useLazyQuery(getCheckout);

    useEffect(() => {
        if (checkoutData) {
            stripePromise.then((res) => {
                res?.redirectToCheckout({ sessionId: checkoutData.checkout.session })
            })
        }
    }, [checkoutData]);

    const handleDonationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDonationAmount(e.target.value)
    }

    const handleDonationSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await createCheckout({ variables: { donationAmount: parseInt(donationAmount) } })
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <>
            <Header />
            <Box component='div' sx={{ width: "100%", height: "300px", display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '80px' }}>
                <Typography variant='h1' component='h1'>Meet The Devs</Typography>
            </Box>

            <Box component='section' sx={{ width: "100%", display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <MorganBio />

                <ToacinBio />

                <Box component='article' sx={{ width: "50%" }} >
                    <Typography variant='h2' component='h2' sx={{ fontSize: "3em", color: "lightgray", marginBottom: "5%" }}>The Endeavor</Typography>
                        <EndeavorSlides/>
                    <Divider light sx={{ width: "100%", marginBottom: "60px", marginTop: "40px" }} />
                </Box>

                <Box component='article' sx={{ width: "50%" }} >
                    <Typography variant='h2' component='h2' sx={{ fontSize: "3em", textAlign: "end", color: "gray" }}>Connect4 in the news</Typography>
                    <Divider light sx={{ width: "100%", marginBottom: "60px", marginTop: "40px" }} />
                </Box>

                <Box component='article' sx={{ width: "50%" }} >
                    <Typography variant='h2' component='h2' sx={{ fontSize: "3em", color: "gray" }}>Content & Engagement</Typography>
                    <Divider light sx={{ width: "100%", marginBottom: "60px", marginTop: "40px" }} />
                </Box>
            </Box>
            <form onSubmit={handleDonationSubmit}>
                <input type='number' value={donationAmount} onChange={handleDonationChange}></input>
                <button type='submit'>submit</button>
            </form>
            <LoginModal />
            <SignupModal />
            {/* <Elements stripe={stripePromise}>
                <CheckoutForm/>
            </Elements> */}
        </>
    )
};