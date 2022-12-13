import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { FormControl, TextField, Box, FormLabel, DialogContentText } from '@mui/material';
import {forwardRef, useState, Dispatch, SetStateAction, FormEvent, ChangeEvent} from 'react';
import { useMutation } from '@apollo/client';
import { login } from '../../utils/crud/Mutation';
import Auth from '../../utils/auth/auth';

interface LoginProps {
    loginModalStatus: boolean;
    setLoginModalStatus: Dispatch<SetStateAction<boolean>>;
    setSignupModalStatus: Dispatch<SetStateAction<boolean>>;
}

const Transition = forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function LoginModal({loginModalStatus, setLoginModalStatus, setSignupModalStatus}:LoginProps) {
    const [ username, setUsername] = useState("");
    const [ password, setPassword] = useState("");
    const [loginQuery] = useMutation(login);

    const handleClose = () => {
        setUsername("");
        setPassword("");
        setLoginModalStatus(false);
    };

    const handleFormSubmit = async (e:FormEvent<HTMLFormElement>) => {
        console.log('insubmit')
        e.preventDefault();
        if(!username || !password){
            console.log('empty')
        }else{
            try{
                const {data} = await loginQuery({variables:{username, password}});
                Auth.login(data.login.token);
                window.location.assign('/');
            }catch(err){
                console.error(err);
            }
        }
    };

    const handleUserNameValue = (e:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>{
        const {name, value} = e.currentTarget;
        switch(name){
            case 'UserName': setUsername(value); break;
            case 'Password': setPassword(value); break;
        };
    };

    const renderSignup = () => {
        handleClose();
        setSignupModalStatus(true);
    };


    return (
        <div>
            <Dialog
                open={loginModalStatus}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
                fullWidth
                
            >
                <Box component='form' onSubmit={handleFormSubmit} padding={5}>
                    <TextField fullWidth id="standard-basic" name='UserName' value={username} onChange={handleUserNameValue} label="Username" variant="standard" />
                    <TextField fullWidth name='Password'onChange={handleUserNameValue} value={password} id="standard-basic" label="Password" variant="standard" />
                    <DialogActions>
                        <DialogContentText onClick={renderSignup}>Click here to signup instead.</DialogContentText>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button type='submit' >Login</Button>
                    </DialogActions>
                </Box>

            </Dialog>
        </div>
    );
}