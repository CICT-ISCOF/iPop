import { TestBed } from '@angular/core/testing';

import { BirthStatService } from './birth-stat.service';

describe('BirthStatService', () => {
  let service: BirthStatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BirthStatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
