import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppBar, Container, Toolbar, Typography, Box, Avatar, Chip, Stack } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import GlobalContext from '../../contexts/globalContext';
import { Button } from '@mui/material';
import Logo from "../Logo"


export const Header = () => {
  const navigate = useNavigate();
  const navigateToEditPage = () => {
    navigate('current-user/edit');
  }

  const { currentUser, setCurrentUser, setAuthModal, setFormDialogState, setModalState, setPostList, setIsModal } = useContext(GlobalContext);

  const deleteUser = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('favorites');
    localStorage.removeItem('CurrentPage');
    navigate('/')
    setCurrentUser(null);
    setPostList(null);
    setAuthModal(() => {
      return {
        isOpen: true,
      };
    });
    setIsModal(true)
  };

  return (
    <AppBar position='sticky' >
      <Container fixed>
        <Toolbar>
          <Box component='div' sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '20px'
          }}>

            <Box component='div'>
              <Logo />
            </Box>
            <Typography>
              <Button className='buttonMUI' variant='contained' color='secondary' onClick={() => {
                setFormDialogState({
                  isOpen: true,
                  postId: null,
                })
              }}>
                New post
              </Button>
            </Typography>
          </Box>

          <Box component='div' sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            flexGrow: 1
          }}>
          </Box>
          <Stack direction="row" spacing={2}>
            <Chip avatar={<Avatar alt="Avatar" src={currentUser?.avatar} />} label={currentUser?.name} onClick={navigateToEditPage} variant="outlined" size="medium" />
            {currentUser ? (
              <Chip icon={<LogoutIcon />} label='Logout' onClick={deleteUser} variant="outlined" />
            ) : (
              null
            )
            }

          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  )
}