import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { CartComponent } from './components/cart/cart.component';
import { CartProductComponent } from './components/cart-product/cart-product.component';
import { AppRoutingModule } from '../app-routing.module';
import { CART_STORE_TOKEN, cartReducer } from './reducers/cart.reducer';

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
    AppRoutingModule,
    StoreModule.forFeature(CART_STORE_TOKEN, cartReducer)
  ]
})
export class CartModule { }
