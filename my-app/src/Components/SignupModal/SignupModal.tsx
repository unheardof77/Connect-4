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
import { signup } from '../../utils/crud/Mutation';
import { useModalContext } from '../../utils/statemanagment/globalstate';

import Auth from '../../utils/auth/auth'

const Transition = forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function SignupModal() {
    const { modalState, updateModalState } = useModalContext();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [nonMatchPassword, setNonMatch] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [signUpQuery] = useMutation(signup)

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);

    const handleMouseDownConfirmPassword = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const handleClose = () => {
        setUsername("");
        setPassword("");
        setConfirmPassword("");
        setNonMatch(false);
        updateModalState({ type: 'hideSignup' });
    };

    const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
        console.log('insubmit')
        e.preventDefault();
        if (!username || !password || !confirmPassword) {
            console.log('empty')
        } else if (password !== confirmPassword) {
            console.log('happened')
            setNonMatch(true)
        } else {
            try {
                const { data } = await signUpQuery({ variables: { username, password } });
                Auth.login(data.signup.token);
                handleClose();
            } catch (err) {
                console.error(err)
            }

        }
    };

    const handleUserNameValue = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.currentTarget;
        switch (name) {
            case 'Username': setUsername(value); break;
            case 'Password': setPassword(value); break;
            case 'confirmPassword': setConfirmPassword(value); break;
        };
    };

    const renderLogin = () => {
        handleClose();
        updateModalState({ type: 'showLogin' });
    }


    return (
            <Dialog
                open={modalState.signup}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
                fullWidth

            >
                <Box component='form' onSubmit={handleFormSubmit} padding={4}>
                    <FormControl fullWidth>
                        <Typography variant="h4" component="h6" sx={{ margin: "0px 0px 25px 0px" }}>Sign Up</Typography>
                        <TextField inputProps={{ maxLength: 15 }} name='Username' value={username} onChange={handleUserNameValue} label="Username" variant="filled" sx={{ margin: "0px 0px 15px 0px" }} required />
                        <FormControl variant="filled" fullWidth required>
                            <InputLabel htmlFor="filled-adornment-password" error={(nonMatchPassword) ? true : false}>Password</InputLabel>
                            <FilledInput
                                error={(nonMatchPassword) ? true : false}
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
                        <FormControl variant="filled" fullWidth required>
                            <InputLabel htmlFor="filled-adornment-password" error={(nonMatchPassword) ? true : false}>Confirm Password</InputLabel>
                            <FilledInput
                                error={(nonMatchPassword) ? true : false}
                                // helperText="Incorrect entry."
                                fullWidth
                                name='confirmPassword' onChange={handleUserNameValue} value={confirmPassword} id="filled-adornment-password"
                                type={showConfirmPassword ? 'text' : 'password'}
                                sx={{ margin: "0px 0px 15px 0px" }}
                                required
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowConfirmPassword}
                                            onMouseDown={handleMouseDownConfirmPassword}
                                            edge="end"
                                        >
                                            {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                        {nonMatchPassword ? <Typography variant="subtitle1" component="p" sx={{ color: "#f44332", margin: "0px 0px 12px 0px" }}>Passwords Must Match</Typography> : null}
                    </FormControl>
                    <Button type='submit' sx={{ margin: "10px 20px 0px 0px" }} variant="outlined">Signup</Button>
                    <Button onClick={handleClose} sx={{ margin: "10px 0px 0px 0px" }} variant="outlined">Cancel</Button>
                    <p style={{ margin: "40px 0px 0px 0px" }}>Already have an account? Click <span className='hover-cursor' onClick={renderLogin}>here</span> to login instead!</p>
                </Box>
            </Dialog>
    );
}