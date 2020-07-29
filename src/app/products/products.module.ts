import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartService } from '../services/cart/cart.service';
import { ProductsService } from '../services/products/products.service';
import { ProductsComponent } from './components/products/products.component';
import { ProductComponent } from './components/product/product.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { AppRoutingModule } from '../app-routing.module';

@NgModule({
  declarations: [
    ProductComponent,
    ProductDetailsComponent,
    ProductsComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule
  ],
  providers: [
    CartService,
    ProductsService
  ]
})
export class ProductsModule { }
