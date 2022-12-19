import './PageStyles/AboutPage.css';
import { Box, Typography, Divider, TextField, FormControl, InputLabel, FilledInput, InputAdornment, IconButton, Button } from '@mui/material';
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
                    <EndeavorSlides />
                    <Divider light sx={{ width: "100%", marginBottom: "80px", marginTop: "60px", borderBottomWidth: 2, borderColor: "#303030" }} />
                </Box>

                <Box component='article' sx={{ width: "50%" }} >
                    <Typography variant='h2' id="coffee-message" component='h2' sx={{ fontSize: "3em", color: "lightgray", marginBottom: "5%", textAlign: "center" }}>We'd Love Your Help</Typography>

                    <Typography variant='h2' component='p' sx={{ fontSize: "1.5em", color: "gray", marginBottom: "4%", width: "100%" }}> We are open to collaboration! If you would like to help make this application better or contribute, visit the <a href='https://github.com/unheardof77/Connect-4#how-to-contribute' target="_blank" className="anchor-reset">GitHub</a> repository for more information on making contributions. Or if you simply would like to submit a suggestion/message, feel free to email <a href="mailto:morgan.tolman04@gmail.com" className="anchor-reset">morgan.tolman04@gmail.com</a> or <a href='mailto:toacinp@outlook.com' className="anchor-reset">toacinp@outlook.com</a></Typography>

                    <Typography variant='h2' component='h2' sx={{ fontSize: "1.5em", color: "gray", marginBottom: "2%", width: "100%" }}> Lastly, we'd like to quickly mention that both of us are recent graduates on an active journey to becoming more learned developers. If you enjoyed our application, and would like to help us continue, please consider supporting by buying us a coffee! We'd greatly appreciate it :) </Typography>

                    <Box component='form' onSubmit={handleDonationSubmit} padding={4} sx={{marginBottom: "10%"}}>
                        <Box sx={{display: "flex", justifyContent: "center"}}>
                        <TextField
                            // error={(invalidCredentials) ? true : false}
                            value={donationAmount} onChange={handleDonationChange} label="Donation Amount"
                            variant="filled"
                            sx={{ margin: "0px 0px 0px 0px" }}
                            required
                        />
                        {/* {invalidCredentials ? <Typography variant="subtitle1" component="p" sx={{ color: "#f44332", margin: "0px 0px 12px 0px" }}>Invalid Credentials</Typography> : null} */}
                        <Button sx={{ margin: "0px 0px 0px 20px" }} variant="outlined" type='submit'>Donate</Button>
                        </Box>
                    </Box>
                </Box>
            </Box>
            <LoginModal />
            <SignupModal />
            {/* <Elements stripe={stripePromise}>
                <CheckoutForm/>
            </Elements> */}
        </>
    )
};