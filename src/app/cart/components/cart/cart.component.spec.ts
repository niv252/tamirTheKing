import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { mock, instance, verify, when } from 'ts-mockito';

import { CartComponent } from './cart.component';
import { CartService } from 'src/app/services/cart/cart.service';
import { ProductsService } from 'src/app/services/products/products.service';
import { CartProductComponent } from '../cart-product/cart-product.component';
import { of } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;
  let productsService: ProductsService;
  let mockedCartService: CartService;

  beforeEach(async(() => {
    mockedCartService = mock(CartService);

    TestBed.configureTestingModule({
      declarations: [ CartComponent, CartProductComponent ],
      providers: [{provide: CartService, useValue: instance(mockedCartService)}, ProductsService],
      imports: [ 
        RouterTestingModule.withRoutes([]),
        HttpClientModule
      ],
      schemas: [
        NO_ERRORS_SCHEMA
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    productsService = TestBed.get(ProductsService);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call remove product from cart service on removeProduct', () => {
    const productName = "tamir";
    component.removeProduct(productName);
    verify(mockedCartService.removeProduct(productName)).once();
  });

  it('should call update quantity of cart service on updateProductQuantity', () => {
    const productName = "tamir";
    const quantity = 1;
    component.changeQuantity(productName, quantity);
    verify(mockedCartService.updateProductQuantity(productName, quantity)).once();
  });

  it('should initialize cart on ngOnInit', () => {
    expect(component.cart$).not.toBe(null);
  });

  describe('checkout', () => {
    beforeEach(() => {
      when(mockedCartService.getCart()).thenReturn(of({}));
    });

    it('should call cart service purchaseCart', () => {
      when(mockedCartService.getCart()).thenReturn(of({}));
      component.checkout();
      verify(mockedCartService.purchaseCart()).once();
    });

    it('should call products service purchaseProducts', () => {
      spyOn(productsService, 'purchaseProducts');
      component.checkout();
      expect(productsService.purchaseProducts).toHaveBeenCalled();
    });
  });
});
