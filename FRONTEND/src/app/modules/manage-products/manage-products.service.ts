import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {getProductsResponse} from "./interfaces/product-response-interface";
import {PortalService} from "../../shared/portal.service";

@Injectable({
  providedIn: 'root'
})
export class ManageProductsService extends PortalService {

  baseUrl = this.BASE_PATH + '/product';

  constructor(private http: HttpClient) {
    // @ts-ignore
    super();
  }

  getProducts(page: number = null, pageSize: number = null): Observable<getProductsResponse> {
    const headers = this.setupHeaders();
    let params: HttpParams = new HttpParams();

    if(page) {
      params = params.set('page', page.toString());
    }
    if(pageSize) {
      params = params.set('pageSize', pageSize.toString());
    }

    return this.http.get<getProductsResponse>(this.baseUrl, {headers, params});
  }
}
