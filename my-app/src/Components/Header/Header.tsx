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
import Logo from '../../assets/Logo.png'
import { useState, MouseEvent } from 'react';
import Auth from '../../utils/auth/auth';
import { useModalContext } from '../../utils/statemanagment/globalstate';

const pages = ['Products', 'Pricing', 'Blog'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

export default function Header() {
    const user: any = Auth.getProfile();
    const {updateModalState } = useModalContext();

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

    // return (
    //     <Box sx={{ flexGrow: 1, bgcolor: "black" }}>
    //         <AppBar position="static">
    //             <Toolbar>
    //                 <IconButton
    //                     size="large"
    //                     edge="start"
    //                     color="inherit"
    //                     aria-label="menu"
    //                     sx={{ mr: 2 }}
    //                 >
    //                     <MenuIcon />
    //                 </IconButton>
    //                 <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
    //                     {GenerateUsername()}
    //                 </Typography>
    //                 {Auth.loggedIn()?<Button onClick={(e)=>{e.preventDefault(); Auth.logout();}} color="inherit">Logout</Button>:<Button onClick={()=>setLoginModalStatus(true)} color="inherit">Login</Button>}
    //             </Toolbar>
    //         </AppBar>
    //     </Box>
    // )

    return (
        <AppBar position="static">
            <Container maxWidth={false}>
                <Toolbar disableGutters>
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
                            {pages.map((page) => (
                                <MenuItem key={page} onClick={handleCloseNavMenu}>
                                    <Typography textAlign="center">{page}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                        <img src={Logo} style={{maxHeight: "50px", margin: "10px 0px"}}/>
                    </Box>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                    <img src={Logo} style={{maxHeight: "50px", margin: "10px 0px"}}/>
                        {pages.map((page) => (
                            <Button
                                key={page}
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                {page}
                            </Button>
                        ))}
                    </Box>
                    
                    {Auth.loggedIn() ? 
                        <Box sx={{ flexGrow: 0 }}>
                            <Tooltip title="Open settings">
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
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
                                <MenuItem onClick={(e)=>{e.preventDefault(); Auth.logout();}}>
                                    <Typography textAlign="center">Sign Out</Typography>
                                </MenuItem>
                            </Menu>
                        </Box>
                    :
                    <>
                        <Button onClick={()=>updateModalState({type:'showLogin'})} sx={{ my: 2, color: 'white', display: 'block' }}>Log In</Button>
                        <Button onClick={()=>updateModalState({type:'showLogin'})} sx={{ my: 2, color: 'white', display: 'block' }}>Sign Up</Button>
                    </>
                    }
                </Toolbar>
            </Container>
        </AppBar>
    );
}