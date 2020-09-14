import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownComponentMobile } from './dropdown.component';

describe('DropdownComponent', () => {
  let component: DropdownComponentMobile;
  let fixture: ComponentFixture<DropdownComponentMobile>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DropdownComponentMobile ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DropdownComponentMobile);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
