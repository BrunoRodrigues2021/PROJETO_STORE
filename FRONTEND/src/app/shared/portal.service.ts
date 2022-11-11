import {environment} from '../../environments/environment';
import {HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Router} from "@angular/router";

@Injectable()
export class PortalService {

  constructor(private router: Router) {
  }

  static LOCAL_STORAGE_KEY = 'portalToken';
  public static LANGUAGE_STORAGE_KEY = 'PortalLanguage';
  public static LANGUAGES = {
    'pt': 'pt',
    'en': 'en'
  };

  BASE_PATH = environment.baseApiUrl;

  public getUser() {
    return localStorage.getItem(PortalService.LOCAL_STORAGE_KEY);
  }

  public setUser(token: any) {
    localStorage.setItem(PortalService.LOCAL_STORAGE_KEY, token);
  }

  public setLanguage(language: string) {
    localStorage.setItem(PortalService.LANGUAGE_STORAGE_KEY, language);
  }

  async destroyUser() {
    localStorage.clear();
  }

  public async navigateTo(route) {
    await this.router.navigate([route]);
  }

  protected setupHeaders() {
    const token = this.getUser();

    const httpHeaders: HttpHeaders = new HttpHeaders();

    httpHeaders.set('Authorization', `Bearer ${token ? token : ''}`);
    httpHeaders.set('Content-Type', 'application/json');

    return httpHeaders;
  }
}
