import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MetodopagoFormComponent } from './metodopago-form.component';

describe('MetodopagoFormComponent', () => {
  let component: MetodopagoFormComponent;
  let fixture: ComponentFixture<MetodopagoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MetodopagoFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MetodopagoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
