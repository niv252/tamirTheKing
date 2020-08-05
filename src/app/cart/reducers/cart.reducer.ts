import { omit } from 'lodash';
import { createReducer, on, createSelector, createFeatureSelector } from '@ngrx/store';

import { Cart } from '../../models/cart.model';
import { addCartProduct, removeCartProduct, purchaseCart, updateProductQuantity } from '../actions/cart.actions';

export const CART_STORE_TOKEN='cart-state';

export interface CartState {
  cart: Cart
}

export const initialState: CartState = {
  cart: {}
};
 
const _cartReducer = createReducer(initialState,
  on(addCartProduct, (state: CartState, {name}) => (
    {
      ...state,
      cart: 
      {
        ...state.cart,
        [name]: 1
      }
    })
  ),
  on(removeCartProduct, (state: CartState, {name}) => (
    {
      ...state,
      cart: omit(state.cart, name)
    })
  ),
  on(updateProductQuantity, (state: CartState, {name, quantity}) => (
    {
      ...state,
      cart:
      {
        ...state.cart,
        [name]: quantity
      }
    })
  ),
  on(purchaseCart, (state: CartState) => (
    {
      ...state,
      cart: {}
    })
  )
);
 
export function cartReducer(state, action) {
  return _cartReducer(state, action);
}

const selectFeature = createFeatureSelector<CartState>(CART_STORE_TOKEN);
  
export const selectCart = createSelector(
  selectFeature,
  (state: CartState) => state.cart
);

export const selectCartSize = createSelector(
  selectFeature,
  (state: CartState) => Object.keys(state.cart).length
);

export const selectIsProductInCart = createSelector(
  selectFeature,
  (state: CartState, {name}) => !!state.cart[name]
);