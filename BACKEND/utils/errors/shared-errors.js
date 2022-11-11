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
}

module.exports = SharedErrors;