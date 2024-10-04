import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KnjigeComponent } from './knjige.component';

describe('KnjigeComponent', () => {
  let component: KnjigeComponent;
  let fixture: ComponentFixture<KnjigeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KnjigeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KnjigeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
