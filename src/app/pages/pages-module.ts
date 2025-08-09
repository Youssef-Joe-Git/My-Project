import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared-module';
import { FormsModule } from '@angular/forms';
import { Productpage } from './productpage/productpage';
import { Carts } from './carts/carts';
import { ProductDetails } from './product-details/product-details';
import { RouterLink } from '@angular/router';

@NgModule({
  declarations: [Productpage, Carts, ProductDetails],
  imports: [
    CommonModule, // يجب أن يكون هذا السطر موجودًا
    FormsModule,
    SharedModule,
    RouterLink,
  ],
})
export class PagesModule {}
