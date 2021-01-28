import { TestBed } from '@angular/core/testing';

import { PopulationPyramidService } from './population-pyramid.service';

describe('PopulationPyramidService', () => {
  let service: PopulationPyramidService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PopulationPyramidService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
