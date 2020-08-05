import { productsReducer, ProductsState, initialState } from './products.reducer';
import { purchaseProducts, productsLoadedSuccess } from '../actions/products.actions';

describe('productsReducer', () => {
    describe('purchaseProducts', () => {
        it(`should update products' limit`, () => {
            const name = 'tamir';
            const quantityBought = 5;
            const product = {description: 'tamir', image: 'tamir', name: name, price: 30, limit: 30};
            const state: ProductsState = { products: [product] };
            const expectedState: ProductsState =  { products: [{...product, limit: product.limit - quantityBought}] };
            const action = purchaseProducts({tamir: quantityBought});
            const result = productsReducer(state, action);

            expect(result).toEqual(expectedState);
        });
    });

    describe('productsLoader', () => {
        it(`should update products in state`, () => {
            const products = [{description: 'tamir', image: 'tamir', name: 'tamir', price: 30, limit: 30}];
            const expectedState: ProductsState = { products: products };
            const action = productsLoadedSuccess({products});
            const result = productsReducer(initialState, action);

            expect(result).toEqual(expectedState);
        });
    });
});