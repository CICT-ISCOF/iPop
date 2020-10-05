import { TestBed } from '@angular/core/testing';

import { BirthsService } from './births.service';

describe('BirthsService', () => {
  let service: BirthsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BirthsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
