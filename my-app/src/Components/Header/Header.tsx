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
import { useNavigate } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';

const headerButtonStyles = { my: 2, color: 'white', display: 'block' };

export default function Header() {
    const user: any = Auth.getProfile();
    const { updateModalState } = useModalContext();

    const navigate = useNavigate();

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

    const logoCLickHandler = () => {
        navigate('/');
    }

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
                        <img onClick={logoCLickHandler} src={Logo} alt="Connect four logo" style={{ maxHeight: "50px", margin: "10px 0px" }} />
                    </Box>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        <img  onClick={logoCLickHandler}src={Logo} alt="Connect four logo" style={{ maxHeight: "50px", margin: "10px 0px" }} />
                        <Button onClick={() => navigate('/')} sx={headerButtonStyles}>Home</Button>
                        <Button onClick={() => navigate('/aboutUs')} sx={headerButtonStyles}>About</Button>
                        <HashLink className='link-reset' to="/aboutUs#coffee-message"><Button onClick={handleCloseNavMenu} sx={headerButtonStyles}>Coffee</Button></HashLink>
                    </Box>

                    {/* right side of Nav Bar */}
                    {Auth.loggedIn() ?
                        <>
                            <Button onClick={() => navigate('/local')} sx={{ my: 2, color: 'white', display: { xs: 'none', md: 'block' }}}>Local Game</Button>
                            <Button onClick={() => updateModalState({ type: 'showLobbyModal' })} sx={{ my: 2, color: 'white', display: { xs: 'none', md: 'block' }}}>Create Game</Button>
                            <Button onClick={() => updateModalState({ type: 'showJoinModal' })} sx={{ my: 2, mr: 2, color: 'white', display: { xs: 'none', md: 'block' }}}>Join Game</Button>
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
                                    <MenuItem sx={{display: {sm: "block", md: "none"}}} onClick={() => { navigate('/local'); handleCloseUserMenu() }}>
                                        <Typography textAlign="center">Local Game</Typography>
                                    </MenuItem>
                                    <MenuItem sx={{display: {sm: "block", md: "none"}}} onClick={() => { updateModalState({ type: 'showLobbyModal' }); handleCloseUserMenu() }}>
                                        <Typography textAlign="center">Create Game</Typography>
                                    </MenuItem>
                                    <MenuItem sx={{display: {sm: "block", md: "none"}}} onClick={() => { updateModalState({ type: 'showJoinModal' }); handleCloseUserMenu() }}>
                                        <Typography textAlign="center">Join Game</Typography>
                                    </MenuItem>
                                    <MenuItem onClick={() => { Auth.logout(); handleCloseUserMenu() }}>
                                        <Typography textAlign="center">Sign Out</Typography>
                                    </MenuItem>
                                </Menu>
                            </Box>
                        </>
                        :
                        <>
                            <Button onClick={() => updateModalState({ type: 'showLogin' })} sx={headerButtonStyles}>Log In</Button>
                            <Button onClick={() => updateModalState({ type: 'showSignup' })} sx={headerButtonStyles}>Sign Up</Button>
                        </>
                    }
                </Toolbar>
            </Container>
        </AppBar>
    );
}