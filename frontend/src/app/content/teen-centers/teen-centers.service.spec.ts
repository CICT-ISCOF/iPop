import { TestBed } from '@angular/core/testing';

import { TeenCentersService } from './teen-centers.service';

describe('TeenCentersService', () => {
  let service: TeenCentersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TeenCentersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
