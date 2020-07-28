import { Observable } from 'rxjs';
import { Component } from '@angular/core';

import { Product } from 'src/app/models/product.model';
import { StoreService } from 'src/app/services/store/store.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.less']
})
export class MainComponent {

  productsInStore$: Observable<Product[]>;

  constructor(private storeService: StoreService) { 
    this.productsInStore$ = storeService.getProducts();
  }

}