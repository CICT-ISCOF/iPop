import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarriagesSearchComponent } from './marriages-search.component';

describe('MarriagesSearchComponent', () => {
  let component: MarriagesSearchComponent;
  let fixture: ComponentFixture<MarriagesSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarriagesSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarriagesSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
