import React from "react";
import {
    Button,
    Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle
} from "@mui/material";
import strings from "../localization";

export const YesNoDialogResult = {
    YES: 1,
    NO: 2,
    CANCEL: 3
}

const YesNoDialog = ({
    handleResult = () => {}, 
    title = strings.components.yesNoDialog.confirmDelete, 
    text = strings.components.yesNoDialog.confirmDeleteMessage, 
    show = false, 
    positiveText = strings.components.yesNoDialog.yes, 
    negativeText = strings.components.yesNoDialog.no}) => {

    const selected = (result) => {
        if(handleResult) {
            handleResult(result)
        }
    }

    return (
        <Dialog className="yes-no-dialog"
                open={ show }
                onClose={ () => selected(YesNoDialogResult.CANCEL) }
                aria-labelledby='draggable-dialog-title'
        >
            <DialogTitle id='draggable-dialog-title'>
                { title }
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    { text }
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={ () => selected(YesNoDialogResult.NO) } variant="outlined">
                    { negativeText }
                </Button>
                <Button onClick={ () => selected(YesNoDialogResult.YES) } color="secondary" variant="contained">
                    { positiveText }
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default YesNoDialog;