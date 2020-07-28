import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.less']
})
export class ProductComponent {

  @Input() product: Product;
  @Input() isInCart: boolean;

  @Output() productRemoved: EventEmitter<void>;
  @Output() productAdded: EventEmitter<void>;
  
  constructor() {
    this.productRemoved = new EventEmitter<void>();
    this.productAdded = new EventEmitter<void>();
  }

  addProductToCart() {
    this.productAdded.emit();
  }
  
  removeProductFromCart() {
    this.productRemoved.emit();
  }

}