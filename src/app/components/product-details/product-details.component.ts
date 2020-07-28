import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

import { Product } from 'src/app/models/product.model';
import { StoreService } from 'src/app/services/store/store.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.less']
})
export class ProductDetailsComponent {

  product$: Observable<Product>;

  constructor(private route: ActivatedRoute, private storeService: StoreService) { 
    this.product$ = this.storeService.getProductByName(this.route.snapshot.paramMap.get('name'));
  }

}