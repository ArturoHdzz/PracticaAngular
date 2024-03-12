import { TestBed } from '@angular/core/testing';

import { DetallepedidosService } from './detallepedidos.service';

describe('DetallepedidosService', () => {
  let service: DetallepedidosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DetallepedidosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
