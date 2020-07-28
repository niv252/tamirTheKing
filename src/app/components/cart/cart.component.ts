import { map, tap } from 'rxjs/operators';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, combineLatest, Subscription } from 'rxjs';

import { Product } from 'src/app/models/product.model';
import { CartProduct } from 'src/app/models/cart-product.model';
import { CartService } from 'src/app/services/cart/cart.service';
import { ProductsService } from 'src/app/services/products/products.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.less']
})

export class CartComponent implements OnInit, OnDestroy {

  cart$: Observable<{product: Product, quantity: number}[]>;
  totalPrice: number;
  cartSubscription$: Subscription;

  constructor(private cartService: CartService, private productsService: ProductsService, private router: Router) { }

  ngOnInit() {
    this.cart$ = combineLatest(this.cartService.getCartProducts(), this.productsService.getProducts())
      .pipe(map(([cartProducts, products]: [Record<string, number>, Product[]]) => 
        products.filter((product: Product) => cartProducts[product.name]).map((product: Product) => 
          ({
            product: product,
            quantity: cartProducts[product.name]
          })
    )), tap((cart: {product: Product, quantity: number}[]) => this.totalPrice = this.getTotalPrice(cart)));
  }

  removeProduct(name: string) {
    this.cartService.removeProduct(name);
  }

  changeQuantity(productName: string, quantity: number) {
    this.cartService.updateProductQuantity(productName, quantity);
  }

  checkout() {
    this.cartSubscription$ = this.cartService.getCartProducts().subscribe((cart: Record<string, number>) => {
      this.productsService.purchaseProducts(cart);
    });

    this.cartService.purchaseCart();
  }

  private getTotalPrice(cart: {product: Product, quantity: number}[]): number {
    return cart.reduce((sum: number, current: {product: Product, quantity: number}) =>
       sum + current.product.price * current.quantity, 0);
  }

  ngOnDestroy() {
    if(this.cartSubscription$) {
      this.cartSubscription$.unsubscribe()
    }
  }

}
