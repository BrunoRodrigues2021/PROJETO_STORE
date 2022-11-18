const {StatusCodes: HttpCodes} = require('http-status-codes');

class SharedErrors {

    /** HTTP Errors */

    static get BAD_REQUEST() {
        return {
            code: HttpCodes.BAD_REQUEST,
            description: 'badRequest'
        };
    }

    static get CONFLICT() {
        return {
            code: HttpCodes.CONFLICT,
            description: 'conflict'
        };
    }

    static get FORBIDDEN() {
        return {
            code: HttpCodes.FORBIDDEN,
            description: 'forbidden'
        };
    }

    static get INTERNAL_SERVER_ERROR() {
        return {
            code: HttpCodes.INTERNAL_SERVER_ERROR,
            description: 'internalServerError'
        };
    }

    static get NOT_FOUND() {
        return {
            code: HttpCodes.NOT_FOUND,
            description: 'notFound'
        };
    }

    static get UNAUTHORIZED() {
        return {
            code: HttpCodes.UNAUTHORIZED,
            description: 'unauthorized'
        };
    }

    static get DATABASE_ERROR() {
        return {
            code: HttpCodes.UNAUTHORIZED,
            description: 'databaseError'
        };
    }

    /** Shared Validation Errors */

    static get UNEXPECT_PARAMETER() {
        return {
            code: HttpCodes.BAD_REQUEST,
            description: 'unexpectedParameter'
        };
    }

    static get INVALID_ID() {
        return {
            code: HttpCodes.BAD_REQUEST,
            description: 'invalidId'
        };
    }

    static get MISSING_ID() {
        return {
            code: HttpCodes.BAD_REQUEST,
            description: 'missingId'
        };
    }

    static get MISSING_NAME() {
        return {
            code: HttpCodes.BAD_REQUEST,
            description: 'missingName'
        };
    }

    static get INVALID_NAME() {
        return {
            code: HttpCodes.BAD_REQUEST,
            description: 'invalidName'
        };
    }

    static get INVALID_PAGE_LIMIT() {
        return {
            code: HttpCodes.BAD_REQUEST,
            description: 'invalidPageLimit'
        };
    }

    static get MISSING_PAGE_LIMIT() {
        return {
            code: HttpCodes.BAD_REQUEST,
            description: 'missingPageLimit'
        };
    }

    static get INVALID_PAGE_NUMBER() {
        return {
            code: HttpCodes.BAD_REQUEST,
            description: 'invalidPageNumber'
        };
    }

    static get MISSING_PAGE_NUMBER() {
        return {
            code: HttpCodes.BAD_REQUEST,
            description: 'missingPageNumber'
        };
    }

    static get INVALID_PAGINATION() {
        return {
            code: HttpCodes.BAD_REQUEST,
            description: 'invalidPagination'
        };
    }

    static get MISSING_SORT_BY() {
        return {
            code: HttpCodes.BAD_REQUEST,
            description: 'missingSortBy'
        };
    }

    static get INVALID_SORT_BY() {
        return {
            code: HttpCodes.BAD_REQUEST,
            description: 'invalidSortBy'
        };
    }

    static get MISSING_SORT_ORDER() {
        return {
            code: HttpCodes.BAD_REQUEST,
            description: 'missingSortOrder'
        };
    }

    static get INVALID_SORT_ORDER() {
        return {
            code: HttpCodes.BAD_REQUEST,
            description: 'invalidSortOrder'
        };
    }
}

module.exports = SharedErrors;