import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SBMTCInfoComponent } from './sbmtc-info.component';

describe('SBMTCInfoComponent', () => {
  let component: SBMTCInfoComponent;
  let fixture: ComponentFixture<SBMTCInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SBMTCInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SBMTCInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
