import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarEComponent } from './navbar-e.component';

describe('NavbarEComponent', () => {
  let component: NavbarEComponent;
  let fixture: ComponentFixture<NavbarEComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavbarEComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarEComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
