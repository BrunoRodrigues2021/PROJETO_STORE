const express = require('express');
const router = express.Router();
const {StatusCodes} = require('http-status-codes');

const CurrencyService = require('../services/currency-service')
const logger = require('../logger');
const path = require('path');
const _fileName = path.basename(__filename);

class CurrencyController {
    constructor() {
        router.get('/',
            this._handleGetCurrencyExchangeRate
        );
    }

    async _handleGetCurrencyExchangeRate(request, response) {
        logger.info(`${_fileName} : Getting currency exchange rate`);
        try {
            logger.info(`${_fileName} : Successfully getting currency exchange rate`);
            const currencyExchangeRate = await CurrencyService.getCurrencyExchangeRate();
            response.status(StatusCodes.OK).send(currencyExchangeRate);
        } catch (error) {
            logger.error(`${_fileName} : Error getting currency exchange rate : Error: ${JSON.stringify(error)}`);
        }
    }
}


new CurrencyController();
module.exports = router;