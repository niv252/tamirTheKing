import { EMPTY } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError, tap } from 'rxjs/operators';

import { loadProducts, productsLoaded } from '../actions/products.actions';
import { Product } from '../../models/product.model';

@Injectable()
export class ProductsEffects {

  private readonly jsonPath = '/assets/json/products.json';
  
  //i think http.get should be in a service but i was told to delete my services
  loadProducts$ = createEffect(() => this.actions$.pipe(tap(console.log),
    ofType(loadProducts),
    mergeMap(() => {console.log("fuckk");return this.http.get<Product[]>(this.jsonPath)
      .pipe(
        map(products => {console.log("products",products);return productsLoaded({products: products})}),
        catchError(() => EMPTY)
      )}), tap(console.log)
    )
  );
 
  constructor(private actions$: Actions, private http: HttpClient) {}
}