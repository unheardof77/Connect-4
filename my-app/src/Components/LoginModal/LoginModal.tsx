import './LoginModal.css'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import Slide from '@mui/material/Slide';
import Typography from '@mui/material/Typography';
import { TransitionProps } from '@mui/material/transitions';
import { FormControl, TextField, Box, FormLabel, DialogContentText } from '@mui/material';
import {forwardRef, useState, Dispatch, SetStateAction, FormEvent, ChangeEvent} from 'react';
import { useMutation } from '@apollo/client';
import { login } from '../../utils/crud/Mutation';
import Auth from '../../utils/auth/auth';
import { useModalContext } from '../../utils/statemanagment/globalstate';


const Transition = forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function LoginModal() {
    const { modalState, updateModalState } = useModalContext();
    const [ username, setUsername] = useState("");
    const [ password, setPassword] = useState("");
    const [loginQuery] = useMutation(login);

    const handleClose = () => {
        setUsername("");
        setPassword("");
        updateModalState({type:'hideLogin'});
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
        updateModalState({type:'showSignup'});
    };


    return (
        <div>
            <Dialog
                open={modalState.login}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
                fullWidth
                
            >
                <Box component='form' onSubmit={handleFormSubmit} padding={5}>
                    <Typography variant="h4" component="h6" sx={{margin: "0px 0px 15px 0px"}}>Login</Typography>
                    <TextField fullWidth id="standard-basic" name='UserName' value={username} onChange={handleUserNameValue} label="Username" variant="standard" sx={{margin: "0px 0px 10px 0px"}}/>
                    <TextField fullWidth name='Password'onChange={handleUserNameValue} value={password} id="standard-basic" label="Password" variant="standard" sx={{margin: "0px 0px 20px 0px"}}/>
                    <p style={{margin: "10px 0px 20px 0px"}}>Don't have an account? Click <span onClick={renderSignup} className='hover-cursor'>here</span> to signup instead.</p>
                    <Button onClick={handleClose} sx={{paddingLeft: "0px"}}>Cancel</Button>
                    <Button type='submit' >Login</Button>
                </Box>
            </Dialog>
        </div>
    );
}