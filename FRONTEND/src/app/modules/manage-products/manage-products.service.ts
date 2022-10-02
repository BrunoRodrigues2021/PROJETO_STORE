import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";
import { getProductsResponse } from "./interfaces/product-response-interface";

@Injectable({
  providedIn: 'root'
})
export class ManageProductsService {

  baseUrl = environment.baseApiUrl + '/product';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<getProductsResponse[]> {
    return this.http.get<getProductsResponse[]>(this.baseUrl);
  }
}
