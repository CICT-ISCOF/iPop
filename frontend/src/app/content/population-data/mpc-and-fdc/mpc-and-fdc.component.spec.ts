import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MPCAndFDCComponent } from './mpc-and-fdc.component';

describe('MPCAndFDCComponent', () => {
  let component: MPCAndFDCComponent;
  let fixture: ComponentFixture<MPCAndFDCComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MPCAndFDCComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MPCAndFDCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
