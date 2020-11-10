import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionButtonsBirthComponent } from './action-buttons-birth.component';

describe('ActionButtonsBirthComponent', () => {
  let component: ActionButtonsBirthComponent;
  let fixture: ComponentFixture<ActionButtonsBirthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActionButtonsBirthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionButtonsBirthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
