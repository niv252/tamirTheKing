import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-cart-product',
  templateUrl: './cart-product.component.html',
  styleUrls: ['./cart-product.component.less']
})
export class CartProductComponent {

  @Input() product: Product;
  @Input() quantity: number;

  @Output() productRemoved: EventEmitter<void>;
  @Output() quantityChanged: EventEmitter<number>;

  constructor() { 
    this.productRemoved = new EventEmitter<void>();
    this.quantityChanged = new EventEmitter<number>();
  }

  removeCartProduct() {
     this.productRemoved.emit();
  }

  updateQuantity(quantity) {
    this.quantityChanged.emit(quantity);
  }
}
