import { Injectable } from '@angular/core';
import { HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }

  protected setupHeaders(): HttpHeaders {
    const token = null;

    const httpHeaders: HttpHeaders = new HttpHeaders();

    httpHeaders.set('Authorization', `Bearer ${token ? token : ''}`);
    httpHeaders.set('Content-Type', 'application/json');

    return httpHeaders;
  }
}
