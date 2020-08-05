import { createAction, props } from '@ngrx/store';

export const addCartProduct = createAction('[Cart] Add CartProduct', props<{name: string}>());
export const removeCartProduct = createAction('[Cart] Remove CartProduct', props<{name: string}>());
export const updateProductQuantity = createAction('[Cart] Update Product Quantity', props<{name: string, quantity: number}>());
export const purchaseCart = createAction('[Cart] Purchase');