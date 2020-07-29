import { map, tap, take } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { Observable, combineLatest, Subscription } from 'rxjs';

import { Product } from 'src/app/models/product.model';
import { CartService } from 'src/app/services/cart/cart.service';
import { ProductsService } from 'src/app/services/products/products.service';
import { Cart } from 'src/app/models/cart.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.less']
})

export class CartComponent implements OnInit {

  cart$: Observable<{product: Product, quantity: number}[]>;
  totalPrice: number;
  cartSubscription$: Subscription;

  constructor(private cartService: CartService, private productsService: ProductsService) { }

  ngOnInit() {
    this.cart$ = combineLatest(this.cartService.getCart(), this.productsService.getProducts())
      .pipe(map(([cart, products]: [Cart, Product[]]) => 
        products.filter((product: Product) => cart.cartProducts[product.name]).map((product: Product) => 
          ({
            product: product,
            quantity: cart.cartProducts[product.name]
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
    this.cartSubscription$ = this.cartService.getCart().pipe(take(1)).subscribe((cart: Cart) => {
      this.productsService.purchaseProducts(cart);
    });

    this.cartService.purchaseCart();
  }

  private getTotalPrice(cart: {product: Product, quantity: number}[]): number {
    return cart.reduce((sum: number, current: {product: Product, quantity: number}) =>
       sum + current.product.price * current.quantity, 0);
  }

}
