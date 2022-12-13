import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import Slide from '@mui/material/Slide';
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
    return <Slide direction="up" ref={ref} {...props} />;
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
                        <TextField id="standard-basic" name='UserName' value={username} onChange={handleUserNameValue} label="UserName" variant="standard" />
                        <FormControl fullWidth>
                            <TextField fullWidth name='Password'onChange={handleUserNameValue} value={password} id="standard-basic" label="Password" variant="standard" />
                            <TextField id="standard-basic" onChange={handleUserNameValue} name='confirmPassword' value={confirmPassword} label="Confirm Password" variant="standard" />
                            {nonMatchPassword?<FormLabel>Passwords must match.</FormLabel>: null}
                        </FormControl>
                    </FormControl>
                    <DialogActions>
                        <DialogContentText onClick={renderLogin}>Click here to login instead.</DialogContentText>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button type='submit' >Signup</Button>
                    </DialogActions>
                </Box>

            </Dialog>
        </div>
    );
}