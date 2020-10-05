import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileAuthenticationComponent } from './mobile-authentication.component';

describe('MobileAuthenticationComponent', () => {
  let component: MobileAuthenticationComponent;
  let fixture: ComponentFixture<MobileAuthenticationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileAuthenticationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileAuthenticationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
