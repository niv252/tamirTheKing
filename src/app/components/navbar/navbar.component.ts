import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { CartState, selectCartSize } from '../../cart/reducers/cart.reducer';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.less']
})
export class NavbarComponent implements OnInit {

  length$: Observable<number>;

  constructor(private cartStore: Store<CartState>) { }

  ngOnInit() {
    this.length$ = this.cartStore.select(selectCartSize);
  }

}