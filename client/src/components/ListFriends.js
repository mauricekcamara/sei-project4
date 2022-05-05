import React, { Fragment, useEffect, useState, useContext } from 'react';
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
import { ApplicationContext } from '../application-context';

const ListFriends = () => {
    const [friends, setFriends] = useState([]);
    // Aplication State
    const [appState, appAction] = useContext(ApplicationContext);
    const [reload, setReload] = useState(false);

    // Get List of friends
    const getAllFriends = () => {
        axios
            .get('/api/friends/', { params: { user: appState.currentUser.id } })
            .then((response) => {
                const friends = response.data;
                setFriends(friends);
                console.log(friends);
            });
    };

    // Delete Friend Function
    const deleteFriend = (friend_id) => {
        axios
            .delete(`/api/friends/${friend_id}`, {
                params: { user: appState.currentUser.id },
            })
            .then((response) => {
                console.log(response);
                setReload(!reload);
            });
    };

    useEffect(() => {
        getAllFriends();
    }, [reload]);
    return (
        <Container component='main' maxWidth='md'>
            <CssBaseline />
            <Fragment>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                        <TableHead>
                            <TableRow>
                                <TableCell></TableCell>
                                <TableCell align='right'></TableCell>
                                <TableCell align='right'></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {friends.map((friend) => (
                                <TableRow
                                    key={friend.id}
                                    sx={{
                                        '&:last-child td, &:last-child th': {
                                            border: 0,
                                        },
                                    }}>
                                    <TableCell component='th' scope='row'>
                                        {friend.name}
                                    </TableCell>
                                    <TableCell align='right'>
                                        <Button
                                            variant='outlined'
                                            onClick={() =>
                                                deleteFriend(friend.id)
                                            }>
                                            Remove Friend
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

export default ListFriends;
