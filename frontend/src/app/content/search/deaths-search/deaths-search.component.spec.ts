import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeathsSearchComponent } from './deaths-search.component';

describe('DeathsSearchComponent', () => {
  let component: DeathsSearchComponent;
  let fixture: ComponentFixture<DeathsSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeathsSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeathsSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
