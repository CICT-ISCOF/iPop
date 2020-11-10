import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RPFPPServicesComponent } from './rpfpp-services.component';

describe('RPFPPServicesComponent', () => {
  let component: RPFPPServicesComponent;
  let fixture: ComponentFixture<RPFPPServicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RPFPPServicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RPFPPServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
