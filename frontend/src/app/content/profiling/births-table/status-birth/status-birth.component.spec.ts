import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusBirthComponent } from './status-birth.component';

describe('StatusBirthComponent', () => {
  let component: StatusBirthComponent;
  let fixture: ComponentFixture<StatusBirthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatusBirthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusBirthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
