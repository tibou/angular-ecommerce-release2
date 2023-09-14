import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { ProductService } from './services/product.service';
import { HttpClient } from '@angular/common/http';

describe('AppComponent', () => {
  let httpClient: { get: jasmine.Spy };
  let fixture: ComponentFixture<AppComponent>;
  let app: AppComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent, ProductsListComponent
      ],
      providers: [ProductService, { provide: HttpClient, useValue: httpClient }]
    }).compileComponents();
    httpClient = jasmine.createSpyObj('HttpClient', ['get']);
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it(`should have as title 'angular-ecommerce'`, () => {
    expect(app.title).toEqual('angular-ecommerce');
  });

  xit('should render title', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.content span')?.textContent).toContain('angular-ecommerce app is running!');
  });
});
