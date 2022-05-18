import React, { useState, useContext } from 'react'
import GlobalContext from '../../contexts/globalContext'
import style from './style.module.css'
import { useLocalStorage } from '../../hooks/useLocalStorage'
import { Card, CardContent, CardMedia, CardActions, Typography, IconButton, CardHeader, Avatar } from '@mui/material'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined'
import EditIcon from '@mui/icons-material/Edit'
import { Link } from 'react-router-dom'
import { useApi } from '../../hooks/useApi'

export const Post = ({ post }) => {
    const api = useApi()

    const { title,
        image,
        text,
        tags,
        likes,
        comments,
        author: { avatar,
            _id: authorId,
            name,
            about, },
    } = post

    const { writeLS, removeLS } = useLocalStorage();
    const { setPostList, currentUser, favorites, setFavorites, setSnackBarState, setConfirmDialogState, setFormDialogState, currentPosts } = useContext(GlobalContext)
    const [favoriteCounter, setFavoriteCounter] = useState(likes.length)

    const dayjs = require('dayjs')
    const dateParsedCreatedAt = dayjs(post['created_at']).format('DD-MM-YYYY HH:mm:ss')

    const addFavorite = () => {
        writeLS('favorites', post._id)
        setFavorites((prevState) => [...prevState, post._id])
        setFavoriteCounter((prevState) => prevState + 1)
        api.addLike(post._id)
            .then(() => {
                setSnackBarState({
                    isOpen: true, msg: 'Лайк поставлен'
                })
            })
            .catch(() => {
                setSnackBarState({
                    isOpen: true, msg: 'Не удалось поставить лайк'
                })
            });
    }

    const removeFavorite = () => {
        removeLS('favorites', post._id)
        setFavorites((prevState) => prevState.filter((postId) => postId !== post._id))
        setFavoriteCounter((prevState) => prevState - 1)
        api.deleteLike(post._id)
            .then(() => {
                setSnackBarState({
                    isOpen: true, msg: 'Лайк убран'
                })
                    .catch(() => {
                        setSnackBarState({
                            isOpen: true, msg: 'Не удалось убрать лайк'
                        })
                    })
            })
    }

    return (
        <div className={style.post}>
            <Card sx={{ maxWidth: 345 }}>
                <div>
                    <CardHeader
                        avatar={
                            <Avatar src={avatar}></Avatar>
                        }
                        title={name}
                        subheader={about}
                    />
                    <CardMedia
                        component="img"
                        height="300"
                        image={image}
                        alt="post"
                    />
                    <CardContent>
                        <Typography variant="body2" color="text.secondary">
                            {dateParsedCreatedAt}
                        </Typography>
                        <div className={style.title}>
                            <Typography gutterBottom variant="h5" component="div" marginTop='20px'>
                                <Link style={{ textDecoration: 'none', color: 'inherit' }} to={`post/${post._id}`}>
                                    {title}
                                </Link>
                            </Typography>
                        </div>
                        <div className={style.text}>
                            <Typography variant="body2" color="text.secondary">
                                <Link style={{ textDecoration: 'none', color: 'inherit' }} to={`post/${post._id}`}>
                                    {text}
                                </Link>
                            </Typography>
                        </div>
                        <div className={style.tagListContainer}>
                            {tags.map((tag, i) => <div key={i} className={style.tag}>{tag}</div>)}
                        </div>
                    </CardContent>
                    <CardActions>
                        {favorites.includes(post._id) ? (
                            <IconButton aria-label='add to favorites' onClick={removeFavorite}>
                                <FavoriteIcon color='warning' />
                            </IconButton>
                        ) : (
                            <IconButton aria-label='add to favorites' onClick={addFavorite}>
                                <FavoriteBorderOutlinedIcon />
                            </IconButton>
                        )}
                        <Typography variant="body2" color="text.secondary">
                            {favoriteCounter}
                        </Typography>
                        <IconButton>
                            <CommentOutlinedIcon />
                        </IconButton>
                        <Typography variant="body2" color="text.secondary">
                            {comments.length}
                        </Typography>
                        {currentUser?._id === authorId ? (
                            (<IconButton onClick={() => {
                                setFormDialogState({
                                    isOpen: true,
                                    postId: post._id,
                                })
                            }}>
                                <EditIcon />
                            </IconButton>)
                        ) : (
                            null
                        )}
                        {currentUser?._id === authorId ? (
                            (<IconButton onClick={() => {
                                setConfirmDialogState({
                                    isOpen: true,
                                    postId: post._id,
                                })
                            }}>
                                <DeleteOutlinedIcon />
                            </IconButton>)
                        ) : (
                            null
                        )}
                    </CardActions>
                </div>
            </Card >
        </div >
    )
}
