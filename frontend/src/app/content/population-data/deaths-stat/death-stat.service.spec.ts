import { TestBed } from '@angular/core/testing';

import { DeathStatService } from './death-stat.service';

describe('DeathStatService', () => {
  let service: DeathStatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeathStatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
