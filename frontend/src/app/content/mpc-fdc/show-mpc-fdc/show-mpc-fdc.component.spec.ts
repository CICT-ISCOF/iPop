import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowMpcFdcComponent } from './show-mpc-fdc.component';

describe('ShowMpcFdcComponent', () => {
  let component: ShowMpcFdcComponent;
  let fixture: ComponentFixture<ShowMpcFdcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowMpcFdcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowMpcFdcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
