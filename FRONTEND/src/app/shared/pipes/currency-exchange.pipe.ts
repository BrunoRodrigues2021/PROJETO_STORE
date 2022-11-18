import {Pipe, PipeTransform} from '@angular/core';
import {PortalService} from "../portal.service";
import {SharedConstants} from "../constants/shared-constants";

@Pipe({
  name: 'currencyExchange'
})
export class CurrencyExchangePipe implements PipeTransform {

  constructor(private portalService: PortalService) {
  }

  transform(currency: number) {
    let exchangeRate;

    if (this.portalService.getCurrencyExchangeRate() === SharedConstants.CURRENCY_EXCHANGE_RATE.EN) {
      exchangeRate = 1;
    } else if (this.portalService.getCurrencyExchangeRate() === SharedConstants.CURRENCY_EXCHANGE_RATE.PT) {
      exchangeRate = 5.398052;
    }

    console.log("ALTERADO: " + exchangeRate)

    return (currency * exchangeRate).toFixed(2);
  }

}
