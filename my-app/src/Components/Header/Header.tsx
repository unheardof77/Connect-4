import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Dispatch, SetStateAction } from 'react';
import Auth from '../../utils/auth/auth';

interface HeaderProps {
    setLoginModalStatus: Dispatch<SetStateAction<boolean>>;
}

export default function Header({setLoginModalStatus}:HeaderProps) {
    const user: any = Auth.getProfile();

    function GenerateUsername() {
        if (Auth.loggedIn()) {
            return (user) ? user.data.username : "Guest";
        } else {
            return "Guest";
        }
    }

    return (
        <Box sx={{ flexGrow: 1, bgcolor: "black" }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        {GenerateUsername()}
                    </Typography>
                    {Auth.loggedIn()?<Button onClick={(e)=>{e.preventDefault(); Auth.logout();}} color="inherit">Logout</Button>:<Button onClick={()=>setLoginModalStatus(true)} color="inherit">Login</Button>}
                </Toolbar>
            </AppBar>
        </Box>
    )
}