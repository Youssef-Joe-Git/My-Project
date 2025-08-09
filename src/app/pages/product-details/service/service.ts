import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Service {
  baseUrl = 'https://fakestoreapi.com';
  baseurljson = 'http://localhost:3000';
  constructor(private http: HttpClient) {}
  getProduct(id: number) {
    return this.http.get(`${this.baseUrl}/products/` + id);
  }
  addToCart(product: any, qty: number) {
    return this.http.post(this.baseurljson + '/carts', {
      userId: 1,
      date: new Date(),
      products: [{ productId: product.id, quantity: qty }],
    });
  }
}
