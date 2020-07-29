import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Product } from '../../models/product.model';
import { Cart } from 'src/app/models/cart.model';

@Injectable()
export class ProductsService {

  private readonly jsonPath = '/assets/json/products.json';
  private products$: BehaviorSubject<Product[]>;

  constructor(private http: HttpClient) {
    this.products$ = new BehaviorSubject<Product[]>([]);
    this.getJSON().subscribe((products: Product[]) => this.products$.next(products));
  }

  getProducts(): Observable<Product[]> {
    return this.products$.asObservable();
  }

  getProductByName(name: string): Observable<Product> {
    return this.products$.pipe(
      map((products: Product[]) => products.find((product: Product) => product.name === name))
    );
  }

  purchaseProducts(cart: Cart) {
    let products = this.products$.getValue();
    this.products$.next(products.map((product: Product) => {
      if (cart[product.name] && product.limit) {
        product = { ...product, limit: product.limit - cart[product.name] };
      }

      return product;
    }));
  }

  private getJSON(): Observable<Product[]> {
    return this.http.get<Product[]>(this.jsonPath);
  }

}
