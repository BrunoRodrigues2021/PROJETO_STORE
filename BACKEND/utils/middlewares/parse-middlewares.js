const HttpStatus = require('http-status-codes');
const logger = require('../../logger');
const SharedErrors = require('../errors/shared-errors');
const FormHelper = require('../form-helper');

const _fileName = module.filename.split("/").pop();

class ParseMiddleware {

    async parseMultidataForm(request, response, next) {
        try {
            logger.info(`${_fileName} : Parsing multidata form from ${request.originalUrl}`);
            const [fields, files] = await FormHelper.formParser(request);
            request.body = fields;
            request.files = files;
            next();
        } catch (error) {
            logger.warn(`${_fileName} : Error parsing multidata form : ${error}`);
            return response.status(HttpStatus.INTERNAL_SERVER_ERROR).send({error: SharedErrors.PARSING_FORM_ERROR});
        }
    }
}

module.exports = new ParseMiddleware();
