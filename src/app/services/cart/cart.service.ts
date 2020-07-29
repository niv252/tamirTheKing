import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Cart } from '../../models/cart.model';
@Injectable()
export class CartService {

  private cart$: BehaviorSubject<Cart>;

  constructor() {
    this.cart$ = new BehaviorSubject<Cart>({cartProducts: {}} as Cart);
  }

  addProduct(name: string) {
    const cart = this.cart$.getValue();
    cart.cartProducts[name] = 1;
    this.cart$.next(cart);
  }

  removeProduct(name: string) {
    const cart = this.cart$.getValue();
    delete cart.cartProducts[name];
    this.cart$.next(cart);
  }

  updateProductQuantity(name: string, quantity: number) {
    const cart = this.cart$.getValue();

    if(cart.cartProducts[name]) {
      cart.cartProducts[name] = quantity;
    }

    this.cart$.next(cart);
  }

  getCartSize(): Observable<number> {
    return this.cart$.pipe(map((cart: Cart) => Object.keys(cart.cartProducts).length));
  }

  isCartProductExist(name: string): Observable<boolean> {
    return this.cart$.pipe(map((cart: Cart) => 
      !!cart.cartProducts[name]
    ));
  }

  getCart(): Observable<Cart> {
    return this.cart$.asObservable();
  }

  purchaseCart() {
    this.cart$.next({cartProducts:{}} as Cart);
  }

}