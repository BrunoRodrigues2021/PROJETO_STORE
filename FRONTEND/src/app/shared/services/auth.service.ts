import {Injectable} from '@angular/core';
import {PortalService} from "./portal.service";
import {JwtHelperService} from "@auth0/angular-jwt";
import {Router} from "@angular/router";
import {TranslateService} from "@ngx-translate/core";

@Injectable({
  providedIn: 'root',
})
export class AuthService extends PortalService {

  constructor(
    private jwtHelper: JwtHelperService,
    translateService: TranslateService,
    router: Router,
) {
    super(router, translateService);
  }

  getParsedToken(): any {
    return this.jwtHelper.decodeToken(AuthService.getUser());
  }

  tokenIsAuthenticated() {
    return !this.jwtHelper.isTokenExpired(AuthService.getUser());
  }

}
