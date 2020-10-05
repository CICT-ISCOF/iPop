import { TestBed } from '@angular/core/testing';

import { OutMigService } from './out-mig.service';

describe('OutMigService', () => {
  let service: OutMigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OutMigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
