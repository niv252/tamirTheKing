import { createReducer, on, createSelector, createFeatureSelector } from '@ngrx/store';

import { productsLoaded, purchaseProducts } from '../actions/products.actions';
import { Product } from '../../models/product.model';
import { Cart } from 'src/app/models/cart.model';

export const PRODUCTS_STORE_TOKEN='products';

export interface ProductsState {
  products: Product[]
}

export const initialState: ProductsState = {
  products: []
};
 
const _productsReducer = createReducer(initialState,
  on(purchaseProducts, (state: ProductsState, cart: Cart) => (
    {
      ...state,
      products: state.products.map((product: Product) => (
        cart[product.name] ? 
          {
            ...product,
            limit: product.limit - cart[product.name]
          } 
          : product))
    })
  ),
  on(productsLoaded, (state: ProductsState, props: {products: Product[]}) =>
    ({
      ...state,
      products: props.products
    })
  )
);
 
export function productsReducer(state, action) {
  return _productsReducer(state, action);
}

const selectFeature = createFeatureSelector<ProductsState>(PRODUCTS_STORE_TOKEN);
  
export const selectProducts = createSelector(
  selectFeature,
  (state: ProductsState) => state.products
);

export const selectProductByName = createSelector(
  selectFeature,
  (state: ProductsState, props) => state.products.find((product: Product) => product.name === props.name)
);