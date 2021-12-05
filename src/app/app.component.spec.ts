import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { provideMockStore } from '@ngrx/store/testing';
import { selectCartSize } from './cart/reducers/cart.reducer';

describe('AppComponent', () => {
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
          selectors: [
            {
              selector: selectCartSize,
              value: 0
            }
          ]
        })
      ]
    }).compileComponents();
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
});
