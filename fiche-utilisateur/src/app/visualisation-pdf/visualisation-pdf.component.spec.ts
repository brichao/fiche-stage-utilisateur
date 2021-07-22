import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualisationPdfComponent } from './visualisation-pdf.component';

describe('VisualisationPdfComponent', () => {
  let component: VisualisationPdfComponent;
  let fixture: ComponentFixture<VisualisationPdfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisualisationPdfComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualisationPdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
