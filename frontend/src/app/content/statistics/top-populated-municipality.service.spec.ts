import { TestBed } from '@angular/core/testing';

import { TopPopulatedMunicipalityService } from './top-populated-municipality.service';

describe('TopPopulatedMunicipalityService', () => {
  let service: TopPopulatedMunicipalityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TopPopulatedMunicipalityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
