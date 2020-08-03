import { omit } from 'lodash';
import { createReducer, on, createSelector, createFeatureSelector } from '@ngrx/store';

import { Cart } from '../../models/cart.model';
import { addCartProduct, removeCartProduct, purchaseCart, updateProductQuantity } from '../actions/cart.actions';

export const CART_STORE_TOKEN='cart';

export interface CartState {
  cart: Cart
}

export const initialState: CartState = {
  cart: {} as Cart
};
 
const _cartReducer = createReducer(initialState,
  on(addCartProduct, (state: CartState, props: {name: string}) => (
    {
      ...state,
      cart: 
      {
        ...state.cart,
        [props.name]: 1
      }
    })
  ),
  on(removeCartProduct, (state: CartState, props: {name: string}) => (
    {
      ...state,
      cart: omit(state.cart, props.name)
    })
  ),
  on(updateProductQuantity, (state: CartState, props: {name: string, quantity: number}) => (
    {
      ...state,
      cart:
      {
        ...state.cart,
        [props.name]: props.quantity
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

export const selectIsCartProductExist = createSelector(
  selectFeature,
  (state: CartState, props) => !!state.cart[props.name]
);