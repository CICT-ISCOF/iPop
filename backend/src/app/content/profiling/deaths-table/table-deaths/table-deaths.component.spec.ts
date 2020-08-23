import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableDeathsComponent } from './table-deaths.component';

describe('TableDeathsComponent', () => {
  let component: TableDeathsComponent;
  let fixture: ComponentFixture<TableDeathsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableDeathsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableDeathsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
