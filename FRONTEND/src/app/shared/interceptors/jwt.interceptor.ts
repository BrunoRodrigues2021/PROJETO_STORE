import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {PortalService} from "../portal.service";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = PortalService.getUser();

    if(token) {
      const cloneReq = request.clone({
        headers: request.headers.set('Authorization', 'Bearer' + token)
      });

      return next.handle(cloneReq);
    } else {
      return next.handle(request);
    }
  }
}
