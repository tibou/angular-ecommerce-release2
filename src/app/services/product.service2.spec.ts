import { TestBed, fakeAsync, tick, } from "@angular/core/testing";
import { ProductService } from "./product.service";
import { HttpClient } from "@angular/common/http";
import { Product } from "../common/product";
import { EMPTY, defer, of } from "rxjs";

describe('ProductService with Spy', () => {
  let service: ProductService;
  let httpClientSpy: { get: jasmine.Spy }
  httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);

  beforeEach(() => {

    TestBed.configureTestingModule({
      providers: [ProductService,
        { provide: HttpClient, useValue: httpClientSpy }]
    });

    service = TestBed.inject(ProductService);
  });

  afterEach(() => {

  });

  it('should create', () => {
    expect(service).toBeDefined();
  });

  it('call getProductList()', fakeAsync(() => {
    const products = [
      new Product('sku', 'name', 'description', 12, 'url', true, 123, new Date(), new Date()),
      new Product('sku1', 'name1', 'description1', 122, 'url', true, 1223, new Date(), new Date())
    ];

    const testData: { _embedded: { products: Product[] } } = {
      _embedded: {
        products: products
      }
    };

    httpClientSpy.get.and.returnValue(defer(() => {
      return of(testData);
    }));

    service.getProductList().subscribe((data) => {
      expect(data).toEqual(products);
      expect(data).toHaveSize(2);
    });

    tick();
  }));

});