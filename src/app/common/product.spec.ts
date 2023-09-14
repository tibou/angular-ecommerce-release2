import { Product } from './product';

describe('Product', () => {
  it('should create a Product instance', () => {
    expect(new Product(
      '1VG','name', 'description', 12, 'imageUrl', true, 129, new Date(), new Date()
    )).toBeTruthy();
  });
});


      