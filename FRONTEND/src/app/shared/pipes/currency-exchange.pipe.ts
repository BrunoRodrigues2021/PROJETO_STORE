import {Pipe, PipeTransform} from '@angular/core';
import {CURRENCY_EXCHANGE_RATE} from "../constants/shared-constants";
import {CurrencyService} from "../services/currency.service";
import {getCurrencyResponse} from "../interfaces/currency-interfaces";

@Pipe({
  name: 'currencyExchange'
})
export class CurrencyExchangePipe implements PipeTransform {
  private currency: getCurrencyResponse = CurrencyService.getCurrencyExchangeRate();

  constructor(
    private currencyService: CurrencyService
  ) {}


  transform(currency: number) {
    let exchangeRate;

    if (this.currencyService.getCurrencyExchangeRate() === CURRENCY_EXCHANGE_RATE.EN) {
      exchangeRate = this.currency.USD;
    } else if (this.currencyService.getCurrencyExchangeRate() === CURRENCY_EXCHANGE_RATE.PT) {
      exchangeRate = this.currency.BRL;
    }

    return (currency * exchangeRate).toFixed(2);
  }

}
