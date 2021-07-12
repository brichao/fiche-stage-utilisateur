import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RechercheFicheComponent } from './recherche-fiche.component';

describe('RechercheFicheComponent', () => {
  let component: RechercheFicheComponent;
  let fixture: ComponentFixture<RechercheFicheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RechercheFicheComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RechercheFicheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
