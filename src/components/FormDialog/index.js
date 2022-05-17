import React, { useState, useEffect, useContext } from 'react'
import GlobalContext from '../../contexts/globalContext'
import { Dialog, Button, TextField, DialogActions, DialogTitle, DialogContent } from '@mui/material'
import api from '../../utils/api'

export const FormDialog = () => {
    const { formDialogState: { postId, isOpen }, setFormDialogState, setPostList } = useContext(GlobalContext)

    const [title, setTitle] = useState('')
    const [text, setText] = useState('')
    const [image, setImage] = useState('')
    const [tags, setTags] = useState('')

    useEffect(() => {
        if (postId) {
            api.getPosts(postId)
                .then((post) => {
                    setTitle(post?.title)
                    setText(post?.text)
                    setImage(post?.image)
                    setTags(post?.tags.join(', '))
                })
                .catch(err => alert(err))
        }
    }, [postId]);

    const handleClose = () => {
        setFormDialogState(() => {
            return {
                isOpen: false,
                postId: null,
            }
        })
    }

    const handleSubmit = () => {
        if (postId) {
            api.editPost(postId, title, text, image, tags)
                .then(() => handleClose())
                .catch(err => alert(err))
        } else {
            api.createPost(title, text, image, tags)
                .then((newPost) => setPostList(prevState => [newPost, ...prevState]))
                .then(() => handleClose())
                .catch(err => alert(err))
        }
    };

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

