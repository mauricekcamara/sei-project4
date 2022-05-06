import React, {
    Fragment,
    useContext,
    useEffect,
    useReducer,
    useState,
} from 'react';
import {
    ApplicationContext,
    ApplicationContextReducer,
    DefaultApplicationState,
} from './application-context';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';

import { Routes, Route, Link } from 'react-router-dom';

// Components
import CreateUser from './components/CreateUser';
import Header from './components/Header';
import ListUsers from './components/ListUsers';
import UserLogin from './components/UserLogin';
import ListFriends from './components/ListFriends';
import LandingPage from './components/LandingPage';

function App() {
    const [appState, appAction] = useReducer(
        ApplicationContextReducer,
        DefaultApplicationState
    );

    useEffect(() => {
        getSession();
    });
    return (
        <div className='container'>
            <ApplicationContext.Provider value={[appState, appAction]}>
                <Fragment>
                    <Header />
                    <Container maxWidth='md'>
                        <CssBaseline />
                    </Container>
                </Fragment>
                <Routes>
                    <Route path='Signup' element={<CreateUser />} />
                    <Route path='/' element={<LandingPage />} />
                    <Route path='Login' element={<UserLogin />} />
                    <Route path='Users' element={<ListUsers />} />
                    <Route path='Friends' element={<ListFriends />} />
                </Routes>
            </ApplicationContext.Provider>
        </div>
    );
}

const getSession = () => {
    axios.get('/api/sessions').then((response) => {
        console.log(response);
    });
};

export default App;
