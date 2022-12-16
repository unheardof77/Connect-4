import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
import DialogContent from '@mui/material/DialogContent';
import Typography from '@mui/material/Typography';
import { TransitionProps } from '@mui/material/transitions';
import { FormControl, TextField, Box, FormLabel, DialogContentText } from '@mui/material';
import {forwardRef, useState, Dispatch, SetStateAction, FormEvent, ChangeEvent} from 'react';
import { useMutation } from '@apollo/client';
import { signup } from '../../utils/crud/Mutation';

import Auth from '../../utils/auth/auth'

interface SignupProps {
    signupModalStatus: boolean;
    setSignupModalStatus: Dispatch<SetStateAction<boolean>>;
    setLoginModalStatus: Dispatch<SetStateAction<boolean>>;
}

const Transition = forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="down" ref={ref} {...props} />;
});

export default function SignupModal({signupModalStatus, setSignupModalStatus, setLoginModalStatus}:SignupProps) {
    const [ username, setUsername] = useState("");
    const [ password, setPassword] = useState("");
    const [ confirmPassword, setConfirmPassword] = useState("");
    const [nonMatchPassword, setNonMatch] = useState(false);
    const [signUpQuery] = useMutation(signup)

    const handleClose = () => {
        setUsername("");
        setPassword("");
        setConfirmPassword("");
        setSignupModalStatus(false);
    };

    const handleFormSubmit = async (e:FormEvent<HTMLFormElement>) => {
        console.log('insubmit')
        e.preventDefault();
        if(!username || !password || !confirmPassword){
            console.log('empty')
        } else if(password !== confirmPassword){
            console.log('happened')
            setNonMatch(true)
        }else{
            try{
                const { data } = await signUpQuery({variables:{username, password}});
                Auth.login(data.signup.token);
                window.location.assign('/');
            }catch(err){
                console.error(err)
            }
            
        }
    };

    const handleUserNameValue = (e:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>{
        const {name, value} = e.currentTarget;
        switch(name){
            case 'UserName': setUsername(value); break;
            case 'Password': setPassword(value); break;
            case 'confirmPassword': setConfirmPassword(value); break;
        };
    };

    const renderLogin = () =>{
        handleClose();
        setLoginModalStatus(true);
    }


    return (
        <div>
            <Dialog
                open={signupModalStatus}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
                fullWidth
                
            >
                <Box component='form' onSubmit={handleFormSubmit} padding={5}>
                    <FormControl fullWidth>
                        <Typography variant="h4" component="h6" sx={{margin: "0px 0px 15px 0px"}}>Sign Up</Typography>
                        <TextField id="standard-basic" name='Username' value={username} onChange={handleUserNameValue} label="Username" variant="standard" sx={{margin: "0px 0px 10px 0px"}} />
                        <FormControl fullWidth>
                            <TextField fullWidth name='Password'onChange={handleUserNameValue} value={password} id="standard-basic" label="Password" variant="standard" sx={{margin: "0px 0px 10px 0px"}}/>
                            <TextField id="standard-basic" onChange={handleUserNameValue} name='confirmPassword' value={confirmPassword} label="Confirm Password" variant="standard" sx={{margin: "0px 0px 10px 0px"}}/>
                            {nonMatchPassword?<FormLabel>Passwords must match.</FormLabel>: null}
                        </FormControl>
                    </FormControl>
                    <p style={{margin: "20px 0px 20px 0px"}}>Already have an account? Click <span className='hover-cursor' onClick={renderLogin}>here</span> to login instead.</p>
                    <Button onClick={handleClose} sx={{paddingLeft: "0px"}}>Cancel</Button>
                    <Button type='submit' >Signup</Button>
                </Box>

            </Dialog>
        </div>
    );
}