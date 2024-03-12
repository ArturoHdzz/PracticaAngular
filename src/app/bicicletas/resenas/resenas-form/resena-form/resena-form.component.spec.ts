import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResenaFormComponent } from './resena-form.component';

describe('ResenaFormComponent', () => {
  let component: ResenaFormComponent;
  let fixture: ComponentFixture<ResenaFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResenaFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ResenaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
