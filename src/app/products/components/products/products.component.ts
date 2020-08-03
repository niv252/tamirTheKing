import { Observable } from 'rxjs';
import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';

import { Product } from 'src/app/models/product.model';
import { ProductsState , selectProducts} from '../../reducers/products.reducer';
import { CartState, selectIsCartProductExist } from 'src/app/cart/reducers/cart.reducer';
import { addCartProduct, removeCartProduct } from 'src/app/cart/actions/cart.actions';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductsComponent implements OnInit {

  productsInStore$: Observable<Product[]>;

  constructor(private productsStore: Store<ProductsState>, private cartStore: Store<CartState>) { }

  ngOnInit() {
    this.productsInStore$ = this.productsStore.select(selectProducts);
  }

  addProductToCart(name) {
    this.cartStore.dispatch(addCartProduct({name: name}))
  }
  
  removeProductFromCart(name) {
    this.cartStore.dispatch(removeCartProduct({name: name}))
  }

  isProductInCart$(name): Observable<boolean> {
    return this.cartStore.select(selectIsCartProductExist, {name: name});
  }
}