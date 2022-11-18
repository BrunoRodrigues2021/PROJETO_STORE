const Pagination = {
    PAGE: {
        DEFAULT_VALUE: 1,
        MIN_VALUE: 1
    },
    PAGE_SIZE: {
        DEFAULT_VALUE: 10,
        MIN_VALUE: 1,
        MAX_VALUE: 100
    }
};

const SortOrder = {
    ASC: 'ASC',
    DESC: 'DESC'
}

module.exports = {
    Pagination,
    SortOrder
};