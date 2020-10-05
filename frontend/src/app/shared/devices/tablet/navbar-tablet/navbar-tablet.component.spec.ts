import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarTabletComponent } from './navbar-tablet.component';

describe('NavbarTabletComponent', () => {
  let component: NavbarTabletComponent;
  let fixture: ComponentFixture<NavbarTabletComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavbarTabletComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarTabletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
