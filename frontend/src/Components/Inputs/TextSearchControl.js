import {Controller} from "react-hook-form";
import React from "react";
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';

const TextSearchControl = (props) => {
    return <Controller
        {...props}
        control={props.control}
        name={props.name}
        defaultValue={props.defaultValue}
        rules={props.rules}
        render={({ field }) =>
            <div id = 'searchfield-container'>
                <Paper>
                    <IconButton>
                        <img src = '/images/search.svg' />
                    </IconButton>
                    <InputBase
                        {...field}
                        placeholder = {props.placeholder}
                    />
                </Paper>
            </div>
        }
    />
}

export default TextSearchControl;
