import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {PortalService} from "./portal.service";
import {getCurrencyResponse} from "../interfaces/currency-interfaces";
import {CURRENCY_EXCHANGE_RATE} from "../constants/shared-constants";

@Injectable({
  providedIn: 'root'
})
export class CurrencyService extends PortalService {

  baseUrl = this.BASE_PATH + '/currency';

  constructor(private http: HttpClient) {
    // @ts-ignore
    super();
  }

  getCurrencyExchangeRate(): string {
    if (localStorage.getItem(PortalService.LANGUAGE_STORAGE_KEY) === 'en') {
      return CURRENCY_EXCHANGE_RATE.EN;
    } else if (localStorage.getItem(PortalService.LANGUAGE_STORAGE_KEY) === 'pt') {
      return CURRENCY_EXCHANGE_RATE.PT;
    }

    return CURRENCY_EXCHANGE_RATE.EN;
  }

  getExchangeCurrencyRate(): Observable<getCurrencyResponse> {
    const headers = this.setupHeaders();
    return this.http.get<getCurrencyResponse>(this.baseUrl, {headers});
  }
}
