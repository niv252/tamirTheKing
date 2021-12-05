import { Observable } from 'rxjs';
import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { Product } from 'src/app/models/product.model';
import { ProductsState , selectProducts} from '../../reducers/products.reducer';
import { CartState, selectIsProductInCart } from 'src/app/cart/reducers/cart.reducer';
import { addCartProduct, removeCartProduct } from 'src/app/cart/actions/cart.actions';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductsComponent implements OnInit {

  products$: Observable<Product[]>;

  constructor(private store: Store<ProductsState | CartState>) { }

  ngOnInit() {
    this.products$ = this.store.select(selectProducts);
  }

  addProductToCart(name) {
    this.store.dispatch(addCartProduct({name}))
  }
  
  removeProductFromCart(name) {
    this.store.dispatch(removeCartProduct({name}))
  }

  isProductInCart$(name): Observable<boolean> {
    return this.store.select(selectIsProductInCart, {name});
  }
}