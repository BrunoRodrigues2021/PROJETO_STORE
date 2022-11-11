import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { getProductsResponse } from "./interfaces/product-response-interface";
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

  getProducts(): Observable<getProductsResponse[]> {
    const headers = this.setupHeaders();
    return this.http.get<getProductsResponse[]>(this.baseUrl, {headers});
  }
}
