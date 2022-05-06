import React, { useContext } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { Link } from 'react-router-dom';
import { ApplicationContext } from '../application-context';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const logout = () => {
    axios.delete('/api/sessions');
};

const Header = () => {
    // Aplication State
    const [appState, appAction] = useContext(ApplicationContext);
    let navigate = useNavigate();
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position='static'>
                <Toolbar>
                    <IconButton
                        size='large'
                        edge='start'
                        color='inherit'
                        aria-label='menu'
                        sx={{ mr: 2 }}></IconButton>
                    <Typography
                        variant='h6'
                        component='div'
                        sx={{ flexGrow: 1 }}>
                        Friendsta
                    </Typography>
                    {!appState.currentUser && (
                        <>
                            <Button color='inherit'>
                                <Link to='/signup' spacing={2}>
                                    Signup
                                </Link>
                            </Button>
                            <Button color='inherit'>
                                <Link to='/login' spacing={2}>
                                    Log In
                                </Link>
                            </Button>
                        </>
                    )}
                    {appState.currentUser && (
                        <>
                            <Button color='inherit'>
                                <Link to='/users' spacing={2}>
                                    Users
                                </Link>
                            </Button>
                            <Button color='inherit'>
                                <Link to='/friends' spacing={2}>
                                    Friends
                                </Link>
                            </Button>
                            <Button
                                color='inherit'
                                onClick={() => {
                                    appAction({
                                        type: 'LOGOUT',
                                    });
                                    logout();
                                    navigate('/');
                                }}>
                                Logout
                            </Button>
                        </>
                    )}
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default Header;
