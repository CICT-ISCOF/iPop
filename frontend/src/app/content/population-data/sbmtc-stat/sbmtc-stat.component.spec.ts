import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SBMTCStatComponent } from './sbmtc-stat.component';

describe('SBMTCStatComponent', () => {
  let component: SBMTCStatComponent;
  let fixture: ComponentFixture<SBMTCStatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SBMTCStatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SBMTCStatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
