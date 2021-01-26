import { TestBed } from '@angular/core/testing';

import { FocalPersonsService } from './focal-persons.service';

describe('FocalPersonsService', () => {
  let service: FocalPersonsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FocalPersonsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
