import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { CartComponent } from './components/cart/cart.component';
import { CartProductComponent } from './components/cart-product/cart-product.component';
import { AppRoutingModule } from '../app-routing.module';
import { CartService } from '../services/cart/cart.service';
import { ProductsService } from '../services/products/products.service';

@NgModule({
  declarations: [
    CartComponent,
    CartProductComponent
  ],
  imports: [
    CommonModule,
    MatSelectModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    AppRoutingModule
  ],
  providers: [
    CartService,
    ProductsService
  ]
})
export class CartModule { }
