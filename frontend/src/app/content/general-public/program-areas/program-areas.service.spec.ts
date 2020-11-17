import { TestBed } from '@angular/core/testing';

import { ProgramAreasService } from './program-areas.service';

describe('ProgramAreasService', () => {
  let service: ProgramAreasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProgramAreasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
