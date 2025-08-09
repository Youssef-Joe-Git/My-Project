import { Component } from '@angular/core';
import { ProductCard } from '../../shared/product-card/product-card';
import { ActivatedRoute } from '@angular/router';
import { Service } from './service/service';

@Component({
  selector: 'app-product-details',
  standalone: false,
  templateUrl: './product-details.html',
  styleUrl: './product-details.scss',
})
export class ProductDetails {
  id: any;
  product: any = [];
  loading: boolean = true;
  qty!: number;
  constructor(router: ActivatedRoute, private service: Service) {
    this.id = router.snapshot.paramMap.get('id');
  }
  ngOnInit() {
    this.getProduct();
  }
  getProduct() {
    this.service.getProduct(this.id).subscribe((data) => {
      this.product = data;
      this.loading = false;
      console.log(this.product);
    });
  }
  addToCart() {
    this.service.addToCart(this.product, this.qty).subscribe((data) => {
      console.log(data);
      alert('Product added to cart successfully');
    });
  }
}
