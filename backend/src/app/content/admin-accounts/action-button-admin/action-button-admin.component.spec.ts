import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionButtonAdminComponent } from './action-button-admin.component';

describe('ActionButtonAdminComponent', () => {
  let component: ActionButtonAdminComponent;
  let fixture: ComponentFixture<ActionButtonAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActionButtonAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionButtonAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
