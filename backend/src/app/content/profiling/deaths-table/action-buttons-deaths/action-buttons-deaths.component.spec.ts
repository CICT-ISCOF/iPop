import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionButtonsDeathsComponent } from './action-buttons-deaths.component';

describe('ActionButtonsDeathsComponent', () => {
  let component: ActionButtonsDeathsComponent;
  let fixture: ComponentFixture<ActionButtonsDeathsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActionButtonsDeathsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionButtonsDeathsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
