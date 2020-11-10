import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusMarriageComponent } from './status-marriage.component';

describe('StatusMarriageComponent', () => {
  let component: StatusMarriageComponent;
  let fixture: ComponentFixture<StatusMarriageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatusMarriageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusMarriageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
