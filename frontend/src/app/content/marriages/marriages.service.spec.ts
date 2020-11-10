import { TestBed } from '@angular/core/testing';

import { MarriagesService } from './marriages.service';

describe('MarriagesService', () => {
  let service: MarriagesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MarriagesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
