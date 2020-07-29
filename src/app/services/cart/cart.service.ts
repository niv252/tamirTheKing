import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cart$: BehaviorSubject<Record<string, number>>;


  constructor() {
    this.cart$ = new BehaviorSubject<Record<string, number>>({});
  }

  addProduct(name: string) {
    let cart = this.cart$.getValue();
    cart[name] = 1;
    this.cart$.next(cart);
  }

  removeProduct(name: string) {
    let cart = this.cart$.getValue();
    delete cart[name];
    this.cart$.next(cart);
  }

  updateProductQuantity(name: string, quantity: number) {
    let cart = this.cart$.getValue();

    if(cart[name]) {
      cart[name] = quantity;
    }

    this.cart$.next(cart);
  }

  getCartSize(): Observable<number> {
    return this.cart$.pipe(map((cart: Record<string, number>) => Object.keys(cart).length));
  }

  isCartProductExist(name: string): Observable<boolean> {
    return this.cart$.pipe(map((cart: Record<string, number>) => 
      cart[name] !== undefined
    ));
  }

  getCartProducts(): Observable<Record<string, number>> {
    return this.cart$.asObservable();
  }

  purchaseCart() {
    this.cart$.next({});
  }

}