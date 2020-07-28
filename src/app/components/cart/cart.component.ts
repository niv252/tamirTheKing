import { map } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { Observable, combineLatest } from 'rxjs';

import { Product } from 'src/app/models/product.model';
import { CartProduct } from 'src/app/models/cart-product.model';
import { CartService } from 'src/app/services/cart/cart.service';
import { StoreService } from 'src/app/services/store/store.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.less']
})

export class CartComponent implements OnInit {

  cart$: Observable<{product: Product, quantity: number}[]>;
  totalPrice$: Observable<number>;
  isInCheckout: boolean;

  constructor(private cartService: CartService, private storeService: StoreService, private router: Router) {
    this.isInCheckout = false;
  }

  ngOnInit() {
    this.cart$ = combineLatest(this.cartService.getCartProducts(), this.storeService.getProducts())
      .pipe(map(([cartProducts, products]: [CartProduct[], Product[]]) => 
        cartProducts.map((cartProduct: CartProduct) =>
          ({
            product: this.findProductByName(products, cartProduct.productName),
            quantity: cartProduct.quantity
          }))
    ));

    this.totalPrice$ = this.cartService.getTotalPrice();
  }

  private findProductByName(products: Product[], name: string): Product {
    return products.find((product: Product) => product.name === name);
  }

  removeProduct(name: string) {
    this.cartService.removeProduct(name);
  }

  changeQuantity(cartProduct: CartProduct) {
    this.cartService.updateProductQuantity(cartProduct.productName, cartProduct.quantity);
  }

  continueShopping() {
    this.router.navigate(['/home']);
  }

  checkout() {
    if(!this.isInCheckout) {
      this.isInCheckout = true;
    } else {
      this.cartService.purchaseCart();
    }
  }
}
