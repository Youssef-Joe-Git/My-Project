import { Component, OnInit } from '@angular/core';
import { Service } from './service/service';

@Component({
  selector: 'app-carts',
  standalone: false,
  templateUrl: './carts.html',
  styleUrl: './carts.scss',
})
export class Carts implements OnInit {
  loading: boolean = true;
  carts: any = [];
  products: any = [];
  date = new Date();
  endDate = new Date();
  constructor(private service: Service) {}
  ngOnInit() {
    this.getCarts();
  }
  getCarts() {
    this.service.getCarts().subscribe(
      (data) => {
        this.carts = data;
        this.getData();
      },
      (error) => {
        console.error('Error fetching carts:', error);
      }
    );
  }

  getData() {
    this.carts[0].products.forEach((cart: any) => {
      this.service.getData(cart.productId).subscribe(
        (data: any) => {
          data.quantity = cart.quantity;
          this.products.push(data);
        },
        (error) => {
          console.error('Error fetching product data:', error);
        }
      );
    });
    console.log(this.products);

    this.loading = false;
  }
  getTotalPrice() {
    return this.products.reduce((total: number, product: any) => {
      return total + product.price * product.quantity;
    }, 0);
  }
  updateQuantity(product: any, qty: number) {
    console.log('Updating quantity for product:', qty);
    product.quantity = qty;
    this.carts[0].products.forEach((cart: any) => {
      if (cart.productId === product.id) {
        cart.quantity = qty;
      }
    });
    console.log('Updated carts:', this.carts);
    this.service.updateCart(this.carts).subscribe(
      (response) => {
        console.log('Cart updated successfully:', response);
      },
      (error) => {
        console.error('Error updating cart:', error);
      }
    );
  }

  removeItem(cart: any) {
this.carts[0].products = this.carts[0].products.filter((p: any) => p.productId !== cart);
    this.service.removeCart(this.carts[0]).subscribe(
      (response) => {
        console.log('Item removed successfully:', response);
        debugger
        this.products = this.products.filter((p: any) => p.id !== cart);
         // Refresh the cart after removal
        alert('Item removed successfully');

      },
      (error) => {
        console.error('Error removing item:', error);
      }
    );
  }
  order() {
    this.service.addorder(this.carts[0]).subscribe(
      (response) => {
        this.carts = [];
        this.products = [];
        alert('Order placed successfully');
      },
      (error) => {
        alert('Error placing order:' + error);
      }
    );
  }

}
