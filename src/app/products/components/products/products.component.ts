import { Observable } from 'rxjs';
import { Component } from '@angular/core';

import { Product } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/services/products/products.service';
import { CartService } from 'src/app/services/cart/cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.less']
})
export class ProductsComponent {

  productsInStore$: Observable<Product[]>;

  constructor(private productsService: ProductsService, private cartService: CartService) { 
    this.productsInStore$ = productsService.getProducts();
  }

  addProductToCart(name) {
    this.cartService.addProduct(name);
  }
  
  removeProductFromCart(name) {
    this.cartService.removeProduct(name);
  }

  isProductInCart$(name): Observable<boolean> {
    return this.cartService.isCartProductExist(name);
  }
}