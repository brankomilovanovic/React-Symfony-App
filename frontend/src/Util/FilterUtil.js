export const FilterDefaults = {
    page: 1,
    perPage: JSON.parse(process.env.REACT_APP_ROWS_PER_PAGE)[0],
    term: '',
    sortBy: 'date_created',
    sortOrder: 'DESC'
}