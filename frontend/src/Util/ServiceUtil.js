export const generateSearchURL = (data) => {

    const urlParams = new URLSearchParams();

    if(data?.extend) {
        urlParams.append('extend', data.extend)
    }

    if(data?.page) {
        urlParams.append('page', data.page)
    }

    if(data?.perPage) {
        urlParams.append('perPage', data.perPage)
    }

    if(data?.term) {
        urlParams.append('term', data.term)
    }

    if(data?.searchFields) {
        urlParams.append('searchFields', data.searchFields)
    }

    if(data?.sortBy) {
        urlParams.append('sortBy', data.sortBy)
    }

    if(data?.sortOrder) {
        urlParams.append('sortOrder', data.sortOrder)
    }

    if(data?.deleted) {
        urlParams.append('deleted', data.deleted)
    }

    return urlParams
}