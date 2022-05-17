import React, { useContext } from 'react'
import GlobalContext from '../../contexts/globalContext'
import { Snackbar as SnackbarMUI, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

export const Snackbar = () => {
    const { snackBarState: { isOpen, msg }, setSnackBarState } = useContext(GlobalContext)

    const handleClose = () =>
        setSnackBarState(() => {
            return {
                isOpen: false,
                msg: null,
            };
        });

    const action = (
        <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
        >
            <CloseIcon fontSize="small" />
        </IconButton>
    );

    return (
        <div>
            <SnackbarMUI
                open={isOpen}
                autoHideDuration={6000}
                onClose={handleClose}
                message={msg}
                action={action}
            />
        </div>
    );
}
