import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CartState, selectCartSize } from './cart/reducers/cart.reducer';
import { loadProducts } from './products/actions/products.actions';
import { Cart } from './models/cart.model';

describe('AppComponent', () => {
  const initialCartState: CartState = {cart:{} as Cart};
  let store: MockStore<CartState>;
  let fixture: ComponentFixture<AppComponent>;;
  let app: AppComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent,
        NavbarComponent
      ],
      providers: [
        provideMockStore({ 
          initialState: initialCartState,
          selectors: [
            {
              selector: selectCartSize,
              value: 0
            }
          ]
        })
      ]
    }).compileComponents();
    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    app = fixture.componentInstance;
  }));

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it(`should have as title 'amaromach'`, () => {
    expect(app.title).toEqual('amaromach');
  });

  it(`should dispatch loadProducts on init`, () => {
    spyOn(store, 'dispatch');
    app.ngOnInit();
    expect(store.dispatch).toHaveBeenCalledWith(loadProducts());
  });
});
