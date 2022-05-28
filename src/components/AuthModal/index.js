import React, { useContext, useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import GlobalContext from '../../contexts/globalContext';
import { Grid, Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from '@mui/material';
import { useApi } from '../../hooks/useApi';
import { TabsPanel } from '../TabsPanel';

const style = {
    position: 'absolute',
    top: '45%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export const AuthModal = () => {
    const { setCurrentUser, setModalState, isTabSignUp, setIsTabSignUp, setSnackBarState } = useContext(GlobalContext)
    const api = useApi()
    const { authModal, setAuthModal, setIsModal } = useContext(GlobalContext)
    const [name, setName] = useState('');
    const [about, setAbout] = useState('');
    const [avatar, setAvatar] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const isEmpty = () => {
        if (isTabSignUp) {
            if (!name) {
                setSnackBarState({
                    isOpen: true, msg: 'Name can\'t be empty'
                })
                return true
            }
        }
        if (!email) {
            setSnackBarState({
                isOpen: true, msg: 'Email can\'t be empty'
            })
            return true
        } else if (!password) {
            setSnackBarState({
                isOpen: true, msg: 'Password can\'t be empty'
            })
            return true
        } else {
            return false
        }
    }

    const signUp = () => {
        if (!isEmpty()) {
            api.signUp({ name, about, avatar, email, password })
                .then(() => signIn())
        }
    };

    const signIn = () => {
        if (!isEmpty()) {
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
                    setName('');
                    setAbout('');
                    setAvatar('');
                    setEmail('');
                    setPassword('');
                    setIsTabSignUp(false)
                    setIsModal(false)
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

    }

    return (
        <Modal open={authModal.isOpen} aria-labelledby='modal-modal-title' aria-describedby='modal-modal-description'>
            <Box sx={style}>
                <TabsPanel />
                <Grid container spacing={2}>
                    {isTabSignUp ? <>
                        <Grid item xs={12}>
                            <TextField fullWidth label='Name' variant='outlined' required value={name} onChange={({ target }) => setName(target.value)} />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField fullWidth label='About' variant='outlined' required value={about} onChange={({ target }) => setAbout(target.value)} />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField fullWidth label='Avatar URL' variant='outlined' required value={avatar} onChange={({ target }) => setAvatar(target.value)} />
                        </Grid>
                    </> : null}
                    <Grid item xs={12}>
                        <TextField fullWidth label='Email' variant='outlined' required value={email} onChange={({ target }) => setEmail(target.value)} />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label='Password'
                            type='password'
                            variant='outlined'
                            required value={password}
                            onChange={({ target }) => setPassword(target.value)}
                        />
                    </Grid>
                    {isTabSignUp ? <>
                        <Grid item xs={12}>
                            <Button onClick={signUp} fullWidth variant='contained' color='primary' size='small' >
                                Sign up
                            </Button>
                        </Grid>
                    </> : <>
                        <Grid item xs={12}>
                            <Button onClick={signIn} fullWidth variant='contained' color='primary' size='small' >
                                Sign in
                            </Button>
                        </Grid>
                    </>}
                </Grid>
            </Box>
        </Modal >
    );
};