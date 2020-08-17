import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowAdminStatusComponent } from './show-admin-status.component';

describe('ShowAdminStatusComponent', () => {
  let component: ShowAdminStatusComponent;
  let fixture: ComponentFixture<ShowAdminStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowAdminStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowAdminStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
