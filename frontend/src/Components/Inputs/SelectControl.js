import {Controller} from "react-hook-form";
import React, {useEffect, useState} from "react";
import {Box, FormControl, FormHelperText, InputLabel, Select} from "@mui/material";
import { getDropdownOptions } from "../../Util/DropdownUtil";

const SelectControl = (props) => {
    
    const [value, setValue] = useState(props.value && props.value[props.valueKey] ? props.value[props.valueKey] : '')

    const changeValue = (newValue) => {
        props.setValue(props.name, newValue)
        setValue(newValue);
    }

    useEffect(() => {
        if((props.value && !(props.value instanceof Object)) || props.value === 0) {
            setValue(props.value)
            return;
        }

        setValue(props.value && props.value[props.valueKey] ? props.value[props.valueKey] : '')
    }, [props.value])

    return <Box sx={{ minWidth: 120 }} className={'select-box ' + props.className} style={props.style}>
        <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label" className="select-label" error={props.error}>{props.label}</InputLabel>
            { (props?.placeholder && !value) &&
                <InputLabel id="demo-simple-select-placeholder" className="select-placeholder">{props.placeholder}</InputLabel>
            }
            <Controller
                name={props.name}
                control={props.data}
                rules={props.rules}
                render={({field}) =>
                    <Select {...field}
                            disabled={props.disabled}
                            defaultOpen = {props.defaultOpen}
                            value={value}
                            size={props.size ? props.size : 'small'}
                            label={props.label}
                            error={props.error}
                            onClose = {props.onClose}
                            onChange={e => {
                                if (field?.onChange) {
                                    field.onChange(() => changeValue(e.target.value));
                                    return
                                }
                                changeValue(e.target.value);
                            }}
                    >
                        { getDropdownOptions(props.options, props.nameKey, props.valueKey) }
                    </Select>}
            />

            {
                props.error &&
                <FormHelperText>{props.helperText}</FormHelperText>
            }
        </FormControl>
    </Box>
}

export default SelectControl;
