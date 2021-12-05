import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { provideMockStore, MockStore } from '@ngrx/store/testing';

import { ProductsComponent } from './products.component';
import { ProductComponent } from '../product/product.component';
import { Store } from '@ngrx/store';
import { CartState } from 'src/app/cart/reducers/cart.reducer';
import { ProductsState, selectProducts } from '../../reducers/products.reducer';
import { addCartProduct, removeCartProduct } from 'src/app/cart/actions/cart.actions';

describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;
  let store: MockStore<CartState | ProductsState>;
  const name = 'tamir';

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductsComponent, ProductComponent ],
      imports: [ 
        RouterTestingModule.withRoutes([]),
        HttpClientModule
      ],
      providers: [
        provideMockStore({
          initialState: {},
          selectors: [
            {
              selector: selectProducts,
              value: []
            }
          ]
        })
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should add product to store`, () => {
    spyOn(store, 'dispatch');
    component.addProductToCart(name);
    expect(store.dispatch).toHaveBeenCalledWith(addCartProduct({name}));
  });

  it(`should remove product from store`, () => {
    spyOn(store, 'dispatch');
    component.removeProductFromCart(name);
    expect(store.dispatch).toHaveBeenCalledWith(removeCartProduct({name}));
  });
});
