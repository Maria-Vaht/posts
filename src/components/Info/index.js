
import React, { useContext } from 'react'
import GlobalContext from '../../contexts/globalContext'
import Avatar from '@mui/material/Avatar';
import './index.css';
import { Link } from 'react-router-dom';

export const Info = () => {
  const { currentUser } = useContext(GlobalContext);
  return (
    <div className='about'>
      <Link to ="/">{ <Avatar src= {currentUser?.avatar} /> }
      </Link> 
        {currentUser?.name}
    </div>
  )
}