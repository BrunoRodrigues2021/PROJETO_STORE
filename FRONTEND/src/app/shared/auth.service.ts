import {Injectable} from '@angular/core';
import {PortalService} from "./portal.service";
import {JwtHelperService} from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root',
})
export class AuthService extends PortalService {

  static getParsedToken(): any {
    return new JwtHelperService().decodeToken(localStorage.getItem(PortalService.LOCAL_STORAGE_TOKEN));
  }

}
