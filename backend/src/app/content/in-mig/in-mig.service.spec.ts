import { TestBed } from '@angular/core/testing';

import { InMigService } from './in-mig.service';

describe('InMigService', () => {
  let service: InMigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InMigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
