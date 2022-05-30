import React, { useContext, useEffect, useState } from 'react'
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';


import dayjs from 'dayjs';
import GlobalContext from '../../contexts/globalContext';
import { useApi } from '../../hooks/useApi';



export const Comment = ({ comment, setComments }) => {

  const { currentUser } = useContext(GlobalContext);
  const api = useApi()

  const deleteComment = (commentId) => () => {
    api.deleteComment(comment.post_id, commentId)
      .then((data) => setComments(data))
  };

  return (
    <div>

      <Grid container item xs={12} >
        <Grid item xs={11}>
          <ListItem alignItems="flex-start"  >
            <ListItemAvatar>
              <Avatar alt='avatarComment' src={comment?.author.avatar} />
            </ListItemAvatar>
            <ListItemText
              primary={
                <React.Fragment>
                  <Typography
                    sx={{ display: 'block' }}
                    component="span"
                    variant="body2"
                    color="text.secondary"
                  >
                    {dayjs(comment.created_at).format('DD-MM-YYYY HH:mm:ss')}
                  </Typography>
                  <Typography
                    sx={{ display: 'block' }}
                    component="span"
                    variant="body1"
                    color="text.primary"
                  >
                    {comment?.author?.name}
                  </Typography>
                </React.Fragment>
              }
              secondary={<>
                <React.Fragment>
                  <Typography
                    sx={{ mt: 3 }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    {comment?.commentText}
                  </Typography>
                </React.Fragment>
              </>
              }
            />
          </ListItem>
        </Grid>
        <Grid item xs={1} >
          {currentUser._id == comment.author._id ? (
            <IconButton aria-label="delete" onClick={deleteComment(comment._id)}>
              <DeleteIcon />
            </IconButton>

          ) : ('')}
        </Grid>
      </Grid>
      <Divider variant="inset" component="li" />
    </div>

  )
}