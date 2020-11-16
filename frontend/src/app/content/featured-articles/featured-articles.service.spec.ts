import { TestBed } from '@angular/core/testing';

import { FeaturedArticlesService } from './featured-articles.service';

describe('FeaturedArticlesService', () => {
  let service: FeaturedArticlesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FeaturedArticlesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
