import React, { useContext } from 'react'
import { Post } from '../Post'
import GlobalContext from '../../contexts/globalContext'
import style from './style.module.css'

export const PostList = () => {
    const { currentPosts } = useContext(GlobalContext)

    return (
        <div className={style.postListContainer}>
            {currentPosts?.map(post => (
                <Post className={style.post} key={post._id}
                    post={post}
                />))}
        </div>
    )
}
