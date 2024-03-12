import { TestBed } from '@angular/core/testing';

import { MetodopagosService } from './metodopagos.service';

describe('MetodopagosService', () => {
  let service: MetodopagosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MetodopagosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
