import React, { useContext, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import GlobalContext from '../../contexts/globalContext';
import { Grid, Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from '@mui/material';
import { useApi } from '../../hooks/useApi';



const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export const AuthModal = () => {
    const { setCurrentUser, setModalState } = useContext(GlobalContext)
    const api = useApi()
    const { authModal, setAuthModal } = useContext(GlobalContext)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailChange = ({ target }) => {
        setEmail(target.value);
    };

    const handlePasswordChange = ({ target }) => {
        setPassword(target.value);
    };

    const signUp = () => {
        api.signUp({ email, password })
            .then((createdUser) => {
                return api.signIn({ email, password });
            })
            .then((signedInUser) => {
                const { token, data } = signedInUser
                localStorage.setItem('token', JSON.stringify(token));
                setCurrentUser(data)
                setAuthModal(() => {
                    return {
                        isOpen: false,
                    };
                });
                setEmail('');
                setPassword('');
            })
            .catch((err) => {
                setModalState(() => {
                    return {
                        isOpen: true,
                        msg: 'Authorization error',
                    };
                });
            });
    };

    const signIn = () => {
        api.signIn({ email, password })
            .then((signedUser) => {
                const { token, data } = signedUser;
                setCurrentUser(data)
                localStorage.setItem('token', JSON.stringify(token));
                localStorage.setItem('favorites', JSON.stringify(data['likes']));
                setAuthModal(() => {
                    return {
                        isOpen: false,
                    };
                });
                setEmail('');
                setPassword('');
            })
            .catch((err) => {
                setModalState(() => {
                    return {
                        isOpen: true,
                        msg: 'Login Error',
                    };
                });

            });
    }


    return (
        <Modal open={authModal.isOpen} aria-labelledby='modal-modal-title' aria-describedby='modal-modal-description'>
            <Box sx={style}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField fullWidth label='Email' variant='outlined' required value={email} onChange={handleEmailChange} />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label='Password'
                            type='password'
                            variant='outlined'
                            required value={password}
                            onChange={handlePasswordChange}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <Button onClick={signUp} fullWidth variant='contained' color='primary' size='small' >
                            Registration
                        </Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button onClick={signIn} fullWidth variant='contained' color='primary' size='small' >
                            Login
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </Modal>
    );
};