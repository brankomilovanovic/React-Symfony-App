import React from 'react'
import {Drawer, Grid} from "@mui/material";

const FullScreenModal = ({open = false, onClose = () => {}, title = '', children}) => {
    return <Drawer id='drawer' anchor='right' open={open} onClose={onClose}>
        <Grid className='full-screen-modal'>
            <div className='full-screen-modal-header'>
                <div className='cross-button' onClick={onClose}>
                    <img src='/images/close.svg' loading='lazy'/>
                </div>
                <p className='title'>{title}</p>
            </div>
            <div className='full-screen-modal-content'>
                { children }
            </div>
        </Grid> 
    </Drawer>
}

export default FullScreenModal;
