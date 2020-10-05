import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionButtonsOutMigsComponent } from './action-buttons-out-migs.component';

describe('ActionButtonsOutMigsComponent', () => {
  let component: ActionButtonsOutMigsComponent;
  let fixture: ComponentFixture<ActionButtonsOutMigsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActionButtonsOutMigsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionButtonsOutMigsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
