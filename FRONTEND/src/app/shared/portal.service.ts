import {environment} from '../../environments/environment';
import {HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Router} from "@angular/router";
import * as http from "http";

@Injectable()
export class PortalService {

  constructor(private router: Router) {
  }

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

   async userLogout() {
    localStorage.clear();
    await this.navigateTo('login');
    window.location.reload();
  }

  public async navigateTo(route) {
    await this.router.navigate([route]);
  }

  protected setupHeaders() {
    const token = PortalService.getUser();

    const httpHeaders: HttpHeaders = new HttpHeaders();

    httpHeaders.set('Authorization', `Bearer ${token ? token : ''}`);
    httpHeaders.set('Content-Type', 'text');

    return httpHeaders;
  }
}
