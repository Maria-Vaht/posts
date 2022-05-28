import React, { useEffect, useState, useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Card from '@mui/material/Card';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import GlobalContext from '../../contexts/globalContext'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import EditIcon from '@mui/icons-material/Edit'
import { IconButton, Input, TextField } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import { Container } from '@mui/material';
import dayjs from 'dayjs';
import { Comment } from '../Comment';
import { List } from '@mui/material';
import { useApi } from '../../hooks/useApi';



export default function PostPage() {


    const api = useApi()
    const { writeLS, removeLS } = useLocalStorage();

    const [postItem, setPostItem] = useState(null)
    const params = useParams()
    const { favorites, currentUser, setFavorites, setConfirmDialogState, setFormDialogState, setSnackBarState, favoriteCounter } = useContext(GlobalContext);
    const navigate = useNavigate()
    const [comments, setComments] = useState(null);

    const showErrorMessage = () => {
        setModalState(() => {
            return {
                isOpen: true,
                msg: 'Unexpected error occurred. Please try again later',
            };
        });
    }

    const addFavorite = () => {
        writeLS('favorites', postItem._id)
        setFavorites((prevState) => [...prevState, postItem._id])
        api.addLike(postItem._id)
            .then(post => post)
            .catch(showErrorMessage);
    }

    const removeFavorite = () => {
        removeLS('favorites', postItem._id)
        setFavorites((prevState) => prevState.filter((postId) => postId !== postItem._id))
        api.deleteLike(postItem._id)
            .then(post => post)
            .catch(showErrorMessage);
    }

    useEffect(() => {
        api.getPosts(params.postID)
            .then((data) => setPostItem(data))
            .catch(showErrorMessage);

        api.getComments(params.postID)
            .then((data) => setComments(data))
            .catch(showErrorMessage);
    }, [comments])

    const handleComment = (event) => {
        event.preventDefault();
        const {
            target: { comment },
        } = event;

        api.addComment(postItem._id, { text: comment.value }).
            then(() => api.getComments(params.postID)).
            then((data) => setComments(data));
        event.target.comment.value = '';

    };


    return (
        <Container>
            <div>
                <Button className='buttonMUI' variant="contained" style={{ marginTop: '10px', marginLeft: "30%" }} onClick={() => navigate('/')} > Homepage </Button>
            </div>
            <Card sx={{ maxWidth: 500 }} style={{ marginTop: "20px", marginLeft: "30%", padding: "20px", position: "center", }}>
                <CardMedia
                    component="img"
                    alt="image"

                    image={postItem?.image}
                />
                <CardContent>
                    <Avatar alt="author" src={postItem?.author !== null && postItem?.author.avatar !== null ? postItem?.author.avatar : ''} />
                    <Typography color="text.secondary">{dayjs(postItem?.created_at).format('MMMM D, YYYY')}</Typography>
                    <Typography variant="body2" color="text.secondary">
                        {postItem?.author.name}
                    </Typography>
                    <Typography gutterBottom variant="h4" component="div" style={{ paddingTop: "20px", }}>
                        {postItem?.title}
                    </Typography>

                    <Typography gutterBottom variant="h6" component="div">
                        {postItem?.text}
                    </Typography>
                    <CardActions>
                        {favorites.includes(postItem?._id) ? (
                            <IconButton aria-label="add to favorites" onClick={removeFavorite} >
                                <FavoriteIcon color='warning' />
                            </IconButton>
                        ) : (
                            <IconButton aria-label="add to favorites" onClick={addFavorite}>
                                <FavoriteBorderOutlinedIcon />
                            </IconButton>
                        )}
                        {currentUser?._id === postItem?.author._id ? (
                            (<IconButton onClick={() => {
                                setFormDialogState({
                                    isOpen: true,
                                    postId: postItem._id,
                                })
                            }}>
                                <EditIcon />
                            </IconButton>)
                        ) : (
                            null
                        )}
                        {currentUser?._id === postItem?.author._id ? (
                            (<IconButton onClick={() => {
                                setConfirmDialogState({
                                    isOpen: true,
                                    postId: postItem._id,
                                })
                            }}>
                                <DeleteOutlinedIcon />
                            </IconButton>)
                        ) : (
                            null
                        )}
                    </CardActions>
                    <List sx={{ width: '100%', maxWidth: 500, bgcolor: 'background.paper' }}>
                        {comments?.map((comment) => (
                            <Comment comment={comment}
                                key={comment._id}
                            />))}
                    </List>
                    <div>
                        <form onSubmit={handleComment}>
                            <TextField fullWidth label='Add a comment' name='comment' variant='outlined' />
                            <Button className='buttonMUI' type='submit' variant='contained' style={{ marginBottom: '20px', marginRight: '15px', marginTop: '15px' }}>Send</Button>

                        </form>
                    </div>
                </CardContent>
            </Card>
        </Container>
    );

}
