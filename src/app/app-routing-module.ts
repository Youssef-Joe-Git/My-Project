import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Carts } from './pages/carts/carts';
import { Productpage } from './pages/productpage/productpage';
import { ProductDetails } from './pages/product-details/product-details';

const routes: Routes = [
  { path: 'product', component: Productpage },
  { path: 'product-details/:id', component: ProductDetails },
  { path: 'carts', component: Carts },
  { path: '', redirectTo: '/product', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
