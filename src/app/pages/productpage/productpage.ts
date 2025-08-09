import { Component } from '@angular/core';
import { Service } from './service/service';

@Component({
  selector: 'app-productpage',
  standalone: false,
  templateUrl: './productpage.html',
  styleUrl: './productpage.scss',
})
export class Productpage {
  products!: any[];
  filteredProducts!: any[];
  categories!: any[];
  loading!: boolean;
  add!: boolean;
  qty!: number;

  constructor(private service: Service) {}
  ngOnInit() {
    this.getProducts();
    this.getCategories();
  }
  getProducts() {
    this.loading = true;
    this.service.getProducts().subscribe(
      (data: any) => {
        this.loading = false;
        this.products = Object.values(data[0]);
        this.filteredProducts = this.products; // Initialize filteredProducts with all products
        // this.filteredProducts = this.products; // Initialize filteredProducts with all products
        console.log(this.products);


      },
      (error: any) => {
        this.loading = false;
        alert('Error fetching products: ' + error.message);
      }
    );
  }
  getCategories() {

    this.loading = true;
    this.service.getCategories().subscribe(
      (data: any) => {
        this.loading = false;
        this.categories = data;
        console.log('Categories:', this.categories);
      },
      (error: any) => {
        this.loading = false;
        alert('Error fetching categories: ' + error.message);
      }
    );

  }
  getFilterProducts(event: any) {
    this.loading = true;
    let category = event.target.value;
     this.filteredProducts = this.products.filter(product => product.category === category);
    category === 'All' ? this.filteredProducts = this.products : this.filteredProducts;
     console.log('Filtered Products:', this.filteredProducts);
    return  this.filteredProducts ,this.loading = false;
  }


  addToCart(product: any) {
    this.add = true;
    let cartid = 1; // Replace with the actual cart ID

    this.service.addToCart(product.item, product.qty, cartid).subscribe(
      (data: any) => {
        this.add = false;
        console.log(data);
        alert('Product added to cart successfully!');
      },
      (error: any) => {
        this.add = false;
        alert('Error adding product to cart: ' + error.message);
      }
    );
  }


}
