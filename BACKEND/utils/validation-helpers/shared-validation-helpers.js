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


    isPageNumberValid(pageNumber, isRequired = true, minPageNumber = Pagination.pageNumber.minValue) {
        if (this.isMissing(pageNumber)) {
            return !isRequired;
        }

        pageNumber = +pageNumber;

        return Number.isInteger(pageNumber)
            && pageNumber >= minPageNumber;
    }

    isPageLimitValid(pageLimit, isRequired = true, minPageLimit = Pagination.pageLimit.minValue,
                     maxPageLimit = Pagination.pageLimit.maxValue) {

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
}

module.exports = new SharedValidationHelpers();