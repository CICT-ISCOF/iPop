import { TestBed } from '@angular/core/testing';

import { PopByMunicipalityService } from './pop-by-municipality.service';

describe('PopByMunicipalityService', () => {
  let service: PopByMunicipalityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PopByMunicipalityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
