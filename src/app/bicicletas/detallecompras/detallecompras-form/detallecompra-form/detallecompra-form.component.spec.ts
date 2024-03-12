import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallecompraFormComponent } from './detallecompra-form.component';

describe('DetallecompraFormComponent', () => {
  let component: DetallecompraFormComponent;
  let fixture: ComponentFixture<DetallecompraFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetallecompraFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetallecompraFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
