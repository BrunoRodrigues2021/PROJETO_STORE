import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {getProductsResponse} from "./interfaces/product-response-interface";
import {PortalService} from "../../shared/services/portal.service";
import {GetProductsRequest} from "./interfaces/product-request-interfaces";
import {Product} from "./utils/models/product.model";

@Injectable({
  providedIn: 'root'
})
export class ManageProductsService extends PortalService {
  baseUrl = this.BASE_PATH + '/product';

  constructor(private http: HttpClient) {
    // @ts-ignore
    super();
  }

  getProducts(requestPayload: GetProductsRequest): Observable<getProductsResponse> {
    const headers = this.setupHeaders();
    let params: HttpParams = new HttpParams();

    if(requestPayload.name) {
      params = params.set('name', requestPayload.name);
    }
    if(requestPayload.value) {
      params = params.set('value', requestPayload.value);
    }
    if(requestPayload.sortBy) {
      params = params.set('sortBy', requestPayload.sortBy);
    }
    if(requestPayload.sortOrder) {
      params = params.set('sortOrder', requestPayload.sortOrder);
    }
    if(requestPayload.page) {
      params = params.set('page', requestPayload.page);
    }
    if(requestPayload.pageSize) {
      params = params.set('pageSize', requestPayload.pageSize);
    }

    return this.http.get<getProductsResponse>(this.baseUrl, {headers, params});
  }

  getProduct(productId: number): Observable<Product> {
    const headers = this.setupHeaders();
    const url = this.baseUrl + "/" + productId
    return this.http.get<Product>(url, {headers});
  }
}
