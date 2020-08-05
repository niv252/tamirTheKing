import { EMPTY, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Actions, createEffect, ofType, ROOT_EFFECTS_INIT } from '@ngrx/effects';
import { map, catchError, switchMap } from 'rxjs/operators';

import { loadProducts, productsLoadedSuccess, productsLoadedFail } from '../actions/products.actions';
import { Product } from '../../models/product.model';

@Injectable()
export class ProductsEffects {

  private readonly jsonPath = '/assets/json/products.json';

  initLoadProducts$ = createEffect(() => 
    this.actions$.pipe(
        ofType(ROOT_EFFECTS_INIT),
        map(() => loadProducts())
    )
  );
  //i think http.get should be in a service but i was told to delete my services
  loadProducts$ = createEffect(() => this.actions$.pipe(
    ofType(loadProducts),
    switchMap(() => this.http.get<Product[]>(this.jsonPath)
      .pipe(
        map(products => productsLoadedSuccess({ products })),
        catchError(() => of(productsLoadedFail))
      ))
    )
  );

  constructor(private actions$: Actions, private http: HttpClient) { }
}