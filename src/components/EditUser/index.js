import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useApi } from '../../hooks/useApi';
import GlobalContext from '../../contexts/globalContext';
import { useLocalStorage } from '../../hooks/useLocalStorage';

import{Grid, Typography, TextField, Button} from '@mui/material';

export const EditUser = () => {
    const navigate = useNavigate();
    const {readLS} = useLocalStorage();
    const page = readLS('page')
    const api = useApi();

    const{currentUser, setCurrentUser} = useContext(GlobalContext);
    const[userName, setUserName] = useState('');
    const[userAbout, setUserAbout] = useState('');
    const [userAvatar, setUserAvatar] = useState('');

    const handleClick = () => {
        api.editCurrentUser ({ name: userName, about: userAbout })
        .then((data) => {
            setCurrentUser(data);
        })
        .catch((err)=> alert(err));

        api.editAvatarUser ({ avatar: userAvatar})
        .then((data) => {
            setCurrentUser(data);
        })
        .catch((err)=> alert(err));
    }

    const handleOut = () =>{
        navigate(`/?page=${page}`);
    }
    
    useEffect(() => {
        if(currentUser) {
            setUserName(currentUser.name);
            setUserAbout(currentUser.about);
            setUserAvatar(currentUser.avatar);
        }
    },[currentUser])
  return (
    <div>
      <Grid container flexDirection='column' spacing='10' >
          <Grid item>
          <div>
                <Button className='buttonMUI' onClick={() => navigate('/')} variant="outlined"  size='small' marginBottom='20px'  > Back </Button>
            </div>
          </Grid>
              <Grid item>
                  <Typography variant='h4'> Edit </Typography>
              </Grid>
              <Grid item>
                  <TextField
                      fullWidth
                      label='имя'
                      variant='outlined'
                      value={userName}
                      onChange={({ target }) => {
                          setUserName(target.value);
                      }}
                  />
              </Grid>
              <Grid item> 
                  <TextField
                      fullWidth
                      label='доп инфо'
                      variant='outlined'
                      value={userAbout}
                      onChange={({ target }) => {
                          setUserAbout(target.value);
                      }}
                  />
              
              </Grid>
              <Grid item>
                  <TextField
                      fullWidth
                      label='Ссылка на аватар'
                      variant='outlined'
                      value={userAvatar}
                      onChange={({ target }) => {
                          setUserAvatar(target.value);
                      }}
                  />
              
              </Grid >
              <Grid item>
                  <Button className='buttonMUI' onClick ={handleClick}  variant="contained" style={{ marginBottom: '20px', marginRight: '15px', marginTop: '15px'}}>
                      Save
                  </Button>
                  <Button className='buttonMUI' onClick ={handleOut}  variant="outlined" style={{ marginBottom: '20px', marginRight: '15px', marginTop: '15px'}} >
                      Cancel
                  </Button>
              </Grid>
          </Grid>
    </div>
  )
}