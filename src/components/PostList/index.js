import React, { useContext } from 'react'
import GlobalContext from '../../contexts/globalContext'
import { Post } from '../Post'
import style from './style.module.css'

export const PostList = () => {
    const { isTabLiked, currentPostsLiked, isTabPostsCreated, currentPostsCreated, currentPostsAll } = useContext(GlobalContext)
    const list = isTabLiked ? currentPostsLiked :
        isTabPostsCreated ? currentPostsCreated : currentPostsAll

    return (
        <div className={style.postListContainer}>
            {list?.map(post => (
                <Post className={style.post} key={post._id}
                    post={post}
                />))}
        </div>
    )
}
