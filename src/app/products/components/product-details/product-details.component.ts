import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute, Params } from '@angular/router';
import { Store } from '@ngrx/store';

import { Product } from 'src/app/models/product.model';
import { switchMap } from 'rxjs/operators';
import { ProductsState, selectProductByName } from '../../reducers/products.reducer';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.less']
})
export class ProductDetailsComponent implements OnInit {

  product$: Observable<Product>;

  constructor(private route: ActivatedRoute, private productsStore: Store<ProductsState>) { }

  ngOnInit() {
    this.product$ = this.route.queryParams.pipe(switchMap((params: Params) =>
      this.productsStore.select(selectProductByName, {name: (params['name'])})
    ));
  }

}