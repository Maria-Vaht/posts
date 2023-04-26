import React, { useState, useEffect, useContext } from 'react'
import GlobalContext from '../../contexts/globalContext'
import { Dialog, Button, TextField, DialogActions, DialogTitle, DialogContent } from '@mui/material'
import { useApi } from '../../hooks/useApi'

export const FormDialog = () => {
    const api = useApi()
    const { formDialogState: { postId, isOpen }, setFormDialogState, setSnackBarState, setPostList } = useContext(GlobalContext)

    const [title, setTitle] = useState('')
    const [text, setText] = useState('')
    const [image, setImage] = useState('')
    const [tags, setTags] = useState('')

    const showErrorMessage = () => {
        setModalState(() => {
            return {
                isOpen: true,
                msg: 'Unexpected error occurred. Please try again later',
            };
        });
    }

    useEffect(() => {
        if (postId) {
            api.getPosts(postId)
                .then((post) => {
                    setTitle(post?.title)
                    setText(post?.text)
                    setImage(post?.image)
                    setTags(post?.tags.join(', '))
                })
                .catch(showErrorMessage);
        }
    }, [postId]);

    const cleanStates = () => {
        setTitle('')
        setText('')
        setImage('')
        setTags('')
    }

    const handleClose = () => {
        setFormDialogState(() => {
            return {
                isOpen: false,
                postId: null,
            }
        })
        cleanStates()
    }

    const handleSubmit = () => {
        if (!title) {
            setSnackBarState({
                isOpen: true, msg: 'Title can\'t be empty'
            })
        } else if (!text) {
            setSnackBarState({
                isOpen: true, msg: 'Text can\'t be empty'
            })
        } else {
            if (postId) {
                api.editPost(postId, title, text, image, tags)
                    .then(() => handleClose())
                    .catch(showErrorMessage)
            } else {
                api.createPost(title, text, image, tags)
                    .then((newPost) => setPostList(prevState => [newPost, ...prevState]))
                    .then(() => handleClose())
                    .catch(showErrorMessage)
            }
        }
        cleanStates()
    }

    return (
        <div>
            <Dialog disablePortal={true} open={isOpen} onClose={handleClose}>
                <DialogTitle>{postId ? 'Edit post' : 'Create post'}</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Title"
                        fullWidth
                        variant="standard"
                        value={title}
                        onChange={({ target }) => {
                            setTitle(target.value);
                        }}
                    />
                    <TextField
                        margin="dense"
                        label="Text"
                        fullWidth
                        variant="standard"
                        value={text}
                        onChange={({ target }) => {
                            setText(target.value);
                        }}
                    />
                    <TextField
                        margin="dense"
                        label="Image"
                        fullWidth
                        variant="standard"
                        value={image}
                        onChange={({ target }) => {
                            setImage(target.value);
                        }}
                    />
                    <TextField
                        margin="dense"
                        label="Tags"
                        fullWidth
                        variant="standard"
                        value={tags}
                        onChange={({ target }) => {
                            setTags(target.value);
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSubmit}>{postId ? 'Edit' : 'Create'}</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

