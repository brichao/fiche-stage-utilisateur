import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonnelUgaComponent } from './personnel-uga.component';

describe('PersonnelUgaComponent', () => {
  let component: PersonnelUgaComponent;
  let fixture: ComponentFixture<PersonnelUgaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonnelUgaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonnelUgaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
