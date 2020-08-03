import { initialState, cartReducer, CartState } from "./cart.reducer";
import { addCartProduct, removeCartProduct, updateProductQuantity, purchaseCart } from '../actions/cart.actions';
import { Cart } from 'src/app/models/cart.model';

describe('cartReducer', () => {
    describe('undefined action', () => {
        it('should return the default state', () => {
            const expectedState =  initialState;
            const action = {};
            const state = cartReducer(undefined, action);

            expect(state).toBe(expectedState);
        });
    });

    describe('addCartProduct', () => {
        it('should add cart product to the state', () => {
            const cartProduct: Cart = {tamir: 1};
            const expectedState: CartState =  { cart: cartProduct };
            const action = addCartProduct({name: 'tamir'});
            const result = cartReducer(initialState, action);

            expect(result).toEqual(expectedState);
        });
    });

    describe('removeCartProduct', () => {
        it('should remove cartProduct from the state', () => {
            const state: CartState = { cart: {tamir: 1} }
            const expectedState: CartState =  { cart: {}};
            const action = removeCartProduct({name: 'tamir'});
            const result = cartReducer(state, action);
            expect(result).toEqual(expectedState);
        });
    });

    describe('updateProductQuantity', () => {
        it('should update product quantity in state', () => {
            //da cringe
            const quantity = 324;
            const state: CartState = { cart: {tamir: 1} };
            const expectedState: CartState =  { cart: {tamir: quantity} };
            const action = updateProductQuantity({name: 'tamir', quantity: 324});
            const result = cartReducer(state, action);
            expect(result).toEqual(expectedState);
        });
    });

    describe('purchaseCart', () => {
        it('should clear cart in state', () => {
            //da cringe
            const state: CartState = { cart: {tamir: 1} };
            const expectedState: CartState =  { cart: {} };
            const action = purchaseCart();
            const result = cartReducer(state, action);
            expect(result).toEqual(expectedState);
        });
    });
});