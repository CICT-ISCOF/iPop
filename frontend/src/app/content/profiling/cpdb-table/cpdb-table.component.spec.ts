import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CpdbTableComponent } from './cpdb-table.component';

describe('CpdbTableComponent', () => {
  let component: CpdbTableComponent;
  let fixture: ComponentFixture<CpdbTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CpdbTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CpdbTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
