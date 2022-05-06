import React, { Fragment, useEffect, useState, useContext } from 'react';
import Button from '@mui/material/Button';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import { Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
//import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();
const LandingPage = () => {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <main>
                {/* Hero unit */}
                <Box
                    sx={{
                        bgcolor: 'background.paper',
                        pt: 8,
                        pb: 6,
                    }}>
                    <Container maxWidth='sm'>
                        <Typography
                            component='h1'
                            variant='h2'
                            align='center'
                            color='text.primary'
                            gutterBottom>
                            Friendsta
                        </Typography>
                        <Typography
                            variant='h5'
                            align='center'
                            color='text.secondary'
                            paragraph>
                            Welcome to Friendsta! The simple no frills app where
                            you can meet new people and make connections. Sign
                            up today!
                        </Typography>
                        <Stack
                            sx={{ pt: 4 }}
                            direction='row'
                            spacing={2}
                            justifyContent='center'>
                            <Button variant='contained'>
                                <Link to='/signup'>Signup</Link>
                            </Button>
                            <Button variant='outlined'>
                                <Link to='/login'>Login</Link>
                            </Button>
                        </Stack>
                    </Container>
                </Box>
            </main>
        </ThemeProvider>
    );
};

export default LandingPage;
