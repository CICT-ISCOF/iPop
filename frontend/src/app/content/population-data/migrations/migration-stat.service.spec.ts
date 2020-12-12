import { TestBed } from '@angular/core/testing';

import { MigrationStatService } from './migration-stat.service';

describe('MigrationStatService', () => {
  let service: MigrationStatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MigrationStatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
