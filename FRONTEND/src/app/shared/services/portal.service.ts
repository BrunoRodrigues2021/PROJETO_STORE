import {environment} from '../../../environments/environment';
import {HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Router} from "@angular/router";
import {TranslateService} from "@ngx-translate/core";
import {getCurrencyResponse} from "../interfaces/currency-interfaces";

@Injectable()
export class PortalService {

  constructor(
    private router: Router,
    protected translateService: TranslateService
  ) {}

  public static LOCAL_STORAGE_TOKEN = 'portalToken';
  public static LANGUAGE_STORAGE_KEY = 'PortalLanguage';
  public static CURRENCY_STORAGE_KEY = 'CurrencyExchangeRate';
  public static LANGUAGES = {
    'pt': 'pt',
    'en': 'en'
  };

  BASE_PATH = environment.baseApiUrl;

  static getUser() {
    return localStorage.getItem(PortalService.LOCAL_STORAGE_TOKEN);
  }

  static setUser(token: any) {
    localStorage.setItem(PortalService.LOCAL_STORAGE_TOKEN, token);
  }

  static getLanguage() {
    return localStorage.getItem(PortalService.LANGUAGE_STORAGE_KEY);
  }

  static setLanguage(language: string) {
    localStorage.setItem(PortalService.LANGUAGE_STORAGE_KEY, language);
  }

  static getCurrencyExchangeRate() {
    return JSON.parse(localStorage.getItem(PortalService.CURRENCY_STORAGE_KEY));
  }

  static setCurrencyExchangeRate(currency: getCurrencyResponse) {
    localStorage.setItem(PortalService.CURRENCY_STORAGE_KEY, JSON.stringify(currency));
  }

  userLogout() {
    localStorage.clear();
    this.navigateTo('../login');
  }

  public navigateTo(route) {
    this.router.navigate([route]).then();
  }

  protected setupHeaders(contentType = null) {
    const token = PortalService.getUser();

    let httpHeaders: HttpHeaders = new HttpHeaders();

    httpHeaders = httpHeaders.set('Authorization', `Bearer ${token ? token : ''}`);
    if (contentType) {
      httpHeaders = httpHeaders.set('Content-Type', contentType);
    }

    return httpHeaders;
  }
}
