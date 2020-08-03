import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';

import { ProductsState } from './products/reducers/products.reducer';
import { loadProducts } from './products/actions/products.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  title = 'amaromach';
  
  constructor(private productsStore: Store<ProductsState>) { }

  ngOnInit() {
    this.productsStore.dispatch(loadProducts());
  }

}
