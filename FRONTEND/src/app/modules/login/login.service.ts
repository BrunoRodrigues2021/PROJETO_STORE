import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {PortalService} from "../../shared/services/portal.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoginService extends PortalService {

  constructor(private http: HttpClient) {
    // @ts-ignore
    super();
  }

  sendLoginRequest(email: String, password: String): Observable<any> {
    const headers = this.setupHeaders();
    const url = `${this.BASE_PATH}/security/login`;
    const body = {email: email, password: password};
    return this.http.post<any>(url, body, {headers});
  }

  sendLogin2StepRequest(email: string, password: string, pin: number) {
    const headers = this.setupHeaders();
    const url = `${this.BASE_PATH}/security/login2step`;
    const body = {email: email, password: password, pin: pin};
    return this.http.post<any>(url, body, {headers});
  }
}
