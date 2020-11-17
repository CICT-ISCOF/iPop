import { TestBed } from '@angular/core/testing';

import { ServicesOfferedService } from './services-offered.service';

describe('ServicesOfferedService', () => {
  let service: ServicesOfferedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicesOfferedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
