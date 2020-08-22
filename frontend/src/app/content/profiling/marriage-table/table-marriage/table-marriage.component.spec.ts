import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableMarriageComponent } from './table-marriage.component';

describe('TableMarriageComponent', () => {
  let component: TableMarriageComponent;
  let fixture: ComponentFixture<TableMarriageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableMarriageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableMarriageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
