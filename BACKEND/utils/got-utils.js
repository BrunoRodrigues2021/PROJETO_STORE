const got = require('got');
const logger = require("../logger");
const {StatusCodes} = require("http-status-codes");

const _fileName = module.filename.split("/").pop();

class GotUtils {

    async sendGetRequest(url, options) {
        try {
            let response = await got.get(url, options).json();
            if (!response.token && response.statusCode) {
                this._verifyResponseStatus(response, StatusCodes.OK);
            }

            return response;
        } catch(error) {
            logger.error(`${_fileName} : Error sending get request : url : ${url} : options : ${JSON.stringify(options)}`);
            throw error;
        }
    }

    _verifyResponseStatus(response, expectedSuccessResponseCode) {
        if (response.statusCode !== expectedSuccessResponseCode) {
            throw this._getErrorPayload(response);
        }
    }

    _getErrorPayload(data) {
        const payload = {};
        payload.code = data.statusCode;
        payload.message = data.message;
        payload.error = data.error;
        if (data.list) {
            payload.list = data.list;
        }
        return payload;
    }
}

module.exports = new GotUtils();