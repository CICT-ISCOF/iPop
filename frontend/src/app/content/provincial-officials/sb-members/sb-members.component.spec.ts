import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SbMembersComponent } from './sb-members.component';

describe('SbMembersComponent', () => {
  let component: SbMembersComponent;
  let fixture: ComponentFixture<SbMembersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SbMembersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SbMembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
