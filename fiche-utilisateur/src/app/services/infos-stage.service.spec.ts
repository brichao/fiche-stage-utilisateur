import { TestBed } from '@angular/core/testing';

import { InfosStageService } from './infos-stage.service';

describe('InfosStageService', () => {
  let service: InfosStageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InfosStageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
