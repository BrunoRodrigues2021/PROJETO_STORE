const GotUtils = require("../utils/got-utils")
const {logger} = require("../logger");
const path = require("path");
const _fileName = path.basename(__filename);


class CurrencyService {
    async getCurrencyExchangeRate() {
        try {
            const url = 'https://api.exchangerate.host/latest'
            const base = 'USD'
            const options = {
                method: "GET",
                searchParams: {base}
            }
            const responseFromCurrencyApi = await GotUtils.sendGetRequest(url, options);
            const exchangeRates = (responseFromCurrencyApi.rates);

            return {USD: exchangeRates.USD, BRL: exchangeRates.BRL};
        } catch (error) {
            logger.error(`${_fileName} : Error fetching currency exchange rate : Error: ${JSON.stringify(error)}`);
        }
    }

}

module.exports =  new CurrencyService();
