import { TestBed } from '@angular/core/testing';

import { ProductosDbService } from './productos-db.service';

describe('ProductosDbService', () => {
  let service: ProductosDbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductosDbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
