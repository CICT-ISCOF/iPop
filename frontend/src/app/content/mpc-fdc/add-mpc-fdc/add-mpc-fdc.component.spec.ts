import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMpcFdcComponent } from './add-mpc-fdc.component';

describe('AddMpcFdcComponent', () => {
  let component: AddMpcFdcComponent;
  let fixture: ComponentFixture<AddMpcFdcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddMpcFdcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMpcFdcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
