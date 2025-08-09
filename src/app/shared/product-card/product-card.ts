import { Component, Input, EventEmitter, Output } from '@angular/core';
import { Service } from '../service/product-card/product-card';

@Component({
  selector: 'app-product-card',
  standalone: false,
  templateUrl: './product-card.html',
  styleUrl: './product-card.scss',
})
export class ProductCard {
  add: boolean = false;
  qty: number = 0;
  carts: any;
  @Input() item: any;
  @Output() data = new EventEmitter();

  constructor(private service: Service) {}

  addToCart() {
    this.service.getData().subscribe((data: any) => {
      this.carts = data;
      if (this.qty > 0) {
        if (this.carts.products.some(
          (p: any) =>  p.productId === this.item.id)) {
          this.add = !this.add;
          alert('This product is already in the cart');
        } else {
          this.data.emit({
            item: this.item,
            qty: this.qty,
          });
          this.add = !this.add;
        }
      }
    });
  }
}
