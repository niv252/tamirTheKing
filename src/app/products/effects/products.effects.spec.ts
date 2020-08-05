import { TestBed, async } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of, throwError } from 'rxjs';
import { Action } from '@ngrx/store';
import { hot, cold } from 'jasmine-marbles';

import { Product } from 'src/app/models/product.model';
import { ProductsEffects } from './products.effects';
import { productsLoadedSuccess, loadProducts, productsLoadedFail } from '../actions/products.actions';
import { HttpClient } from '@angular/common/http';
import { mock, instance, when, anyString } from 'ts-mockito';
import { ROOT_EFFECTS_INIT } from '@ngrx/effects';

describe('productsEffects', () => {
    let effects: ProductsEffects;
    let actions$: Observable<Action>;
    let mockedHttpClient: HttpClient;

    let products: Product[] = [
      {
        name: "Oatmeal",
        description: "Hot and fluffy oatmeal & protein powder cake",
        price: 330.00,
        image: "assets/images/oatmeal.jpg",
        limit: 30
        },
      {
        name: "WS license",
        description: "Rare WS license. No need for military email",
        price: 200.00,
        image: "assets/images/ws.png"
      }
    ];
    const jsonPath = '/assets/json/products.json';

    beforeEach(async(() => {
        mockedHttpClient = mock(HttpClient);

        TestBed.configureTestingModule({
          providers: [            
            ProductsEffects,
            provideMockActions(() => actions$),
            {provide: HttpClient, useValue: instance(mockedHttpClient)}
          ],
          imports: []
        }).compileComponents();

        effects = TestBed.inject<ProductsEffects>(ProductsEffects);
    }));

    it('should load products to state', () => {
        when(mockedHttpClient.get<Product[]>(jsonPath)).thenReturn(of(products));
        actions$ = hot('a', {a: loadProducts()}); 
        const expected = hot('b', {b: productsLoadedSuccess({products: products})});
        expect(effects.loadProducts$).toBeObservable(expected);
    })

    it('should dispatch load products failed when recieving an error', () => {
        when(mockedHttpClient.get<Product[]>(anyString())).thenReturn(throwError(() => new Error));
        actions$ = hot('a', {a: loadProducts()}); 
        const expected = hot('b', {b: productsLoadedFail()});
        expect(effects.loadProducts$).toBeObservable(expected);
    })

    it('should init load products on start', () => {
        actions$ = hot('a', {a: {type: ROOT_EFFECTS_INIT}}); 

        const expected = hot('b', {b: loadProducts()});

        expect(effects.initLoadProducts$).toBeObservable(expected);
    })
});