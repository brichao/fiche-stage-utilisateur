import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtractionPdfComponent } from './extraction-pdf.component';

describe('ExtractionPdfComponent', () => {
  let component: ExtractionPdfComponent;
  let fixture: ComponentFixture<ExtractionPdfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExtractionPdfComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtractionPdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
