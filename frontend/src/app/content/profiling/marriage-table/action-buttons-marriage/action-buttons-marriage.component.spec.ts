import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionButtonsMarriageComponent } from './action-buttons-marriage.component';

describe('ActionButtonsMarriageComponent', () => {
  let component: ActionButtonsMarriageComponent;
  let fixture: ComponentFixture<ActionButtonsMarriageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActionButtonsMarriageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionButtonsMarriageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
