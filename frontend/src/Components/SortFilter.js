import React, { useEffect, useState } from 'react'
import CustomModal from "../Components/CustomModal";
import { getSelectedSort, getSortTypes } from '../Constants/Sort';
import strings from '../localization';

const SortFilter = ({open = false, onClose = () => {}, onClick = () => {}, selected}) => {

    const [selectedSort, setSelectedSort] = useState(null);

    useEffect(() => {
        if(selected) {
            setSelectedSort(getSelectedSort(selected?.sortBy, selected?.sortOrder));
        }
    }, [selected])

    const handleSelectSort = (sort) => {
        setSelectedSort(sort?.id);
        onClick(sort);
    }

    const renderSorts = () => {
        let result = [];

        for(let i of getSortTypes()) {
            result.push(<div key={'sort-' + i?.id} className='sort-filter-type' onClick={() => handleSelectSort(i)} style={{background: i?.id === selectedSort && '#e1dcdc'}}>
                {i?.name}
            </div>)
        }

        return result;
    }

    return <CustomModal showModal={open} onClose={onClose} title={strings.base.filter.sort.sortType}>
        <div className='sort-filter-container'>
            {renderSorts()}
        </div>
    </CustomModal>
}

export default SortFilter;
