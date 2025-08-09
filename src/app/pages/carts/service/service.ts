import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class Service {
  baseurl = 'http://localhost:3000';
  constructor(private http: HttpClient) {}
  getData(id: number) {
  return this.http.get(this.baseurl + '/products').pipe(
    map((data: any) => {
      const allProducts = Object.values(data[0]); // نحول الكائن لمصفوفة
      return allProducts.find((p: any) => p.id === id);
    })
  );
}

  getCarts() {
    return this.http.get(this.baseurl + '/carts');
  }
  updateCart(cart: any) {
    return this.http.put(this.baseurl + '/carts/1', cart[0]);
  }
  removeCart(cart: any) {
    return this.http.put(this.baseurl + "/carts/1", cart)
  }
  addorder(order: any) {
    return this.http.post(this.baseurl + '/orders', order) , this.http.put(this.baseurl + '/carts/1', { userId: '1', products: [] });
  }
}
