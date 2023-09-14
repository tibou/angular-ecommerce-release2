import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ProductsListComponent } from './products-list.component';
import { Product } from 'src/app/common/product';
import { Observable, of } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';
import { HttpClient } from '@angular/common/http';
import { By } from '@angular/platform-browser';
import { formatCurrency } from '@angular/common';

const products = [
  new Product('sku', 'name', 'description', 12, 'url', true, 123, new Date(), new Date()),
  new Product('sku1', 'name1', 'description1', 122, 'url', true, 1223, new Date(), new Date())
];


class ProductServiceStub {
  getProductList(): Observable<Product[]> {
    return of(products);
  }
}

describe('ProductsListComponent', () => {
  let httpClient: { get: jasmine.Spy };
  let component: ProductsListComponent;
  let fixture: ComponentFixture<ProductsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductsListComponent],
      providers: [{ provide: ProductService, useClass: ProductServiceStub }, { provide: HttpClient, useValue: httpClient }]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ProductsListComponent);
    component = fixture.componentInstance;
    httpClient = jasmine.createSpyObj('HttpClient', ['GET']);
    //fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('verify html', waitForAsync(() => {
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      const displayElements = fixture.debugElement.queryAll(By.css('.product-box'));
      console.log(displayElements.length);
      displayElements.forEach((element, index) => {
        // les liens
        const links = element.queryAll(By.css('a'));
        console.log("Link", links.length);
        // l'image du premier lien
        const img1 = links[0].query(By.css('img'));
        // le h1 du 2e lien
        const h1 = links[1].query(By.css('h1'));
        expect(img1.nativeElement.src).toContain(products[index].imageUrl);
        expect(h1.nativeElement.textContent).toBe(products[index].name);
        // le h2
        const h2 = element.query(By.css('h2'));
        expect(h2.nativeElement.textContent).toBe(products[index].description);
        // le div
        const div = element.query(By.css('div'));
        // expect(div.nativeElement.textContent).toBe(
        //   products[index].unitPrice
        // );
      });

    });
  }));

});
