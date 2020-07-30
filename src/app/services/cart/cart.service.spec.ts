import { TestBed } from '@angular/core/testing';

import { CartService } from './cart.service';
import { take } from 'rxjs/operators';
import { Cart } from 'src/app/models/cart.model';

describe('CartService', () => {
  let service: CartService;
  const productName = "tamir";

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CartService]
    });
    service = TestBed.inject(CartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('addProduct', () => {
    it('should add product', () => {
      service.addProduct("tamir");
      service.getCart().pipe(take(1)).subscribe((cart: Cart) =>
      expect(Object.keys(cart).length).toBe(1));
    });

    it('should set quantity to 1', () => {
      const productName = "tamir";
      service.addProduct(productName);
      service.getCart().pipe(take(1)).subscribe((cart: Cart) =>
      expect(cart[productName]).toBe(1));
    });
  });

  it('should remove product', () => {
    service.addProduct(productName);
    service.removeProduct(productName);
    service.getCart().pipe(take(1)).subscribe((cart: Cart) =>
    expect(Object.keys(cart).length).toBe(0));
  });

  it('should update quantity of product', () => {
    //da cringe
    const quantity = 324;
    service.addProduct(productName);
    service.updateProductQuantity(productName, quantity);
    service.getCart().pipe(take(1)).subscribe((cart: Cart) =>
    expect(cart[productName]).toBe(quantity));
  });

  it('should return the size of the cart', () => {
    service.getCartSize().pipe(take(1)).subscribe((length: number) =>
    expect(length).toBe(0));
  });

  describe('isCartProductExist', () => {
    it('should return true if product exist', () => {
      service.addProduct(productName);
      service.isCartProductExist(productName).pipe(take(1)).subscribe((isExist: boolean) =>
      expect(isExist).toBe(true));
    });

    it('should return false if product doesnt exist', () => {
      service.addProduct(productName + "the king");
      service.isCartProductExist(productName).pipe(take(1)).subscribe((isExist: boolean) =>
      expect(isExist).toBe(false));
    });
  });

  it('should return cart', () => {
    service.addProduct(productName);
    service.getCart().pipe(take(1)).subscribe((cart: Cart) =>
    expect(cart).toBe({tamir: 1}));
  });

  it('should be clean after purchase', () => {
    service.addProduct(productName);
    service.purchaseCart();
    service.getCart().pipe(take(1)).subscribe((cart: Cart) =>
    expect(Object.keys(cart).length).toBe(0));
  });
});
