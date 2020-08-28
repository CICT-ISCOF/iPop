import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionButtonsInMigsComponent } from './action-buttons-in-migs.component';

describe('ActionButtonsInMigsComponent', () => {
  let component: ActionButtonsInMigsComponent;
  let fixture: ComponentFixture<ActionButtonsInMigsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActionButtonsInMigsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionButtonsInMigsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
