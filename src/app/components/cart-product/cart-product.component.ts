import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Product } from 'src/app/models/product.model';
import { CartProduct } from 'src/app/models/cart-product.model';

@Component({
  selector: 'app-cart-product',
  templateUrl: './cart-product.component.html',
  styleUrls: ['./cart-product.component.less']
})
export class CartProductComponent implements OnInit {

  @Input() product: Product;
  @Input() quantity: number;

  @Output() private productRemoved: EventEmitter<string>;
  @Output() private quantityChanged: EventEmitter<CartProduct>;

  constructor() { 
    this.productRemoved = new EventEmitter<string>();
    this.quantityChanged = new EventEmitter<CartProduct>();
  }

  ngOnInit() {
  }

  removeCartProduct() {
     this.productRemoved.emit(this.product.name);
  }

  updateQuantity(quantity) {
    console.log(quantity);
    this.quantity = quantity;
    this.quantityChanged.emit({productName: this.product.name, quantity: this.quantity});
  }
}
