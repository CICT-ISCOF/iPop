import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleLogsComponent } from './role-logs.component';

describe('RoleLogsComponent', () => {
  let component: RoleLogsComponent;
  let fixture: ComponentFixture<RoleLogsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoleLogsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoleLogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
