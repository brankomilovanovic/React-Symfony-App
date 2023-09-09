import strings from "../localization";

export const Sort = {
    DATETIME_CREATED_DESC: 1,
    DATETIME_CREATED_ASC: 2
};

export const getSortData = (sort) => {
    let sortData = {
        [Sort.DATETIME_CREATED_DESC]: {sortBy: 'date_created', sortOrder: 'DESC'},
        [Sort.DATETIME_CREATED_ASC]: {sortBy: 'date_created', sortOrder: 'ASC'}
    };
    return sortData[sort] ?? {};
};

export const getSelectedSort = (selectedSortBy, selectedSortOrder) => {
    for(let i of Object.values(Sort)) {
        const {sortBy, sortOrder} = getSortData(i);
        if(selectedSortBy === sortBy && selectedSortOrder === sortOrder) {
            return i;
        }
    }
};

export const getSortName = (sort) => {
    let sortName = {
        [Sort.DATETIME_CREATED_DESC]: strings.base.filter.sort.datetimeDesc,
        [Sort.DATETIME_CREATED_ASC]: strings.base.filter.sort.datetimeAsc
    };
    return sortName[sort] ?? sort;
};

export function getSortTypes() {
    return [
        {
            id: Sort.DATETIME_CREATED_DESC,
            name: getSortName(Sort.DATETIME_CREATED_DESC)
        },
        {
            id: Sort.DATETIME_CREATED_ASC,
            name: getSortName(Sort.DATETIME_CREATED_ASC)
        }
    ];
}