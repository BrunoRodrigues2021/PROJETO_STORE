const SharedValidationHelpers = require('../../validation-helpers/shared-validation-helpers');
const SharedErrors = require('../../errors/shared-errors');

class SharedValidators {

    _validateId(companyId, isRequired = true) {
        const errors = [];

        if (isRequired && SharedValidationHelpers.isMissing(companyId)) {
            errors.push(SharedErrors.MISSING_ID.description);
        } else if (!SharedValidationHelpers.isIdValid(companyId, isRequired)) {
            errors.push(SharedErrors.INVALID_ID.description);
        }

        return errors;
    }

    _validatePageNumber(pageNumber, isRequired = true) {
        const errors = [];

        if (isRequired && SharedValidationHelpers.isMissing(pageNumber)) {
            errors.push(SharedErrors.MISSING_PAGE_NUMBER.description);
        } else if (!SharedValidationHelpers.isPageNumberValid(pageNumber, isRequired)) {
            errors.push(SharedErrors.INVALID_PAGE_NUMBER.description);
        }

        return errors;
    }

    _validatePageLimit(pageLimit, isRequired = true) {
        const errors = [];

        if (isRequired && SharedValidationHelpers.isMissing(pageLimit)) {
            errors.push(SharedErrors.MISSING_PAGE_LIMIT.description);
        } else if (!SharedValidationHelpers.isPageLimitValid(pageLimit, isRequired)) {
            errors.push(SharedErrors.INVALID_PAGE_LIMIT.description);
        }

        return errors;
    }

    _validatePagination(pageNumber, pageLimit, isRequired = true) {
        const errors = [];

        if (!SharedValidationHelpers.isPaginationValid(pageNumber, pageLimit, isRequired)) {
            errors.push(SharedErrors.INVALID_PAGINATION.description);
        }

        return errors;
    }
}

module.exports = SharedValidators;