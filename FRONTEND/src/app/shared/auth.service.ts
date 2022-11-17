import {Injectable} from '@angular/core';
import {PortalService} from "./portal.service";
import {JwtHelperService} from "@auth0/angular-jwt";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root',
})
export class AuthService extends PortalService {

  constructor(router: Router, private jwtHelper: JwtHelperService) {
    super(router);
  }

  getParsedToken(): any {
    return this.jwtHelper.decodeToken(AuthService.getUser());
  }

  tokenIsAuthenticated() {
    return !this.jwtHelper.isTokenExpired(AuthService.getUser());
  }

}
