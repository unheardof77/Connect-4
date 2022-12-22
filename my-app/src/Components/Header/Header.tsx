import './Header.css'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Menu from '@mui/material/Menu';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Avatar from '@mui/material/Avatar';
import Logo from '../../assets/Logo.png';
import { useState, MouseEvent } from 'react';
import Auth from '../../utils/auth/auth';
import { useModalContext } from '../../utils/statemanagment/globalstate';
import { Link, useNavigate } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';

const pages = ['Home', 'About', 'Coffee'];
const settings = ['Profile', 'Account', 'Dashboard'];

export default function Header() {
    const user: any = Auth.getProfile();
    const { updateModalState } = useModalContext();

    const navigate = useNavigate();

    function GenerateUsername() {
        if (Auth.loggedIn()) {
            return (user) ? user.data.username : "Guest";
        } else {
            return "Guest";
        }
    }

    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const generateAvatar = () => {
        if (Auth.loggedIn()) {
            let userFirstLetter: string = ((/[a-zA-Z]/).test(user.data.username[0])) ? user.data.username[0].toUpperCase() : user.data.username[0];
            return (
                <Avatar>{userFirstLetter}</Avatar>
            )
        }
    }

    return (
        <AppBar position="static">
            <Container maxWidth={false}>
                <Toolbar disableGutters sx={{display: "flex", alignItems: "center"}}>

                    {/* left side of navigation bar, includes mobile and non-mobile nav items */}
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            <MenuItem onClick={()=>{navigate('/'); handleCloseNavMenu()}}>
                                <Typography textAlign="center">Home</Typography>
                            </MenuItem>
                            <MenuItem onClick={()=>{navigate('/aboutUs'); handleCloseNavMenu()}}>
                                <Typography textAlign="center">About</Typography>
                            </MenuItem>
                            <HashLink className='link-reset' to="/aboutUs#coffee-message"><MenuItem onClick={handleCloseNavMenu}>
                                <Typography textAlign="center">Coffee</Typography>
                            </MenuItem></HashLink>
                        </Menu>
                        <img src={Logo} style={{ maxHeight: "50px", margin: "10px 0px" }} />
                    </Box>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        <img src={Logo} style={{ maxHeight: "50px", margin: "10px 0px" }} />
                        <Button onClick={() => navigate('/')} sx={{ my: 2, color: 'white', display: 'block' }}>Home</Button>
                        <Button onClick={() => navigate('/aboutUs')} sx={{ my: 2, color: 'white', display: 'block' }}>About</Button>
                        <HashLink className='link-reset' to="/aboutUs#coffee-message"><Button onClick={handleCloseNavMenu} sx={{ my: 2, color: 'white', display: 'block' }}>Coffee</Button></HashLink>
                    </Box>

                    {/* right side of Nav Bar */}
                    {Auth.loggedIn() ?
                        <>
                            <Button variant='outlined' onClick={() => navigate('/')} sx={{ my: 2, mr: 2, color: 'white', display: 'block' }}>Local Game</Button>
                            <Button variant='outlined' onClick={() => updateModalState({ type: 'showLobbyModal' })} sx={{ my: 2, mr: 2, color: 'white', display: 'block' }}>Create Game</Button>
                            <Button variant='outlined' onClick={() => updateModalState({ type: 'showJoinModal' })} sx={{ my: 2, mr: 3, color: 'white', display: 'block' }}>Join Game</Button>
                            <Box sx={{ flexGrow: 0 }}>
                                <Tooltip title="Open settings">
                                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                        {generateAvatar()}
                                    </IconButton>
                                </Tooltip>
                                <Menu
                                    sx={{ mt: '45px' }}
                                    id="menu-appbar"
                                    anchorEl={anchorElUser}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={Boolean(anchorElUser)}
                                    onClose={handleCloseUserMenu}
                                >
                                    {settings.map((setting) => (
                                        <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                            <Typography textAlign="center">{setting}</Typography>
                                        </MenuItem>
                                    ))}
                                    <MenuItem onClick={(e) => { e.preventDefault(); Auth.logout(); }}>
                                        <Typography textAlign="center">Sign Out</Typography>
                                    </MenuItem>
                                </Menu>
                            </Box>
                        </>
                        :
                        <>
                            <Button variant='outlined' onClick={() => updateModalState({ type: 'showLogin' })} sx={{ my: 2, mr: 2, color: 'white', display: 'block' }}>Log In</Button>
                            <Button variant='outlined' onClick={() => updateModalState({ type: 'showSignup' })} sx={{ my: 2, color: 'white', display: 'block' }}>Sign Up</Button>
                        </>
                    }
                </Toolbar>
            </Container>
        </AppBar>
    );
}