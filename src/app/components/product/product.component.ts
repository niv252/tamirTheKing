import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';

import { Product } from 'src/app/models/product.model';
import { CartService } from '../../services/cart/cart.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.less']
})
export class ProductComponent implements OnInit {

  @Input() product: Product;
  isCartProductExist: Observable<boolean>;

  constructor(private router: Router, private cartService: CartService) { }

  ngOnInit() {
    this.isCartProductExist = this.cartService.isCartProductExist(this.product.name);
  }

  showProductDetails(): void {
    this.router.navigate(['/product-details', { name: this.product.name }]);
  }

  addProductToCart() {
    this.cartService.addProduct(this.product.name);
  }
  
  removeProductFromCart() {
    this.cartService.removeProduct(this.product.name);
  }

}
