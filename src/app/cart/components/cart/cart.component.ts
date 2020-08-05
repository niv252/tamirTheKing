import { Store } from '@ngrx/store';
import { map, tap, take } from 'rxjs/operators';
import { Observable, combineLatest } from 'rxjs';
import { Component, OnInit } from '@angular/core';

import { Product } from 'src/app/models/product.model';
import { Cart } from 'src/app/models/cart.model';
import { ProductsState, selectProducts } from 'src/app/products/reducers/products.reducer';
import { purchaseProducts } from 'src/app/products/actions/products.actions';
import { CartState, selectCart } from '../../reducers/cart.reducer';
import { removeCartProduct, purchaseCart, updateProductQuantity } from '../../actions/cart.actions';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.less']
})

export class CartComponent implements OnInit {

  cart$: Observable<{product: Product, quantity: number}[]>;
  totalPrice: number;

  constructor(private store: Store<ProductsState | CartState>) { }

  ngOnInit() {
    this.cart$ = combineLatest(this.store.select(selectCart), this.store.select(selectProducts))
      .pipe(map(([cart, products]: [Cart, Product[]]) => 
        products.filter((product: Product) => cart[product.name]).map((product: Product) => 
          ({
            product: product,
            quantity: cart[product.name]
          })
    )), tap((cart: {product: Product, quantity: number}[]) => this.totalPrice = this.getTotalPrice(cart)));
  }

  removeProduct(name: string) {
    this.store.dispatch(removeCartProduct({name}));
  }

  changeQuantity(name: string, quantity: number) {
    this.store.dispatch(updateProductQuantity({name, quantity}));
  }

  checkout() {
    this.store.select(selectCart).pipe(take(1)).subscribe((cart: Cart) => {
      this.store.dispatch(purchaseProducts(cart));
    });

    this.store.dispatch(purchaseCart());
  }

  private getTotalPrice(cart: {product: Product, quantity: number}[]): number {
    return cart.reduce((sum: number, current: {product: Product, quantity: number}) =>
       sum + current.product.price * current.quantity, 0);
  }

}
