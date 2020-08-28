import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionButtonsCpdbComponent } from './action-buttons-cpdb.component';

describe('ActionButtonsCpdbComponent', () => {
  let component: ActionButtonsCpdbComponent;
  let fixture: ComponentFixture<ActionButtonsCpdbComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActionButtonsCpdbComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionButtonsCpdbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
