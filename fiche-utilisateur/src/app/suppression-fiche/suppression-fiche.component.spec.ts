import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuppressionFicheComponent } from './suppression-fiche.component';

describe('SuppressionFicheComponent', () => {
  let component: SuppressionFicheComponent;
  let fixture: ComponentFixture<SuppressionFicheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuppressionFicheComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuppressionFicheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
