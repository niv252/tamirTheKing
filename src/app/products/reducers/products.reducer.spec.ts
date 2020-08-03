import { productsReducer, ProductsState, initialState } from './products.reducer';
import { purchaseProducts, productsLoaded } from '../actions/products.actions';
import { Cart } from 'src/app/models/cart.model';

describe('productsReducer', () => {
    describe('undefined action', () => {
        it('should return the default state', () => {
            const expectedState =  initialState;
            const action = {};
            const state = productsReducer(undefined, action);

            expect(state).toBe(expectedState);
        });
    });

    describe('purchaseProducts', () => {
        it(`should update products' limit`, () => {
            const name = 'tamir';
            const quantityBought = 5;
            const product = {description: 'tamir', image: 'tamir', name: name, price: 30, limit: 30};
            const state: ProductsState = { products: [product] };
            const expectedState: ProductsState =  { products: [{...product, limit: product.limit - quantityBought}] };
            const action = purchaseProducts({tamir: quantityBought} as Cart);
            const result = productsReducer(state, action);

            expect(result).toEqual(expectedState);
        });
    });

    describe('productsLoader', () => {
        it(`should update products in state`, () => {
            const products = [{description: 'tamir', image: 'tamir', name: 'tamir', price: 30, limit: 30}];
            const expectedState: ProductsState = { products: products };
            const action = productsLoaded({products: products});
            const result = productsReducer(initialState, action);

            expect(result).toEqual(expectedState);
        });
    });
});