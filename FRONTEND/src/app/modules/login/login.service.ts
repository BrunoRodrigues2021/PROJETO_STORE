import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {PortalService} from "../../shared/portal.service";

@Injectable({
  providedIn: 'root'
})
export class LoginService extends PortalService {

  constructor(private http: HttpClient) {
    super();
  }

  sendLoginRequest(email: String, password: String) {
    const headers = this.setupHeaders();
    const url = `${this.BASE_PATH}/login`;
    const body = {email: email, password: password};
    return this.http.post<any>(url, body, {headers: headers});
  }

  sendLogin2StepRequest(email: string, password: string, pin: number) {
    const headers = this.setupHeaders();
    const url = `${this.BASE_PATH}/login2step`;
    const body = {email: email, password: password, pin: pin};
    return this.http.post<any>(url, body, {headers: headers});
  }
}
