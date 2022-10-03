import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";
import { getProductsResponse } from "./interfaces/product-response-interface";
import {SharedService} from "../../shared/shared.service";

@Injectable({
  providedIn: 'root'
})
export class ManageProductsService extends SharedService {

  baseUrl = environment.baseApiUrl + '/product';

  constructor(private http: HttpClient) {
    super();
  }

  getProducts(): Observable<getProductsResponse[]> {
    const headers = this.setupHeaders();
    return this.http.get<getProductsResponse[]>(this.baseUrl, {headers});
  }
}
