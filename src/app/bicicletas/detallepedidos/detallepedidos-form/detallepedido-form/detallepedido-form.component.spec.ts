import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallepedidoFormComponent } from './detallepedido-form.component';

describe('DetallepedidoFormComponent', () => {
  let component: DetallepedidoFormComponent;
  let fixture: ComponentFixture<DetallepedidoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetallepedidoFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetallepedidoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
