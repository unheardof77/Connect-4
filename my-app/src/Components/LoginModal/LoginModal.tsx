import './LoginModal.css'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
import Typography from '@mui/material/Typography';
import FilledInput from '@mui/material/FilledInput';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { TransitionProps } from '@mui/material/transitions';
import { TextField, Box } from '@mui/material';
import { forwardRef, useState, FormEvent, ChangeEvent, MouseEvent } from 'react';
import { useMutation } from '@apollo/client';
import { login } from '../../utils/crud/Mutation';
import { useModalContext } from '../../utils/statemanagment/globalstate';
import Auth from '../../utils/auth/auth';

const Transition = forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="down" ref={ref} {...props} />;
});

export default function LoginModal() {
    const { modalState, updateModalState } = useModalContext();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [invalidCredentials, setInvalidCredentials] = useState(false);
    const [loginQuery] = useMutation(login);
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const handleClose = () => {
        setUsername("");
        setPassword("");
        setInvalidCredentials(false);
        updateModalState({ type: 'hideLogin' });
    };

    const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
        console.log('insubmit')
        e.preventDefault();
        if (!username || !password) {
            console.log('empty')
        } else {
            try {
                const { data } = await loginQuery({ variables: { username, password } });
                Auth.login(data.login.token);
                handleClose();
            } catch (err) {
                console.error(err);
                setInvalidCredentials(true)
            }
        }
    };

    const handleUserNameValue = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.currentTarget;
        switch (name) {
            case 'UserName': setUsername(value); break;
            case 'Password': setPassword(value); break;
        };
    };

    const renderSignup = () => {
        handleClose();
        updateModalState({ type: 'showSignup' });
    };

    return (
            <Dialog
                open={modalState.login}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
                fullWidth

            >
                <Box component='form' onSubmit={handleFormSubmit} padding={4}>
                    <Typography variant="h4" component="h6" sx={{ margin: "0px 0px 25px 0px" }}>Log In</Typography>
                    <TextField
                        error={(invalidCredentials) ? true : false}
                        fullWidth
                        name='UserName' value={username} onChange={handleUserNameValue} label="Username"
                        variant="filled"
                        sx={{ margin: "0px 0px 15px 0px" }}
                        required
                    />
                    <FormControl variant="filled" fullWidth required>
                        <InputLabel htmlFor="filled-adornment-password" error={(invalidCredentials) ? true : false}>Password</InputLabel>
                        <FilledInput
                            error={(invalidCredentials) ? true : false}
                            // helperText="Incorrect entry."
                            fullWidth
                            name='Password' onChange={handleUserNameValue} value={password} id="filled-adornment-password"
                            type={showPassword ? 'text' : 'password'}
                            sx={{ margin: "0px 0px 15px 0px" }}
                            required
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                    {invalidCredentials ? <Typography variant="subtitle1" component="p" sx={{ color: "#f44332", margin: "0px 0px 12px 0px" }}>Invalid Credentials</Typography> : null}
                    <Button sx={{ margin: "10px 20px 0px 0px" }} variant="outlined" type='submit'>Login</Button>
                    <Button sx={{ margin: "10px 0px 0px 0px" }} variant="outlined" onClick={handleClose}>Cancel</Button>
                    <p style={{ margin: "40px 0px 0px 0px" }}>Don't have an account? Click <span onClick={renderSignup} className='hover-cursor'>here</span> to signup instead!</p>
                </Box>
            </Dialog>
    );
}