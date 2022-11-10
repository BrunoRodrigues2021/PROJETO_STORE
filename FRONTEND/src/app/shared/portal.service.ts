import {environment} from '../../environments/environment';
import {HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Router} from "@angular/router";

@Injectable()
export class PortalService {

  static LOCAL_STORAGE_KEY = 'portalToken';
  public static LANGUAGE_STORAGE_KEY = 'PortalLanguage';
  public static LANGUAGES = {
    'pt': 'pt-br',
    'es': 'es',
    'en': 'en',
    'pl': 'pl'
  };

  BASE_PATH = environment.baseApiUrl;

  getUser() {
    return localStorage.getItem(PortalService.LOCAL_STORAGE_KEY);
  }

  setUser(token: any) {
    localStorage.setItem(PortalService.LOCAL_STORAGE_KEY, token);
  }

  async destroyUser() {
    localStorage.clear();
  }

  protected setupHeaders(contentType = null) {
    const token = this.getUser();

    const httpHeaders: HttpHeaders = new HttpHeaders();

    httpHeaders.set('Authorization', `Bearer ${token ? token : ''}`);
    httpHeaders.set('Content-Type', 'application/json');

    return httpHeaders;
  }

  getCurrentPortalLanguage() {
    const language = localStorage.getItem(PortalService.LANGUAGE_STORAGE_KEY) ?
      localStorage.getItem(PortalService.LANGUAGE_STORAGE_KEY) : navigator.language.split('-')[0];
    // @ts-ignore
    return Object.keys(PortalAdminService.LANGUAGES).includes(language) ? language : PortalAdminService.LANGUAGES.en;
  }
}
