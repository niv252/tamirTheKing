import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDetailsComponent } from './product-details.component';
import { HttpClientModule } from '@angular/common/http';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { ProductsState, selectProductByName } from '../../reducers/products.reducer';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';

describe('ProductDetailsComponent', () => {
  let component: ProductDetailsComponent;
  let fixture: ComponentFixture<ProductDetailsComponent>;
  const initialProductsState: ProductsState = {products: []};
  let store: MockStore<ProductsState>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductDetailsComponent ],
      imports: [ 
        HttpClientModule,
        RouterTestingModule.withRoutes([]) 
      ],
      providers: [
        provideMockStore({initialState: initialProductsState})
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(ProductDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
