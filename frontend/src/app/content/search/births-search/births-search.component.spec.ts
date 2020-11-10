import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BirthsSearchComponent } from './births-search.component';

describe('BirthsSearchComponent', () => {
  let component: BirthsSearchComponent;
  let fixture: ComponentFixture<BirthsSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BirthsSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BirthsSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
