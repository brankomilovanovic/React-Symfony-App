import { Divider, Modal, Paper } from "@mui/material";
import React from "react";

const CustomModal = ({
        children,
        showModal = false, 
        onClose = () => {},
        title = ""
    }) => {
    

    return (
        <Modal
            open={Boolean(showModal)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            id = 'custom-modal'
            onClose={onClose}
        >
            <Paper>
                <div className="custom-modal-header">
                    <div>{title}</div>
                    <img src='/images/close.svg' className="image" onClick={onClose} />
                </div>
                <Divider />
                {children}
            </Paper>
        </Modal>
    );

}
export default CustomModal
