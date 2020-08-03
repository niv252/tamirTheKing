import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { provideMockStore, MockStore } from '@ngrx/store/testing';

import { CartComponent } from './cart.component';
import { CartProductComponent } from '../cart-product/cart-product.component';
import { CartState, selectCart } from '../../reducers/cart.reducer';
import { ProductsState, selectProducts } from 'src/app/products/reducers/products.reducer';
import { removeCartProduct, updateProductQuantity, purchaseCart } from '../../actions/cart.actions';
import { purchaseProducts } from 'src/app/products/actions/products.actions';

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;
  let cartStore: MockStore<CartState>;
  let productsStore: MockStore<ProductsState>;
  const name = 'tamir';
  
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CartComponent, CartProductComponent ],
      imports: [ 
        RouterTestingModule.withRoutes([]),
        HttpClientModule
      ],
      providers: [
        provideMockStore({
          initialState: {},
          selectors: [
            {
              selector: selectCart,
              value: []
            },
            {
              selector: selectProducts,
              value: []
            }
          ]
        })
      ],
      schemas: [
        NO_ERRORS_SCHEMA
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    cartStore = TestBed.inject(MockStore);
    productsStore = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should dispatch remove product from cartStore on removeCart`, () => {
    spyOn(cartStore, 'dispatch');
    component.removeProduct(name);
    expect(cartStore.dispatch).toHaveBeenCalledWith(removeCartProduct({name: name}));
  });

  it(`should dispatch updateProductQuantity from cartStore on changeQuantity`, () => {
    const quantity = 1;
    spyOn(cartStore, 'dispatch');
    component.changeQuantity(name, quantity);
    expect(cartStore.dispatch).toHaveBeenCalledWith(updateProductQuantity({name: name, quantity: quantity}));
  });

  it('should initialize cart on ngOnInit', () => {
    expect(component.cart$).not.toBe(null);
  });

  describe('checkout', () => {
    it('should dispatch cartStore purchaseCart', () => {
      spyOn(cartStore, 'dispatch');
      component.checkout();
      expect(cartStore.dispatch).toHaveBeenCalledWith(purchaseCart());
    });

    it('should dispatch productsStore purchaseProducts', () => {
      spyOn(productsStore, 'dispatch');
      component.checkout();
      expect(productsStore.dispatch).toHaveBeenCalledWith(purchaseProducts({}));
    });
  });
});
