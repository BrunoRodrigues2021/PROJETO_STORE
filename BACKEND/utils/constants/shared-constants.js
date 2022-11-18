const Pagination = {
    page: {
        defaultValue: 1,
        minValue: 1
    },
    pageSize: {
        defaultValue: 10,
        minValue: 1,
        maxValue: 100
    }
};

const SortBy = {
    id: 'id'
}

const SortOrder = {
    asc: 'ASC',
    desc: 'DESC'
}

module.exports = {
    Pagination,
    SortBy,
    SortOrder
};