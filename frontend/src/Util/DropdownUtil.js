import {MenuItem} from "@mui/material";

export const getDropdownOptions = (array, label) => {

    if(!array){
        return;
    }

    let result = [];

    for(let item of array) {
        result.push(
            <MenuItem 
                key={'menu-option-' + label + '-' + result.length} 
                value={item.id}
                className={'filter-dropdown-item'}
            >
                {item[label]}
            </MenuItem>
        )
    }

    return result;
}
