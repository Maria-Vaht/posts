import React, { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { PostList } from './components/PostList'
import GlobalContext from './contexts/globalContext'
import api from './utils/api.js'
import './index.css'
import { Pagination } from './components/Pagination'
import { Snackbar } from './components/Snackbar'
import { ConfirmDialog } from './components/ConfirmDialog'
import { Header } from './components/Header'

import { Info } from './components/Info'
import Footer from './components/Footer'
import PostPage from './components/PostPage'
import { Button, createTheme, ThemeProvider } from '@mui/material'
import { FormDialog } from './components/FormDialog'


export const App = () => {
  const theme = createTheme({
    palette: {
      primary: {
        main: '#9db25c',
      },
      secondary: {
        main: '#eadb5c',
      },
    },
  });

  const [postList, setPostList] = useState(null)
  const [currentUser, setCurrentUser] = useState(null)
  const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem('favorites')) || []);
  const [currentPage, setCurrentPage] = useState(1)
  const postsPerPage = 12
  const [snackBarState, setSnackBarState] = useState({
    isOpen: false,
    msg: null,
  });

  const [formDialogState, setFormDialogState] = useState({
    isOpen: false,
    postId: null,
  })

  const [confirmDialogState, setConfirmDialogState] = useState({
    isOpen: false,
    postId: null,
  })

  useEffect(() => {

    api.getPosts()
      .then((posts) => setPostList(posts))
      .catch(err => alert(err));

  }, []);

  useEffect(() => {

    api.getCurrentUser()
      .then((user) => setCurrentUser(user))
      .catch(err => alert(err));
  }, []);

  const indexOfLastPost = currentPage * postsPerPage
  const indexOfFirstPost = indexOfLastPost - postsPerPage
  const currentPosts = postList?.slice(indexOfFirstPost, indexOfLastPost)

  return (
    <ThemeProvider theme={theme}>
      <GlobalContext.Provider value={{
        postList,
        setPostList,
        currentPosts,
        postsPerPage,
        setCurrentPage,
        currentUser,
        favorites,
        setFavorites,
        snackBarState,
        setSnackBarState,
        confirmDialogState,
        setConfirmDialogState,
        formDialogState,
        setFormDialogState,

      }}>
        <div className='appContainer'>
          <Header>
            <Button className='buttonMUI' variant='contained' color='secondary' onClick={() => {
              setFormDialogState({
                isOpen: true,
                postId: null,
              })
            }}>
              New post
            </Button>
            <Info />
          </Header>
          <Routes>
            <Route path="/"
              element={<div className='content__cards'>
                <PostList />
                <Pagination />
              </div>
              }
            />
            <Route path="post/:postID" element={<PostPage />} />
          </Routes>
          <FormDialog />
          <ConfirmDialog />
          <Snackbar />
          <Footer />
        </div>
      </GlobalContext.Provider>
    </ThemeProvider>
  )
}