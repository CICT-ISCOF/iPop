import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MPCFDCComponent } from './mpc-fdc.component';

describe('MPCFDCComponent', () => {
  let component: MPCFDCComponent;
  let fixture: ComponentFixture<MPCFDCComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MPCFDCComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MPCFDCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
