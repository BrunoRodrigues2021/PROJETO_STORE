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

    _validateName(name, isRequired = true) {
        const errors = [];

        if (isRequired && SharedValidationHelpers.isMissing(name)) {
            errors.push(SharedErrors.MISSING_NAME.description);
        } else if (!SharedValidationHelpers.isStringValid(name) && !SharedValidationHelpers._isEmpty(name)) {
            errors.push(SharedErrors.INVALID_NAME.description);
        }

        return errors;
    }

    _validatePage(pageNumber, isRequired = true) {
        const errors = [];

        if (isRequired && SharedValidationHelpers.isMissing(pageNumber)) {
            errors.push(SharedErrors.MISSING_PAGE_NUMBER.description);
        } else if (!SharedValidationHelpers.isPageNumberValid(pageNumber, isRequired)) {
            errors.push(SharedErrors.INVALID_PAGE_NUMBER.description);
        }

        return errors;
    }

    _validatePageSize(pageLimit, isRequired = true) {
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

    _validateRequestBodyParameters(requestBody, params) {
        const bodyAllowedParameters = new Set(params);
        const errors = [];

        for (const param in requestBody) {
            if(!bodyAllowedParameters.has(param)) {
                errors.push(SharedErrors.UNEXPECT_PARAMETER.description)
            }
        }

        return errors;
    }

    _validateSortBy(sortBy, expectedValidSortBy, isRequired = true) {
        const errors = [];

        if (SharedValidationHelpers.isMissing(sortBy)) {
            if (isRequired) {
                errors.push(SharedErrors.MISSING_SORT_BY);
            }
        } else {
            if (!SharedValidationHelpers.isSortByValid(sortBy, expectedValidSortBy, isRequired)) {
                errors.push(SharedErrors.INVALID_SORT_BY);
            }
        }

        return errors;
    }

    _validateSortOrder(sortOrder, expectedValidSortOrder, isRequired = true) {
        const errors = [];

        if (SharedValidationHelpers.isMissing(sortOrder)) {
            if (isRequired) {
                errors.push(SharedErrors.MISSING_SORT_ORDER);
            }
        } else {
            if (!SharedValidationHelpers.isSortOrderValid(sortOrder, expectedValidSortOrder, isRequired)) {
                errors.push(SharedErrors.INVALID_SORT_ORDER);
            }
        }

        return errors;
    }
}

module.exports = SharedValidators;