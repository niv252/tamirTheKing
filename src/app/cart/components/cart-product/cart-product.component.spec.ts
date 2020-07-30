import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CartProductComponent } from './cart-product.component';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

describe('CartProductComponent', () => {
  let component: CartProductComponent;
  let fixture: ComponentFixture<CartProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CartProductComponent ],
      imports: [
        MatSelectModule,
        MatFormFieldModule,
        BrowserAnimationsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartProductComponent);
    component = fixture.componentInstance;
    component.product = {description: 'tamir', image: 'tamir', price: 10, name: 'tamir', limit: 30}
    component.quantity = 1;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit on removeCartProduct', () => {
    spyOn(component.productRemoved, 'emit');
    component.removeCartProduct();
    expect(component.productRemoved.emit).toHaveBeenCalled();
  });

  it('should emit on updateQuantity', () => {
    spyOn(component.quantityChanged, 'emit');
    component.updateQuantity(1);
    expect(component.quantityChanged.emit).toHaveBeenCalled();
  });
});
