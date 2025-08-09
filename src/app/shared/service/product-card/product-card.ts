import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Service {
  baseurl = 'http://localhost:3000';
  constructor(private http: HttpClient) {}

  getData() {
    return this.http.get(this.baseurl + '/carts/1')
  }

}
