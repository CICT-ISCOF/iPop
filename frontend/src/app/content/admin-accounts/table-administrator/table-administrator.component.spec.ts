import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableAdministratorComponent } from './table-administrator.component';

describe('TableAdministratorComponent', () => {
  let component: TableAdministratorComponent;
  let fixture: ComponentFixture<TableAdministratorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableAdministratorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableAdministratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
