import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { HttpClientModule } from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { mock, instance, verify, when } from 'ts-mockito';

import { CartComponent } from './cart.component';
import { CartService } from 'src/app/services/cart/cart.service';
import { ProductsService } from 'src/app/services/products/products.service';
import { CartProductComponent } from '../cart-product/cart-product.component';
import { of } from 'rxjs';

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;
  let productsService: ProductsService;
  let cartService: CartService;
  let cartServiceMockInstance: CartService;
  let mockedCartService: CartService;

  beforeEach(async(() => {
    mockedCartService = mock(CartService);
    cartServiceMockInstance = instance(mockedCartService);

    TestBed.configureTestingModule({
      declarations: [ CartComponent, CartProductComponent ],
      providers: [{provide: CartService, useValue: cartServiceMockInstance}, ProductsService],
      imports: [ 
        RouterTestingModule.withRoutes([]),
        MatSelectModule,
        MatFormFieldModule, 
        HttpClientModule,
        BrowserAnimationsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    productsService = TestBed.get(ProductsService);
    cartService = TestBed.get(CartService);

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
    spyOn(cartService, 'updateProductQuantity');
    component.changeQuantity("1", 1);
    expect(cartService.updateProductQuantity).toHaveBeenCalled();
  });

  it('should initialize cart on ngOnInit', () => {
    component.ngOnInit();
    expect(component.cart$).not.toBe(null);
  });

  describe('checkout', () => {
    it('should call cart service purchaseCart', () => {
      when(mockedCartService.getCart()).thenReturn(of({}));
      component.checkout();
      verify(mockedCartService.purchaseCart()).once();
    });

    it('should call products service purchaseProducts', () => {
      when(mockedCartService.getCart()).thenReturn(of({}));
      spyOn(productsService, 'purchaseProducts');
      component.checkout();
      expect(productsService.purchaseProducts).toHaveBeenCalled();
    });
  });
});
