import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';

import TextField from '@mui/material/TextField';

import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const UserLogin = () => {
    // create state variables for each input
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onSubmitForm = async (e) => {
        e.preventDefault();
        const body = {
            email: email,
            password: password,
        };
        let error = null;
        if (body.password === '') {
            error = 'Password is required';
        } else if (body.email === '') {
            error = 'Email is required';
        }

        if (!error) {
            axios
                .post('http://localhost:5000/api/sessions', body)
                .then((response) => {
                    console.log('I got a session');
                })
                .catch((error) => {
                    console.log(error.response.data.message);
                });
        }
    };
    return (
        <Container component='main' maxWidth='xs'>
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}>
                <Box
                    component='form'
                    noValidate
                    onSubmit={onSubmitForm}
                    sx={{ mt: 3 }}>
                    <Grid container spacing={0}>
                        <Grid container spacing={0}>
                            <Grid item xs={12}>
                                <TextField
                                    label='Email'
                                    variant='filled'
                                    fullWidth
                                    type='email'
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </Grid>
                            <Grid container spacing={0}>
                                <Grid item xs={12}></Grid>
                                <TextField
                                    label='Password'
                                    variant='filled'
                                    type='password'
                                    fullWidth
                                    required
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                />
                            </Grid>
                            <div>
                                <Button
                                    type='submit'
                                    variant='contained'
                                    fullWidth
                                    sx={{ mt: 3, mb: 2 }}
                                    color='primary'>
                                    Login
                                </Button>
                            </div>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
};

export default UserLogin;
