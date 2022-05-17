import React, { useContext } from 'react'
import PropTypes from 'prop-types';
import { Tabs, Tab, Typography, Box, Grid } from '@mui/material';
import style from './style.module.css'
import GlobalContext from '../../contexts/globalContext'

export const TabsPanel = () => {
    const { setIsTabLiked, setIsTabPostsCreated } = useContext(GlobalContext)

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    function TabPanel(props) {
        const { children, value, index, ...other } = props;

        return (
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`simple-tabpanel-${index}`}
                aria-labelledby={`simple-tab-${index}`}
                {...other}
            >
                {value === index && (
                    <Box sx={{ p: 3 }}>
                        <Typography component={'span'}>{children}</Typography>
                    </Box>
                )}
            </div>
        );
    }

    TabPanel.propTypes = {
        children: PropTypes.node,
        index: PropTypes.number.isRequired,
        value: PropTypes.number.isRequired,
    };

    return (

        <div className={style.tabsPanel}>
            <Tabs value={value} onChange={handleChange}>
                <Tab onClick={() => {
                    setIsTabLiked(false)
                    setIsTabPostsCreated(false)
                }}
                    label="All posts" />
                <Tab onClick={() => {
                    setIsTabPostsCreated(true)
                    setIsTabLiked(false)
                }} label="Your posts" />
                <Tab onClick={() => {
                    setIsTabLiked(true)
                    setIsTabPostsCreated(false)
                }} label="You liked" />
            </Tabs>
        </div >

    )
}