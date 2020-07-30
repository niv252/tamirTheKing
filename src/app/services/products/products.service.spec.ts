import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { take } from 'rxjs/operators';

import { ProductsService } from './products.service';
import { Product } from 'src/app/models/product.model';
import { Cart } from 'src/app/models/cart.model';

describe('ProductsService', () => {
  let service: ProductsService;
  let httpMock: HttpTestingController;
  let productsRequest: TestRequest;
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
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductsService],
      imports: [HttpClientTestingModule]
    });
    httpMock = TestBed.get(HttpTestingController);
    service = TestBed.get(ProductsService);
    productsRequest = httpMock.expectOne(jsonPath);
    productsRequest.flush(products); 
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return products', (done) => {    
    service.getProducts()
    .subscribe((res: Product[]) => {
       expect(res).toBe(products);
      done();
    });
  });

  it('should return product', (done) => {    
    service.getProductByName(products[0].name).subscribe((product: Product) => {
      expect(product).toBe(products[0]);
      done();
    })
  });

  
  it('should update products after purchase', (done) => {
    const originalOatmealProduct = products.find((product: Product) => product.name === "Oatmeal");
    const quantityBought = 5;
    let cart = {Oatmeal: quantityBought} as Cart;
    service.purchaseProducts(cart);
    service.getProducts().subscribe((products: Product[]) => {
      let boughtProduct = products.find((product: Product) => product.name === "Oatmeal");
      expect(boughtProduct.limit).toBe(originalOatmealProduct.limit - quantityBought);
      done();
    })
  });

  afterEach(() => {
    httpMock.verify();
  });
});
