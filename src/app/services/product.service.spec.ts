import { TestBed } from '@angular/core/testing';
import { HttpTestingController, HttpClientTestingModule, TestRequest } from '@angular/common/http/testing';

import { ProductService } from './product.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Product } from '../common/product';

describe('ProductService', () => {
  let service: ProductService;
  let httpClient: HttpClient;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductService]
    });
    service = TestBed.inject(ProductService);
    httpClient = TestBed.inject(HttpClient);
    httpController = TestBed.inject(HttpTestingController);
  });
  afterEach(() => {
    httpController.verify();
  });

  it('be created', () => {
    expect(service).toBeDefined();
  });

  it('call getProductList()', () => {
    const products = [
      new Product('sku', 'name', 'description', 12, 'url', true, 123, new Date(), new Date()),
      new Product('sku1', 'name1', 'description1', 122, 'url', true, 1223, new Date(), new Date())
    ];

    const testData: { _embedded: { products: Product[] } } = {
      _embedded: {
        products: products
      }
    };
    service.getProductList().subscribe((data) => {
      expect(data).toEqual(products);
      expect(data).toHaveSize(2);
    });
    const req: TestRequest = httpController.expectOne('http://localhost:8080/api/products');

    expect(req.request.method).toEqual('GET');

    req.flush(testData);
  });

  xit('call getProductList() failed', () => {
    const errMessage = "Error 500 on server";

    service.getProductList().subscribe({
      next: () => {
        fail("should fail with 500 error")
      },
      error: (error: HttpErrorResponse) => {
        expect(error.status).toEqual(500);
        expect(error.message).toEqual(errMessage);
      }
    });

    const req = httpController.expectOne('http://localhost:8080/api/products');
    expect(req.request.method).toEqual('GET');

    req.flush(errMessage, { status: 500, statusText: 'Server error' });

  });
});
