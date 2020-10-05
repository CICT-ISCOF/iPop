import { TestBed } from '@angular/core/testing';

import { CpdbService } from './cpdb.service';

describe('CpdbService', () => {
  let service: CpdbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CpdbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
