import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AuthService} from "../services/auth.service";
import {PortalService} from "../services/portal.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private portalService: PortalService,
    private authService: AuthService,
    private router: Router
  ) {}


  canActivate(): boolean {
    if(!this.authService.tokenIsAuthenticated()) {
       this.portalService.navigateTo('login');
       return false;
    }
    return true;
  }

}
