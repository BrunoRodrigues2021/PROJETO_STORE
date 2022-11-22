import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {PortalService} from "../../shared/services/portal.service";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ManageUsersService extends PortalService {
  baseUrl = this.BASE_PATH + '/user';

  constructor(private http: HttpClient) {
    // @ts-ignore
    super();
  }

  updateUser(userId, formData: FormData): Observable<any> {
    const headers = this.setupHeaders();
    const url = `${this.baseUrl}/${userId}`;

    return this.http.put<any>(url, formData,{headers});
  }
}
