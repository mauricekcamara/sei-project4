import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';

const ListUsers = () => {
    const [users, setUsers] = useState([]);

    // Get List of Users
    const getUsers = () => {
        axios.get('/api/users').then((response) => {
            const users = response.data;
            setUsers(users);
            console.log(users);
        });
    };

    // Add Friend Function
    const addFriend = (id) => {
        const body = {
            user_id: id,
        };
        axios.post('/api/friends', body).then((response) => {
            console.log(response);
        });
    };

    useEffect(() => {
        getUsers();
    }, []);
    return (
        <Container component='main' maxWidth='md'>
            <CssBaseline />
            <Fragment>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell align='right'>-</TableCell>
                                <TableCell align='right'>-</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.map((user) => (
                                <TableRow
                                    key={user.id}
                                    sx={{
                                        '&:last-child td, &:last-child th': {
                                            border: 0,
                                        },
                                    }}>
                                    <TableCell component='th' scope='row'>
                                        {user.name}
                                    </TableCell>
                                    <TableCell align='right'>
                                        <Button
                                            variant='outlined'
                                            onClick={() => addFriend(user.id)}>
                                            Add Friend
                                        </Button>
                                    </TableCell>
                                    <TableCell align='right'>
                                        <Button variant='contained'>
                                            View Profile
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Fragment>
        </Container>
    );
};

export default ListUsers;
