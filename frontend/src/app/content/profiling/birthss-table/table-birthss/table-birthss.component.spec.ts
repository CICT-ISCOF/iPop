import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableBirthssComponent } from './table-birthss.component';

describe('TableBirthssComponent', () => {
  let component: TableBirthssComponent;
  let fixture: ComponentFixture<TableBirthssComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableBirthssComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableBirthssComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
