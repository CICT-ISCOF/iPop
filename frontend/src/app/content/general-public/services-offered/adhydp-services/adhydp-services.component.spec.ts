import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ADHYDPServicesComponent } from './adhydp-services.component';

describe('ADHYDPServicesComponent', () => {
  let component: ADHYDPServicesComponent;
  let fixture: ComponentFixture<ADHYDPServicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ADHYDPServicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ADHYDPServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
