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

  constructor(private productsStore: Store<ProductsState>, private cartStore: Store<CartState>) { }

  ngOnInit() {
    this.cart$ = combineLatest(this.cartStore.select(selectCart), this.productsStore.select(selectProducts))
      .pipe(map(([cart, products]: [Cart, Product[]]) => 
        products.filter((product: Product) => cart[product.name]).map((product: Product) => 
          ({
            product: product,
            quantity: cart[product.name]
          })
    )), tap((cart: {product: Product, quantity: number}[]) => this.totalPrice = this.getTotalPrice(cart)));
  }

  removeProduct(name: string) {
    this.cartStore.dispatch(removeCartProduct({name: name}));
  }

  changeQuantity(productName: string, quantity: number) {
    this.cartStore.dispatch(updateProductQuantity({name: productName, quantity: quantity}));
  }

  checkout() {
    this.cartStore.select(selectCart).pipe(take(1)).subscribe((cart: Cart) => {
      this.productsStore.dispatch(purchaseProducts(cart));
    });

    this.cartStore.dispatch(purchaseCart());
  }

  private getTotalPrice(cart: {product: Product, quantity: number}[]): number {
    return cart.reduce((sum: number, current: {product: Product, quantity: number}) =>
       sum + current.product.price * current.quantity, 0);
  }

}
