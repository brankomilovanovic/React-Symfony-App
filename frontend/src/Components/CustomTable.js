import React, { useCallback, useEffect, useState } from "react";
import { DataGrid } from '@mui/x-data-grid';
import { IconButton, Tooltip } from "@mui/material";
import strings from "../localization";
import { Role } from "../Constants/Role";
import { useSelector } from "react-redux";
import TextSearchControl from "./Inputs/TextSearchControl";
import { FormProvider, useForm } from "react-hook-form";
import { debounce } from "lodash";
import SortFilter from "./SortFilter";
import { getSortData } from "../Constants/Sort";

const CustomTable = ({
        tableDescription = [], 
        data = [], 
        onEdit = () => {}, 
        onDelete = () => {}, 
        onAdd = () => {}, 
        onRowDoubleClick = () => {},
        editRole = [Role.ADMIN],
        deleteRole = [Role.ADMIN],
        filter,
        setFilter = () => {},
        total,
        onReload = () => {},
        addButtonText = 'Add new',
        disabledAddButton = false
    }) => {

    const form = useForm({
        defaultValues: {
            term: '',
        }
    });

    const {control, watch} = form;

    const authUser = useSelector((state) => state.AuthReducer.authUser);
    const rowsPerPageOptions = JSON.parse(process.env.REACT_APP_ROWS_PER_PAGE);

    const [showSortModal, setShowSortModal] = useState(false);
    
    useEffect(() => {
        const subscription = watch((data) => {
            debounceSetFilter(data.term)
        });

        return () => {
            subscription.unsubscribe();
        };
    }, [watch]);

    const defaultTableDescription = [
        {
            field: 'action',
            headerName: strings.base.table.actions,
            width: 120,
            renderCell: params => formatColumnControl(params.row),
        }
    ]

    const handleClickOnAction = (event, row, action) => {
		event.stopPropagation();
        action(row);
    };


    const formatColumnControl = (row) => {            
        return <div className='submit-container'>
            { editRole?.includes(authUser?.role) && 
            <IconButton onClick={(e) => handleClickOnAction(e, row, onEdit)}>
                <Tooltip title={strings.base.table.edit} placement='left-start'>
                    <img src='/images/edit.svg'/>
                </Tooltip>
            </IconButton>
            }
            { deleteRole?.includes(authUser?.role) && 
            <IconButton onClick={(e) => handleClickOnAction(e, row, onDelete)}>
                <Tooltip title={strings.base.table.delete} placement='right-start'>
                    <img src='/images/delete.svg'/>
                </Tooltip>
            </IconButton>
            }
        </div>
    }

    const onPaginationModelChange = (pagination) => {
        const { page = 0, pageSize = 10 } = pagination || {};

        setFilter((prevFilter) => {
            
            if (prevFilter.page === page + 1 && prevFilter.perPage === pageSize) {
                return prevFilter;
            }
    
            return {
                ...prevFilter,
                page: page + 1,
                perPage: pageSize
            };
        });
    }

    const debounceSetFilter = useCallback(
        debounce((newValue) =>{
            setFilter(prevFilter => ({
                ...prevFilter,
                page: 1,
                term: newValue
            }));
        }, 800),
    []);

    const handleSelectSort = (sort) => {
        setShowSortModal(false);
        setFilter(prevFilter => ({
            ...prevFilter,
            ...getSortData(sort?.id)
        }));
    }
    
    return (
        <div className="custom-table">
            <div className={'header-container'}>
                <div className={'search-container'}>
                    <FormProvider {...form}>                          
                        <TextSearchControl
                            name='term'
                            control={control}
                            defaultValue=''
                            margin="normal"
                            placeholder={'Search'}
                        />
                    </FormProvider>
                    <IconButton onClick={onReload}>
                        <img src='/images/reload.svg'/>
                    </IconButton>
                    <IconButton  onClick={() => setShowSortModal(true)}>
                        <img src='/images/sort.svg'/>
                    </IconButton>
                </div>

                <IconButton className='add-button' disabled={disabledAddButton} onClick={onAdd}>
                    <img src='/images/add.svg'/>
                    {addButtonText}
                </IconButton>
            </div>

            <DataGrid
                rows={data}
                rowCount={total}
                columns={[...tableDescription, ...defaultTableDescription]}
                paginationMode="server"
                paginationModel={{page: filter?.page - 1, pageSize: filter?.perPage}}
                onPaginationModelChange={(pagionation) => onPaginationModelChange(pagionation)}
                onRowDoubleClick={(params) => onRowDoubleClick(params?.row)}
                pageSizeOptions={rowsPerPageOptions}
            />

            <SortFilter open={showSortModal} onClose={() => setShowSortModal(false)} onClick={handleSelectSort} selected={filter}/>
        </div>
    );

}
export default CustomTable
