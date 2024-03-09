import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MetodopagosComponent } from './metodopagos.component';

describe('MetodopagosComponent', () => {
  let component: MetodopagosComponent;
  let fixture: ComponentFixture<MetodopagosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MetodopagosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MetodopagosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
