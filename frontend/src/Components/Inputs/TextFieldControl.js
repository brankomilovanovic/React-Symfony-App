import TextField from "@mui/material/TextField";
import {Controller} from "react-hook-form";
import React, { useState } from "react";

const TextFieldControl = (props) => {

    const [isFieldSelected, setIsFieldSelected] = useState(false);

    return <Controller
        {...props}
        control={props.control}
        name={props.name}
        defaultValue={props.defaultValue}
        rules={props.rules}
        render={({field}) =>
            <TextField {...field}
                       id={'text-field-control-' + props.name}
                       onKeyPress={props?.onKeyPress}
                       InputLabelProps={{...field, shrink: true}}
                       size={props.size ? props.size : 'small'}
                       fullWidth={props.fullWidth ? props.fullWidth : true}
                       type={props.type}
                       margin={props.margin ? props.margin : 'normal'}
                       error={props.error}
                       helperText={props.helperText}
                       label={props.label}
                       disabled={props.disabled}
                       multiline={props.multiline}
                       rows={props.rows}
                       maxRows={props.maxRows}
                       autoFocus = {props.autoFocus}
                       InputProps={{
                            ...props.inputProps,
                            onClick: () => setIsFieldSelected(true),
                            onBlur: () => setIsFieldSelected(false),
                            value: field.value,
                        }}
                       placeholder={props.placeholder}
                       className={props?.className ?? 'mui-shifted-label-input'}
            />}
    />
}

export default TextFieldControl;