import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart/cart.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.less']
})
export class NavbarComponent implements OnInit {

  length$: Observable<number>;

  constructor(private cartService: CartService) { }

  ngOnInit() {
    this.length$ = this.cartService.getCartSize();
  }

}