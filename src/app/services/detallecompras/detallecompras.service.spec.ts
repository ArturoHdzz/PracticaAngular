import { TestBed } from '@angular/core/testing';

import { DetallecomprasService } from './detallecompras.service';

describe('DetallecomprasService', () => {
  let service: DetallecomprasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DetallecomprasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
