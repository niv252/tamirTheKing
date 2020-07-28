import { map, take } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';

import { CartProduct } from '../../models/cart-product.model';
import { StoreService } from '../store/store.service';
import { Product } from 'src/app/models/product.model';

@Injectable()
export class CartService {

  private cart$: BehaviorSubject<CartProduct[]>;

  constructor(private storeService: StoreService) {
    this.cart$ = new BehaviorSubject<CartProduct[]>([]);
  }

  addProduct(name: string) {
      this.cart$.next([...this.cart$.getValue(), { productName: name, quantity: 1 } as CartProduct]);
   
  }

  removeProduct(name: string) {
    this.cart$.next(this.cart$.getValue().filter(cartProduct => cartProduct.productName !== name));
  }

  updateProductQuantity(name: string, quantity: number) {
    let cart = this.cart$.getValue();
    let productToUpdate = cart.find(cartProduct => cartProduct.productName === name);

    if(productToUpdate) {
      productToUpdate.quantity = quantity;
    }

    this.cart$.next(cart);
  }

  getCartSize(): Observable<number> {
    return this.cart$.pipe(map((cart: CartProduct[]) => {
      return cart.length;
    }));
  }

  isCartProductExist(name: string): Observable<boolean> {
    return this.cart$.pipe(map((cart: CartProduct[]) => {
      return cart.some(cartProduct => cartProduct.productName === name);
    }));
  }

  getCartProducts(): Observable<CartProduct[]> {
    return this.cart$.asObservable();
  }

  getTotalPrice(): Observable<number> {
    return combineLatest(this.cart$, this.storeService.getProducts())
      .pipe(map(([cartProducts, products]: [CartProduct[], Product[]]) => 
        cartProducts.map((cartProduct: CartProduct) =>
          ({
            price: this.findProductByName(products, cartProduct.productName).price,
            quantity: cartProduct.quantity
          }))
          .reduce((sum: number, current: {price: number, quantity: number}) =>
             sum + current.price * current.quantity, 0)
    ));
  }

  private findProductByName(products: Product[], name: string): Product {
    return products.find((product: Product) => product.name === name);
  }

  purchaseCart() {
    this.storeService.purchaseProducts(this.cart$.getValue());
    this.cart$.next([]);
  }

}