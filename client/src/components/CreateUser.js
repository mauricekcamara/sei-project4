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

const theme = createTheme();
const CreateUser = () => {
    // create state variables for each input
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onSubmitForm = async (e) => {
        e.preventDefault();
        const body = {
            name: fullName,
            email: email,
            password: password,
        };
        let error = null;
        if (body.name === '') {
            error = 'Name is required';
        } else if (body.password === '') {
            error = 'Password is required';
        } else if (body.email === '') {
            error = 'Email is required';
        }

        if (!error) {
            axios
                .post('http://localhost:5000/api/users', body)
                .then((response) => {
                    console.log('success');
                })
                .catch((error) => {
                    console.log(error.response.data.message);
                });
        }
    };
    return (
        //<form onSubmit={onSubmitForm} sx={{ mt: 3 }}>
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
                        <Grid item xs={12}>
                            <TextField
                                label='Full Name'
                                variant='filled'
                                fullWidth
                                required
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                            />
                        </Grid>
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
                                    Signup
                                </Button>
                            </div>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
        // </form>
    );
};

export default CreateUser;
