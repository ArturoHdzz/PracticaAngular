import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoritoFormComponent } from './favorito-form.component';

describe('FavoritoFormComponent', () => {
  let component: FavoritoFormComponent;
  let fixture: ComponentFixture<FavoritoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FavoritoFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FavoritoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
