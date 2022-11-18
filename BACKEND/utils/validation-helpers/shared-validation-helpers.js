const {Pagination} = require('../constants/shared-constants');

class SharedValidationHelpers {


    isMissing(param) {
        return this._isEmpty(param) || this._isEmptyString(param);
    }

    isEmptyArray(array) {
        return this.isMissing(array)
            || (Array.isArray(array) && !array.length);
    }

    isIdValid(id, isRequired = true) {
        if (this.isMissing(id)) {
            return !isRequired;
        }

        id = +id;

        return Number.isInteger(id) && id > 0;
    }


    isPageNumberValid(pageNumber, isRequired = true, minPageNumber = Pagination.PAGE.MIN_VALUE) {
        if (this.isMissing(pageNumber)) {
            return !isRequired;
        }

        pageNumber = +pageNumber;

        return Number.isInteger(pageNumber)
            && pageNumber >= minPageNumber;
    }

    isPageLimitValid(pageLimit, isRequired = true, minPageLimit = Pagination.PAGE_SIZE.MIN_VALUE,
                     maxPageLimit = Pagination.PAGE_SIZE.MAX_VALUE) {

        if (this.isMissing(pageLimit)) {
            return !isRequired;
        }

        pageLimit = +pageLimit;

        return Number.isInteger(pageLimit)
            && pageLimit >= minPageLimit
            && pageLimit <= maxPageLimit;
    }

    isPaginationValid(pageNumber, pageSize, isRequired = true) {
        return this.isPageNumberValid(pageNumber, isRequired)
            && this.isPageLimitValid(pageSize, isRequired);
    }

    isStringValid(string) {
        return typeof string === 'string' && !this._isEmptyString(string);
    }

    _isEmpty(param) {
        return param === null || param === undefined;
    }

    _isEmptyString(string) {
        return typeof string === 'string'
            && !string.trim().length;
    }

    isSortByValid(
        sortBy,
        expectedValidSortBy,
        isRequired = true
    ) {
        if (this.isMissing(sortBy)) {
            return !isRequired;
        }

        return expectedValidSortBy.some((validSortBy) => validSortBy === sortBy);
    }

    isSortOrderValid(
        sortOrder,
        expectedValidSortOrder,
        isRequired = true
    ) {
        if (this.isMissing(sortOrder)) {
            return !isRequired;
        }

        return expectedValidSortOrder.some((validSortOrder) => validSortOrder === sortOrder);
    }
}

module.exports = new SharedValidationHelpers();