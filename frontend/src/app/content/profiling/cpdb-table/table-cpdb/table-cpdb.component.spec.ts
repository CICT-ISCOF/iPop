import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableCpdbComponent } from './table-cpdb.component';

describe('TableCpdbComponent', () => {
  let component: TableCpdbComponent;
  let fixture: ComponentFixture<TableCpdbComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableCpdbComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableCpdbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
