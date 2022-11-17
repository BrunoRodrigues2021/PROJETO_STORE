import {environment} from '../../environments/environment';
import {HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Router} from "@angular/router";
import * as http from "http";
import {TranslateService} from "@ngx-translate/core";
import {SharedConstants} from "./shared-constants";

@Injectable()
export class PortalService {

  constructor(
    private router: Router,
    protected translateService: TranslateService
  ) {}

  static LOCAL_STORAGE_TOKEN = 'portalToken';
  public static LANGUAGE_STORAGE_KEY = 'PortalLanguage';
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

  static setLanguage(language: string) {
    localStorage.setItem(PortalService.LANGUAGE_STORAGE_KEY, language);
  }

  getCurrencyExchangeRate(): string {
    if (localStorage.getItem(PortalService.LANGUAGE_STORAGE_KEY) === 'en') {
      return SharedConstants.CURRENCY_EXCHANGE_RATE.EN;
    } else if (localStorage.getItem(PortalService.LANGUAGE_STORAGE_KEY) === 'pt') {
      return SharedConstants.CURRENCY_EXCHANGE_RATE.PT;
    }

    return SharedConstants.CURRENCY_EXCHANGE_RATE.EN;
  }

  userLogout() {
    localStorage.clear();
    this.navigateTo('login');
    // window.location.reload();
  }

  public navigateTo(route) {
    this.router.navigate([route]);
  }

  protected setupHeaders() {
    const token = PortalService.getUser();

    const httpHeaders: HttpHeaders = new HttpHeaders();

    httpHeaders.set('Authorization', `Bearer ${token ? token : ''}`);
    httpHeaders.set('Content-Type', 'text');

    return httpHeaders;
  }
}
