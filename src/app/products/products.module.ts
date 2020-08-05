import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { ProductsComponent } from './components/products/products.component';
import { ProductComponent } from './components/product/product.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { AppRoutingModule } from '../app-routing.module';
import { productsReducer, PRODUCTS_STORE_TOKEN } from './reducers/products.reducer';
import { ProductsEffects } from './effects/products.effects';

@NgModule({
  declarations: [
    ProductComponent,
    ProductDetailsComponent,
    ProductsComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    StoreModule.forFeature(PRODUCTS_STORE_TOKEN, productsReducer),
    EffectsModule.forRoot([ProductsEffects])
  ]
})
export class ProductsModule { }
