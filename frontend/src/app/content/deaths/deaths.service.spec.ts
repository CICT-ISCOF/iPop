import { TestBed } from '@angular/core/testing';

import { DeathsService } from './deaths.service';

describe('DeathsService', () => {
  let service: DeathsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeathsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
