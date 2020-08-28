import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableBirthsComponent } from './table-births.component';

describe('TableBirthsComponent', () => {
  let component: TableBirthsComponent;
  let fixture: ComponentFixture<TableBirthsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableBirthsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableBirthsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
