import React, { Fragment } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { Routes, Route, Link } from 'react-router-dom';

// Components
import CreateUser from './components/CreateUser';
import Header from './components/Header';
import ListUsers from './components/ListUsers';
import UserLogin from './components/UserLogin';
import ListFriends from './components/ListFriends';

function App() {
    return (
        <div className='container'>
            <Fragment>
                <Header />
                <Container maxWidth='md'>
                    <CssBaseline />
                </Container>
            </Fragment>
            <Routes>
                <Route path='Signup' element={<CreateUser />} />
                <Route path='Login' element={<UserLogin />} />
                <Route path='Users' element={<ListUsers />} />
                <Route path='Friends' element={<ListFriends />} />
            </Routes>
        </div>
    );
}

export default App;
