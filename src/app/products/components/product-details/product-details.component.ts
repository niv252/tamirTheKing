import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute, Params } from '@angular/router';

import { Product } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/services/products/products.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.less']
})
export class ProductDetailsComponent {

  product$: Observable<Product>;

  constructor(private route: ActivatedRoute, private productsService: ProductsService) { 
    this.product$ = this.route.queryParams.pipe(switchMap((params: Params) => 
      this.productsService.getProductByName(params['name'])
    ));
  }

}