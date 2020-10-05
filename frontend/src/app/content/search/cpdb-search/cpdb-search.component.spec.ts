import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CpdbSearchComponent } from './cpdb-search.component';

describe('CpdbSearchComponent', () => {
  let component: CpdbSearchComponent;
  let fixture: ComponentFixture<CpdbSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CpdbSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CpdbSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
