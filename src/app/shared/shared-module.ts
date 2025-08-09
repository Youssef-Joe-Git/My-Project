import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Header } from './header/header';
import { RouterModule } from '@angular/router';
import { ProductCard } from './product-card/product-card';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [Header, ProductCard],
  imports: [CommonModule, RouterModule, HttpClientModule, FormsModule],
  exports: [Header, ProductCard],
})
export class SharedModule {}
