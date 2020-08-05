import { createAction, props } from '@ngrx/store';
import { Product } from '../../models/product.model';
import { Cart } from 'src/app/models/cart.model';

export const purchaseProducts = createAction('[Products] Purchase', props<Cart>());
export const loadProducts = createAction('[Products] Load');
export const productsLoadedSuccess = createAction('[Products] Loaded Successfully', props<{products: Product[]}>());
export const productsLoadedFail = createAction('[Products] Failed to Load');