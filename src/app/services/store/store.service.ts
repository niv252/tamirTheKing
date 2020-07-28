import { Observable, Subject, BehaviorSubject } from 'rxjs';
import {  map } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 

import { Product } from '../../models/product.model';
import { CartProduct } from 'src/app/models/cart-product.model';

@Injectable()
export class StoreService {

  private products$: Observable<Product[]>;

  constructor(private http: HttpClient) {
    this.products$ = this.getJSON();
  }

  getProducts(): Observable<Product[]> {
    return this.products$;
  }

  getProductByName(name: string): Observable<Product> {
    return this.products$.pipe(
      map((products: Product[]) => products.find((product: Product) => product.name === name))
    );
  }

  purchaseProducts(cart: CartProduct[]) {
    this.products$ = this.products$.pipe(map((products: Product[]) => {
        return products.map((product: Product) => {
          let cartProductOfProduct = cart.find((cartProduct: CartProduct) => cartProduct.productName === product.name);
          
          if(cartProductOfProduct && product.limit) {
            product = {...product, limit: product.limit - cartProductOfProduct.quantity};
          }
          
          return product;
        });
      }
    ));
  }

  private getJSON(): Observable<any> {
    return this.http.get('/assets/json/products.json');
  }

}
