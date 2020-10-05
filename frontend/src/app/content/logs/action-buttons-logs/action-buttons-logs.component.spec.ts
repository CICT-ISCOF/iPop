import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionButtonsLogsComponent } from './action-buttons-logs.component';

describe('ActionButtonsLogsComponent', () => {
  let component: ActionButtonsLogsComponent;
  let fixture: ComponentFixture<ActionButtonsLogsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActionButtonsLogsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionButtonsLogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
