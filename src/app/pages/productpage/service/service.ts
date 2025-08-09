import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { filter, map, switchMap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root',
})
export class Service {
  baseurl = 'http://localhost:3000';
  categories: any[] = [];
  products: any[] = [];
  filteredProducts: any[] = [];

  constructor(private http: HttpClient) {}
  getProducts() {
    return this.http.get(this.baseurl + '/products');
  }

  getCategories() {
    return this.http.get(this.baseurl + '/products').pipe(
      map((data: any) => {
        this.products = Object.values(data[0]);
        this.products.forEach((element: any) => {
          if (!this.categories.includes(element.category)) {
            this.categories.push(element.category);
          }
        });

        return this.categories;
      })
    );
  }


  addToCart(product: any, qty: number, cartid: number) {
  return this.http.get(this.baseurl + '/carts/' + cartid).pipe(
    switchMap((data: any) => {
      const carts = data.products || [];

      // إضافة المنتج للسلة
      carts.push({
        productId: product.id,
        quantity: qty,
      });

      // تجهيز جسم الطلب
      const body = {
        userId: 1,
        date: new Date(),
        products: carts
      };

      // إرسال التحديث
      return this.http.put(this.baseurl + '/carts/1', body);
    })
  );
}
}
